
import { Assignment,lectureLectureIDAssignmentsPost } from "webdav-submission/src"

export const newAssignment = (lectureID:number, assignment: Assignment) => {
    console.log(assignment)
    return lectureLectureIDAssignmentsPost({lectureID,assignment},{
        transform: (val:any)=> {
            return {AssignmentsByLectureID:val}
        },
        update: {
            AssignmentsByLectureID: (prev,next)=>{
                prev = prev || {};
                prev[lectureID] = prev[lectureID]|| [];
                prev[lectureID].push(next);
                return prev;
            }
        }
    })
}