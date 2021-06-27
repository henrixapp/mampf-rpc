import { lectureLectureIDTutorialsGet } from "webdav-submission/src";

export const queryTutorialsByLectureID = (lectureID: number) => {
    return lectureLectureIDTutorialsGet({ lectureID }, {
        transform: (val: any) => {
            return { TutorialsByLectureID: val }
        },
        update: {
            TutorialsByLectureID:
                (prev:any, next:any) => {
                    prev = prev ||{};
                    prev[lectureID] = next;
                    return prev;
                }
        }
    })
}