import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ListGroup } from "react-bootstrap";
import { IssueProps } from "../types/issues";

const Issue: React.FC<IssueProps> = ({ issue, index }) => {
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
          {issue.title}
        </ListGroup.Item>
      )}
    </Draggable>
  );
};

export default Issue;
