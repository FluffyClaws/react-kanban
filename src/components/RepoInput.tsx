import React, { useState } from "react";
import useLoadIssues from "../hooks/useLoadIssues";

const RepoInput: React.FC = () => {
  const [url, setUrl] = useState("");
  const handleLoad = useLoadIssues(url);

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
