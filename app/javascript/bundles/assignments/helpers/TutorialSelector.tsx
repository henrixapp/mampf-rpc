import React from "react"
import { Form } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useRequest } from "redux-query-react";
import { Tutorial } from "webdav-submission/src";
import { queryTutorialsByLectureID } from "../query-configs/tutorials";
import { getTutorialsByLectureID } from "../selectors/tutorials";

const TutorialSelector= ({lectureID,setTutorialID}:{lectureID:number,setTutorialID:any}) =>{
    useRequest(queryTutorialsByLectureID(lectureID))
const tutorials: Tutorial[] = useSelector(getTutorialsByLectureID(lectureID));
    return (
  <Form.Group controlId="exampleForm.SelectCustom">
    <Form.Label>Tutorial Select</Form.Label>
    <Form.Control as="select" onChange={(e)=>setTutorialID(e.target.value)} custom placeholder="Bitte auswählen">
      <option disabled={true}>Bitte auswählen</option>
        {tutorials.map((t)=><option value={t.id} key={t.id}>{t.title}</option>)}
    </Form.Control>
  </Form.Group>)
}
export default TutorialSelector