import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface IssueProps {
  issue: {
    id: number;
    title: string;
  };
  index: number;
}

const Issue: React.FC<IssueProps> = ({ issue, index }) => {
  return (
    <Draggable draggableId={issue.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: "none",
            padding: "8px",
            margin: "0 0 8px 0",
            minHeight: "50px",
            backgroundColor: "white",
            border: "1px solid lightgray",
            borderRadius: "4px",
            ...provided.draggableProps.style,
          }}
        >
          {issue.title}
        </div>
      )}
    </Draggable>
  );
};

export default Issue;
