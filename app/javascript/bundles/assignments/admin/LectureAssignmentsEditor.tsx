import { Button, Form, Table } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";

import {useRequest, useMutation} from 'redux-query-react'
import { useSelector, useDispatch } from 'react-redux';
import { Assignment } from "webdav-submission/src";
import { getAssignmentsByLectureID } from "../selectors/assignments";
//@ts-ignore
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { newAssignment } from "../mutations/assignments";
import { queryAssignmentsByLectureID } from "../query-configs/assignments";
const AssignmentEntry = ({assignment,editing}:{assignment: Assignment, editing: boolean}) => {
   //TODO(henrik): make medium tools
    const [title,setTitle]= useState(assignment.title||"");
    const [deadline,setDeadline]= useState(assignment.deadline||null);
    const [MediumID, setMediumID] = useState(assignment.mediumID||0);
    const [acceptedFileType,setAcceptedFileType] = useState(assignment.acceptedFileType||"");
    //@ts-ignore
    const [state,save] = useMutation((title,deadline,mediumID,acceptedFileType,lectureID)=> {
        //@ts-ignore
        return newAssignment(lectureID,{title,deadline,mediumID,acceptedFileType,lectureID})
    });
   if(editing) {
       return (
        <tr>
        <td><Form.Control value={title} placeholder="Titel" onChange={(e)=>setTitle(e.target.value)}></Form.Control></td>
        <td><DatePicker withPortal showTimeSelect selected={deadline} onChange={(e:Date)=>setDeadline(e as Date)}   dateFormat="Pp"></DatePicker></td>
        <td><Form.Control value={MediumID} type="number" placeholder="MediumID" onChange={(e)=>setMediumID(parseInt(e.target.value))}></Form.Control></td>
        <td><Form.Control placeholder="Accepted Filetype in WebInterface" value={acceptedFileType} onChange={(e)=>setAcceptedFileType(e.target.value)}></Form.Control></td>
        <td><Button onClick={(e)=>{//@ts-ignore
            save(title,deadline,MediumID,acceptedFileType,assignment.lectureID)}}>Speichern</Button></td>
    </tr> 
       )
   }
    return (<tr>
        <td>{assignment.title}</td>
        <td>{assignment.deadline}</td>
        <td>{assignment.mediumID}</td>
        <td>{assignment.acceptedFileType}</td>
    </tr>)
}
const LectureAssignmentsEditor = ({lectureId}:{lectureId:number}) => {
    let [status,req] =useRequest(queryAssignmentsByLectureID(lectureId));
    console.log(status)
    const [isNewHomework, setNewHomework] = useState(false);
    const [newAssignment,setAssignment] = useState({lectureID:lectureId});
    const newHomeWorkClick = ()=> {
        setNewHomework(true);
    }
    const assignments: Assignment[] = useSelector(getAssignmentsByLectureID(lectureId))
    if (status.status==200)
    return (<>
            <Button onClick={()=> newHomeWorkClick()}>Neue Hausaufgabe anlegen</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Titel</th>
                        <th>Abgabetermin</th>
                        <th>Medium</th>
                        <th>Abgabeformat</th>
                        <th>Aktion</th>
                    </tr>
                </thead>
                <tbody>
                    {isNewHomework&& <AssignmentEntry assignment={newAssignment} editing={true}></AssignmentEntry>}
                    {assignments.map(assignment =>  <AssignmentEntry assignment={assignment} editing={true}></AssignmentEntry> )}
                   
                </tbody>
            </Table>
        </>)
        return (<>Loading</>)
}
export default LectureAssignmentsEditor