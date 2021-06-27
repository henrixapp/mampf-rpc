import { Submission } from "webdav-submission/src";

export const getSubmissionsByLectureID = (lectureID:any)=> (state:any): Submission[]=>{
    return (state.entities.SubmissionsByLectureID||{})[lectureID] ||[];
}