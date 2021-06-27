import React, { useState } from "react"
import { Button, Card, CardDeck } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useMutation, useRequest } from "redux-query-react"
import { Assignment, Submission } from "webdav-submission/src"
import AssignmentDisplay from "../helpers/AssignmentDisplay"
import TutorialSelector from "../helpers/TutorialSelector"
import { deleteSubmission, newSubmission } from "../mutations/submissions"
import { queryAssignmentsByLectureID } from "../query-configs/assignments"
import { querySubmissionsByLectureID } from "../query-configs/submissions"
import { getAssignmentsByLectureID } from "../selectors/assignments"
import { getSubmissionsByLectureID } from "../selectors/submissions"

const SubmissionCard = ({submission, lectureID}:{submission:Submission, lectureID:number}) => {
    const [state,deleteSub] = useMutation(()=>deleteSubmission(lectureID,submission)) 
    const deleteSubmis = ()=>{
        if(confirm("Möchtest du diese Abgabe wirklich löschen?"))
        deleteSub();
        //newSub(assignment.id||"",tutorialID)
    }
    return (<Card bg={submission.accepted? "Success":"Info"}     className="mb-2">
        <Card.Header>
            <AssignmentDisplay assignmentID={submission.assignmentID ||""}></AssignmentDisplay>
        </Card.Header>
        <Card.Body>
        <Button onClick={(e)=>{deleteSubmis()}}>Löschen</Button>

            </Card.Body>
            </Card>)
}
const AssignmentCard = ({assignment}:{assignment:Assignment}) => {
    const [tutorialID,setTutorialID] = useState("");
    const [state,newSub] = useMutation((assignmentID:string,tutorialID:string)=>newSubmission(assignment.lectureID||0,{assignmentID,tutorialID})) 
    const createSubmission = ()=>{
        newSub(assignment.id||"",tutorialID)
    }
    return (<Card bg={(assignment.deadline||new Date()) >  new Date()? "Primary":"Warning"}     className="mb-2">
    <Card.Header>
        <AssignmentDisplay assignmentID={assignment.id ||""}></AssignmentDisplay>
    </Card.Header>
    <Card.Body>

    <TutorialSelector lectureID={assignment.lectureID||0} setTutorialID={setTutorialID}></TutorialSelector>
            <Button onClick={(e)=>{createSubmission()}} disabled={tutorialID==""}>Create {assignment.title}</Button>
        </Card.Body>
        </Card>)
}
const SubmissionsOverview = ({lectureID}:{lectureID:number})=> {
    useRequest(querySubmissionsByLectureID(lectureID))
    const submissions  = useSelector(getSubmissionsByLectureID(lectureID))
    useRequest(queryAssignmentsByLectureID(lectureID))
    const assignments  = useSelector(getAssignmentsByLectureID(lectureID))
   

    return (
        <>
        <h1>Abgaben</h1>
        <CardDeck>
        {submissions.map((submission)=><SubmissionCard submission={submission} lectureID={lectureID} key={submission.id}></SubmissionCard>)}
        </CardDeck>
        <h1>Verfügbare Hausaufgaben</h1>
        <CardDeck>
        {
            assignments.filter((a:any)=> !(a.invisible||false) && submissions.findIndex((s)=>s.assignmentID==a.id)==-1).map((assignment)=><AssignmentCard assignment={assignment} key={assignment.id}></AssignmentCard>)
        }</CardDeck>
        {assignments.length==0&&<>Keine Submissions verfügbar</>}
        </>
    )
}

export default SubmissionsOverview