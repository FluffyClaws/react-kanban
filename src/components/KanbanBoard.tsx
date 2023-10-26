import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { Container, Row, Col } from "react-bootstrap";
import { moveIssue } from "../features/issuesSlice";
import Column from "./Column";

const KanbanBoard: React.FC = () => {
  const dispatch = useDispatch();
  const issues = useSelector((state: any) => state.issues);

  const handleDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const payload = {
      source: {
        droppableId: source.droppableId,
        index: source.index,
      },
      destination: {
        droppableId: destination.droppableId,
        index: destination.index,
      },
    };

    dispatch(moveIssue(payload));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container>
        <Row>
          <Col>
            <Column title="ToDo" issues={issues.todo} columnId="todo" />
          </Col>
          <Col>
            <Column
              title="In Progress"
              issues={issues.inProgress}
              columnId="inProgress"
            />
          </Col>
          <Col>
            <Column title="Done" issues={issues.done} columnId="done" />
          </Col>
        </Row>
      </Container>
    </DragDropContext>
  );
};

export default KanbanBoard;
