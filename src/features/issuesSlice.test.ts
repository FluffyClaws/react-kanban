import issuesReducer, {
  setIssues,
  moveIssue,
  setRepoUrl,
} from "../features/issuesSlice";
import { Issue, RootState } from "../types/issues";

type Store = {
  [key: string]: string;
};

const localStorageMock = (() => {
  let store: Store = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: any) => {
      store[key] = JSON.stringify(value);
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("issuesSlice", () => {
  const initialState: RootState = {
    currentRepoUrl: "",
    issuesData: {},
  };

  it("handles setIssues action", () => {
    const repoUrl = "https://github.com/test/repo";
    const issues: Issue[] = [
      {
        id: 1,
        title: "Issue 1",
        state: "open",
        number: 1,
        created_at: "2020-01-01T00:00:00Z",
        user: { login: "user1" },
        comments: 0,
        assignee: null,
      },
    ];

    const action = setIssues({ repoUrl, issues });
    const resultState = issuesReducer(initialState, action);

    expect(resultState.issuesData[repoUrl].todo).toContainEqual(issues[0]);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "issuesState",
      JSON.stringify(resultState)
    );
  });

  it("handles moveIssue action", () => {
    const initialStateWithIssues: RootState = {
      currentRepoUrl: "https://github.com/test/repo",
      issuesData: {
        "https://github.com/test/repo": {
          todo: [
            {
              id: 1,
              title: "Issue 1",
              state: "open",
              number: 1,
              created_at: "2020-01-01T00:00:00Z",
              user: { login: "user1" },
              comments: 0,
              assignee: null,
            },
          ],
          inProgress: [],
          done: [],
        },
      },
    };

    const action = moveIssue({
      repoUrl: "https://github.com/test/repo",
      source: { droppableId: "todo", index: 0 },
      destination: { droppableId: "done", index: 0 },
    });

    const resultState = issuesReducer(initialStateWithIssues, action);

    expect(
      resultState.issuesData["https://github.com/test/repo"].todo
    ).toHaveLength(0);
    expect(
      resultState.issuesData["https://github.com/test/repo"].done[0].title
    ).toEqual("Issue 1");
  });

  it("handles setRepoUrl action", () => {
    const repoUrl = "https://github.com/test/repo";
    const action = setRepoUrl(repoUrl);
    const resultState = issuesReducer(initialState, action);

    expect(resultState.currentRepoUrl).toEqual(repoUrl);
  });
});
