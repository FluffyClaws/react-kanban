// src/components/RepoInput.tsx

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchIssues } from "../api/githubAPI";
import { setIssues } from "../features/issuesSlice";

const RepoInput: React.FC = () => {
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleLoad = async () => {
    try {
      const issues = await fetchIssues(url);
      dispatch(setIssues(issues));
    } catch (error) {
      console.error("Failed to fetch issues:", error);
    }
  };

  return (
    <div>
      <input value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={handleLoad}>Load</button>
    </div>
  );
};

export default RepoInput;
