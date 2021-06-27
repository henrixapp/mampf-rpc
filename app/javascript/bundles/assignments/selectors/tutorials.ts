import { Tutorial } from "webdav-submission/src";

export const getTutorialsByLectureID = (lectureID:any)=> (state:any): Tutorial[]=>{
    return (state.entities.TutorialsByLectureID||{})[lectureID] ||[];
}
export const getTutorialByTutorialID = (tutorialID:any)=> (state:any): Tutorial=>{
    return (state.entities.TutorialsByTutorialID||{})[tutorialID] ||{};
}