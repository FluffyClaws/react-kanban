import React from "react";
import RepoInput from "../components/RepoInput";
import KanbanBoard from "../components/KanbanBoard";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <div>
      <RepoInput />
      <KanbanBoard />
    </div>
  );
};

export default App;
