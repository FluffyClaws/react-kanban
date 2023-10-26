import React from "react";
import RepoInput from "../components/RepoInput";
import KanbanBoard from "../components/KanbanBoard";

const App: React.FC = () => {
  return (
    <div className="container mt-5">
      <RepoInput />
      <KanbanBoard />
    </div>
  );
};

export default App;
