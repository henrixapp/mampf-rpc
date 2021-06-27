
import {  Assignment, lectureLectureIDSubmissionsPost, Submission ,submissionsSubmissionIDDelete} from "webdav-submission/src"


export const newSubmission = (lectureID:number, submission:Submission) => {
    return lectureLectureIDSubmissionsPost({lectureID,submission},{
        transform: (val:any)=> {
            return {SubmissionsByLectureID:val,AssignmentsByLectureID:submission.assignmentID}
        },
        update: {
            SubmissionsByLectureID: (prev,next)=>{
                prev = prev || {};
                prev[lectureID] = prev[lectureID]|| [];
                prev[lectureID].push(next);
                return prev;
            },
            AssignmentsByLectureID:(prev:any,next)=> {
                console.log(prev);
                prev[lectureID] = prev[lectureID].map((v:Assignment)=>(v.id != next)?v:{invisible:true,...v});
                prev[lectureID].push({invisible:true});
                return prev;
            }
        }
    })
}
export const deleteSubmission = (lectureID:number, submission: Submission)=> {
    return submissionsSubmissionIDDelete({submissionID:submission.id!},{
        transform: (val:any)=> {
            return {SubmissionsByLectureID:val,AssignmentsByLectureID:submission.assignmentID}
        },
        update: {
            SubmissionsByLectureID: (prev,next)=>{
                prev = prev || {};
                prev[lectureID] = prev[lectureID].filter((s:Submission)=>s.id!= submission.id)|| [];
                return prev;
            },
            AssignmentsByLectureID:(prev:any,next)=> {
                console.log(prev);
                console.log(next);
                //prev[lectureID] = prev[lectureID].map((v:Assignment)=>(v.id ||"" != next)?v:{...v,invisible:false});
                prev[lectureID][prev[lectureID].findIndex(((v:any)=>v.id==submission.assignmentID))].invisible = false;
                prev[lectureID].push({invisible:true});
                return prev;
            }
        }
    })
}