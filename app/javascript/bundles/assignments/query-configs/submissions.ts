import {lectureLectureIDSubmissionsGet} from "webdav-submission/src"
export const querySubmissionsByLectureID= (lectureID:number) => {
    return lectureLectureIDSubmissionsGet({lectureID}, {
        transform: (val: any) => {
            return { SubmissionsByLectureID: val }
        },
        update: {
            SubmissionsByLectureID:
                (prev:any, next:any) => {
                    prev = prev ||{};
                    prev[lectureID] = next;
                    return prev;
                }
        }
    })
}