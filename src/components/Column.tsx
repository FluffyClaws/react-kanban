import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Issue from "./Issue";

interface ColumnProps {
  title: string;
  issues: any[];
}

const Column: React.FC<ColumnProps> = ({ title, issues }) => {
  return (
    <div
      style={{
        margin: "16px",
        border: "1px solid gray",
        borderRadius: "4px",
        width: "250px",
      }}
    >
      <h3>{title}</h3>
      <Droppable droppableId={title}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ padding: "8px" }}
          >
            {issues.map((issue, index) => (
              <Issue key={issue.id} issue={issue} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
