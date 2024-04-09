import { Issue } from "../types/issues";

const GITHUB_DOMAIN = "https://github.com/";
const BASE_URL = "https://api.github.com/repos";

const normalizeUrl = (url: string) => url.replace(/\/+$/, "");

export const fetchIssues = async (repoUrl: string): Promise<any[]> => {
  const normalizedRepoUrl = normalizeUrl(repoUrl);
  const repoPath = normalizedRepoUrl.replace(GITHUB_DOMAIN, "");

  const response = await fetch(`${BASE_URL}/${repoPath}/issues?state=all`);

  if (!response.ok) {
    throw new Error(`Failed to fetch issues: ${response.statusText}`);
  }

  const issues = await response.json();

  // Filter out pull requests
  const actualIssues = issues.filter((issue: Issue) => !issue.pull_request);

  return actualIssues;
};
