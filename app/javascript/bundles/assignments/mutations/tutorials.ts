
import { Tutorial,lectureLectureIDTutorialsPost, tutorialsTutorialIDTutorsUserIDPost } from "webdav-submission/src"

export const newTutorial = (lectureID:number, tutorial: Tutorial) => {
    console.log(tutorial)
    return lectureLectureIDTutorialsPost({lectureID,tutorial},{
        transform: (val:any)=> {
            return {TutorialsByLectureID:val}
        },
        update: {
            TutorialsByLectureID: (prev,next)=>{
                prev = prev || {};
                prev[lectureID] = prev[lectureID]|| [];
                prev[lectureID].push(next);
                return prev;
            }
        }
    })
}
export const newTutorForTutorial = (tutorialID:string,userID: number)=> {
    return tutorialsTutorialIDTutorsUserIDPost({tutorialID,userID},{
        transform: (val:any)=> {
            return {TutorsByTutorialID:val}
        },
        update: {
            TutorsByTutorialID: (prev,next)=>{
                console.log(next)
                prev = prev || {};
                prev[tutorialID] = prev[tutorialID]|| [];
                prev[tutorialID].push(next);
                return prev;
            }
        }
    })
}