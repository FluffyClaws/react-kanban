import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ListGroup } from "react-bootstrap";
import { IssueProps } from "../types/issues";
import { calculateDaysOpened } from "../utils/dateUtils";

const Issue: React.FC<IssueProps> = ({ issue, index }) => {
  const daysOpened = calculateDaysOpened(issue.created_at);

  return (
    <Draggable draggableId={issue.id.toString()} index={index}>
      {(provided) => (
        <ListGroup.Item
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: "none",
            ...provided.draggableProps.style,
          }}
        >
          <strong>{issue.title}</strong>
          <div>
            <small>
              #{issue.number} opened {daysOpened} days ago by {issue.user.login}
            </small>
          </div>
          <div>
            <small>Comments: {issue.comments}</small>
          </div>
        </ListGroup.Item>
      )}
    </Draggable>
  );
};

export default Issue;
