import React from "react";
import { useSelector } from "react-redux";
import { useRequest } from "redux-query-react"
import { queryAssignmentByAssignmentID } from "../query-configs/assignments"
import { getAssignmentByAssignmentID } from "../selectors/assignments";

const AssignmentDisplay = ({assignmentID}:{assignmentID:string}) => {
    useRequest(queryAssignmentByAssignmentID(assignmentID));
    const assignment = useSelector(getAssignmentByAssignmentID(assignmentID))
    return (<> <h5>{assignment.title}</h5>
        bis {assignment.deadline?.toLocaleString()} als {assignment.acceptedFileType}
    </>)
}
export default AssignmentDisplay