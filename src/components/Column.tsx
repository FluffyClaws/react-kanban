import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Card, ListGroup } from "react-bootstrap";
import Issue from "./Issue";

interface ColumnProps {
  title: string;
  issues: any[];
  columnId: "todo" | "inProgress" | "done";
}

const Column: React.FC<ColumnProps> = ({ title, issues, columnId }) => {
  console.log(issues);
  const ids = issues.map((issue) => issue.id);
  const uniqueIds = new Set(ids);
  if (ids.length !== uniqueIds.size) {
    console.error("Duplicate IDs detected:", ids);
  }
  return (
    <Card style={{ margin: "16px", width: "250px" }}>
      <Card.Header>{title}</Card.Header>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <ListGroup
            variant="flush"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {issues.map((issue, index) => (
              <Issue key={issue.id} issue={issue} index={index} />
            ))}
            {provided.placeholder}
          </ListGroup>
        )}
      </Droppable>
    </Card>
  );
};

export default Column;
