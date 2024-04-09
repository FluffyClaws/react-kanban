import { fetchIssues } from "./githubAPI";
import { Issue } from "../types/issues";

const mockFetch = (ok: boolean, data?: Issue[], statusText?: string) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok,
      statusText,
      json: () => Promise.resolve(data),
    })
  ) as jest.Mock;
};

describe("fetchIssues", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("fetches issues successfully from GitHub API", async () => {
    const testIssues: Issue[] = [
      {
        id: 1,
        title: "Test Issue",
        state: "open",
        number: 1,
        created_at: "date",
        user: { login: "user" },
        comments: 0,
        assignee: null,
      },
    ];

    mockFetch(true, testIssues);

    const issues = await fetchIssues(
      "https://github.com/FluffyClaws/react-kanban"
    );
    expect(issues).toEqual(testIssues);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("filters out pull requests from issues", async () => {
    const testIssues: (Issue & { pull_request?: { [key: string]: any } })[] = [
      {
        id: 1,
        title: "Test Issue",
        state: "open",
        number: 1,
        created_at: "date",
        user: { login: "user" },
        comments: 0,
        assignee: "user",
      },
      {
        id: 2,
        title: "Test PR",
        state: "closed",
        number: 2,
        created_at: "date",
        user: { login: "user" },
        comments: 0,
        pull_request: {},
        assignee: "user2",
      },
    ];

    mockFetch(true, testIssues);

    const issues = await fetchIssues(
      "https://github.com/FluffyClaws/react-kanban"
    );
    expect(issues).toEqual([testIssues[0]]);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("throws an error when fetch response is not ok", async () => {
    mockFetch(false, undefined, "Not Found");

    await expect(
      fetchIssues("https://github.com/FluffyClaws/react-kanban")
    ).rejects.toThrow("Failed to fetch issues: Not Found");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
