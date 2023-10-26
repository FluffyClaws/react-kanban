import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { moveIssue } from "../features/issuesSlice";
import Column from "./Column";

const KanbanBoard: React.FC = () => {
  const dispatch = useDispatch();
  const issues = useSelector((state: any) => state.issues);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    dispatch(moveIssue(result));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Column title="ToDo" issues={issues.todo} />
      <Column title="In Progress" issues={issues.inProgress} />
      <Column title="Done" issues={issues.done} />
    </DragDropContext>
  );
};

export default KanbanBoard;
