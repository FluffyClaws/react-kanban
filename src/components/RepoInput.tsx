import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchIssues } from "../api/githubAPI";
import { setIssues, setRepoUrl } from "../features/issuesSlice";

const RepoInput: React.FC = () => {
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleLoad = async () => {
    try {
      const issues = await fetchIssues(url);
      dispatch(setIssues({ repoUrl: url, issues }));
      console.log(issues);
      dispatch(setRepoUrl(url));
    } catch (error) {
      console.error("Failed to fetch issues:", error);
    }
  };

  return (
    <div>
      <input value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={handleLoad}>Load</button>
      <div>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Visit Repo
        </a>
        <a
          href={url.split("/").slice(0, -1).join("/")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Owner's Profile
        </a>
      </div>
    </div>
  );
};

export default RepoInput;
