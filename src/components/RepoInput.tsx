import React, { useState } from "react";
import useLoadIssues from "../hooks/useLoadIssues";

const RepoInput: React.FC = () => {
  const [url, setUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");
  const loadIssues = useLoadIssues(url);

  const handleLoad = () => {
    setSubmittedUrl(url);
    loadIssues();
  };

  // Extract owner's account name and repo name from the submitted URL
  const urlParts = submittedUrl.split("/");
  const repoName = urlParts.pop();
  const ownerName = urlParts.pop();

  return (
    <div className="mb-4">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter repository URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={handleLoad}>
            Load
          </button>
        </div>
      </div>
      {submittedUrl && (
        <div>
          <a
            href={`https://github.com/${ownerName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-link"
          >
            Visit {ownerName}'s Profile
          </a>
          /
          <a
            href={submittedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-link"
          >
            Visit {repoName} Repo
          </a>
        </div>
      )}
    </div>
  );
};

export default RepoInput;
