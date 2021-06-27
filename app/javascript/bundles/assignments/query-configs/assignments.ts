import * as s from "webdav-submission/src/apis/index"
import { assignmentsAssignmentIDGet } from "webdav-submission/src/apis/index";
export const queryAssignmentsByLectureID = (lectureID: number) => {
    return s.lectureLectureIDAssignmentsGet({ lectureID }, {
        transform: (val: any) => {
            return { AssignmentsByLectureID: val }
        },
        update: {
            AssignmentsByLectureID:
                (prev:any, next:any) => {
                    prev = prev ||{};
                    prev[lectureID] = next;
                    return prev;
                }
        }
    })
}
export const queryAssignmentByAssignmentID = (assignmentID: string) => {
    return assignmentsAssignmentIDGet({ assignmentID }, {
        transform: (val: any) => {
            return { AssignmentsByAssignmentID: val }
        },
        update: {
            AssignmentsByAssignmentID:
                (prev:any, next:any) => {
                    prev = prev ||{};
                    prev[assignmentID] = next;
                    return prev;
                }
        }
    })
}