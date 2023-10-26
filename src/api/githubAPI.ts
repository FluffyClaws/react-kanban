const GITHUB_DOMAIN = "https://github.com/";
const BASE_URL = "https://api.github.com/repos";

export const fetchIssues = async (repoUrl: string): Promise<any[]> => {
  const repoPath = repoUrl.replace(GITHUB_DOMAIN, "");
  const response = await fetch(`${BASE_URL}/${repoPath}/issues?state=all`);

  if (!response.ok) {
    throw new Error(`Failed to fetch issues: ${response.statusText}`);
  }

  return await response.json();
};
