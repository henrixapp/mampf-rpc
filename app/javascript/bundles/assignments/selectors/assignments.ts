import { Assignment } from "webdav-submission/src";

export const getAssignmentsByLectureID = (lectureID:any)=> (state:any): Assignment[]=>{
    return (state.entities.AssignmentsByLectureID||{})[lectureID] ||[];
}
export const getAssignmentByAssignmentID = (assignmentID:any)=> (state:any): Assignment=>{
    return (state.entities.AssignmentsByAssignmentID||{})[assignmentID] ||{};
}