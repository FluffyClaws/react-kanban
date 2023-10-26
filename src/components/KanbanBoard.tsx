import React from "react";
import { useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { Container, Row, Col } from "react-bootstrap";
import Column from "./Column";
import useDragEnd from "../hooks/useDragEnd";
import { getIssuesForCurrentRepo } from "../features/issuesSelectors";

const KanbanBoard: React.FC = () => {
  const handleDragEnd = useDragEnd();
  const repoUrl = useSelector((state: any) => state.issues?.currentRepoUrl);
  const issues = useSelector(getIssuesForCurrentRepo);

  if (!repoUrl) return <div>Please enter a repository URL to load issues.</div>;

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
