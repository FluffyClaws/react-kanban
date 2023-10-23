const BASE_URL = "https://api.github.com/repos";

export const fetchIssues = async (repoUrl: string): Promise<any[]> => {
  const repoPath = repoUrl.replace("https://github.com/", "");
  const response = await fetch(`${BASE_URL}/${repoPath}/issues?state=all`);

  if (!response.ok) {
    throw new Error(`Failed to fetch issues: ${response.statusText}`);
  }

  const issues = await response.json();
  return issues;
};
