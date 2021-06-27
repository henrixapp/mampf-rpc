import React, { useState } from "react"
import { Button, Form, Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useMutation, useRequest } from "redux-query-react"
import { Tutorial } from "webdav-submission/src"
import { newTutorForTutorial, newTutorial } from "../mutations/tutorials"
import { queryTutorialsByLectureID } from "../query-configs/tutorials"
import { getTutorialsByLectureID } from "../selectors/tutorials"
const TutorialEntry = ({tutorial}:{tutorial:Tutorial})=> {
    const [title,setTitle] = useState(tutorial.title||"");
    const [newTutorID,setNewTutorID] = useState(3);
    const [state,newTut] = useMutation(()=>newTutorial(tutorial.lectureID||0,{title}));
    const [state2,newTutor] = useMutation((userID:number)=>newTutorForTutorial(tutorial.id||"",userID));
    const addUser= ()=>{
        newTutor(newTutorID);
        alert("hinzugefügt)")
    }
    return (<tr>
        <td><Form.Control value={title} placeholder="Titel" onChange={(e)=>setTitle(e.target.value)}></Form.Control></td>
        <td>{(tutorial.id != null)&&<Button onClick={(e)=>{addUser()}}>Add user</Button>} <Button onClick={()=>{newTut()}}>Save</Button></td></tr>)
}
const LectureTutorialsEditor = ({lectureID}:{lectureID: number}) => {
    useRequest(queryTutorialsByLectureID(lectureID))
    const tutorials = useSelector(getTutorialsByLectureID(lectureID))
    const [isNewTutorial, setIsNewTutorial]= useState(false);
    const [newTutorial,setNewTutorial] = useState({lectureID:lectureID});
    const newTutorialClick = () => {
        setIsNewTutorial(true)
    }
    return (
        <>
            <Button onClick={()=> newTutorialClick()}>Neues Tutorial anlegen</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Titel</th>
                        <th>Optionen</th>
                    </tr>
                </thead>
                <tbody>
                    {isNewTutorial&& <TutorialEntry tutorial={newTutorial} ></TutorialEntry>}
                    {tutorials.map(tutorial =>  <TutorialEntry tutorial={tutorial}  key={tutorial.id}></TutorialEntry> )}
                   
                </tbody>
            </Table>
        </>
    )
}
export default LectureTutorialsEditor