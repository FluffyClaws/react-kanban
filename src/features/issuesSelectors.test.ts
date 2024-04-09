import { getIssuesForCurrentRepo } from "./issuesSelectors";

describe("getIssuesForCurrentRepo Selector", () => {
  const normalizeUrl = (url: string): string => url.replace(/\/+$/, "");

  it("returns the correct issues data for the current repository", () => {
    const testState = {
      issues: {
        issuesData: {
          "https://github.com/FluffyClaws/react-kanban": {
            todo: [{ id: 1, title: "Todo Issue" }],
            inProgress: [{ id: 2, title: "In Progress Issue" }],
            done: [{ id: 3, title: "Done Issue" }],
          },
        },
        currentRepoUrl: "https://github.com/FluffyClaws/react-kanban",
      },
    };

    const issues = getIssuesForCurrentRepo(testState);
    expect(issues.todo).toEqual([{ id: 1, title: "Todo Issue" }]);
    expect(issues.inProgress).toEqual([{ id: 2, title: "In Progress Issue" }]);
    expect(issues.done).toEqual([{ id: 3, title: "Done Issue" }]);
  });

  it("returns empty arrays for todo, inProgress, and done if no issuesData found for the current repo URL", () => {
    const testState = {
      issues: {
        issuesData: {},
        currentRepoUrl: "https://github.com/FluffyClaws/react-kanban",
      },
    };

    const issues = getIssuesForCurrentRepo(testState);
    expect(issues.todo).toEqual([]);
    expect(issues.inProgress).toEqual([]);
    expect(issues.done).toEqual([]);
  });

  it("memoizes the selector result", () => {
    const testState = {
      issues: {
        issuesData: {
          "https://github.com/FluffyClaws/react-kanban": {
            todo: [{ id: 1, title: "Todo Issue" }],
            inProgress: [{ id: 2, title: "In Progress Issue" }],
            done: [{ id: 3, title: "Done Issue" }],
          },
        },
        currentRepoUrl: "https://github.com/FluffyClaws/react-kanban",
      },
    };

    const issues1 = getIssuesForCurrentRepo(testState);
    const issues2 = getIssuesForCurrentRepo(testState);

    expect(issues1).toBe(issues2);
  });

  it("handles different formats of the repo URL consistently", () => {
    const testStateWithSlash = {
      issues: {
        issuesData: {
          [normalizeUrl("https://github.com/FluffyClaws/react-kanban/")]: {
            todo: [{ id: 4, title: "Additional Todo Issue" }],
            inProgress: [],
            done: [],
          },
        },
        currentRepoUrl: normalizeUrl(
          "https://github.com/FluffyClaws/react-kanban"
        ),
      },
    };

    const issues = getIssuesForCurrentRepo(testStateWithSlash);
    expect(issues.todo).toEqual([{ id: 4, title: "Additional Todo Issue" }]);
  });

  it("returns default empty arrays if the repo URL is invalid or not found", () => {
    const testStateInvalidUrl = {
      issues: {
        issuesData: {},
        currentRepoUrl: "https://github.com/Invalid/Repo",
      },
    };

    const issues = getIssuesForCurrentRepo(testStateInvalidUrl);
    expect(issues.todo).toEqual([]);
    expect(issues.inProgress).toEqual([]);
    expect(issues.done).toEqual([]);
  });
});
