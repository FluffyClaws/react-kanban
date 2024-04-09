import { configureStore } from "@reduxjs/toolkit";
import issuesReducer, { setIssues, setRepoUrl } from "../features/issuesSlice";
import { Issue } from "../types/issues";

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value.toString()),
    clear: () => (store = {}),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("Redux Store", () => {
  beforeEach(() => {
    window.localStorage.setItem("issuesState", JSON.stringify({}));
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("initializes with the preloaded state from localStorage", () => {
    const store = configureStore({ reducer: { issues: issuesReducer } });

    expect(store.getState().issues.currentRepoUrl).toEqual("");
    expect(store.getState().issues.issuesData).toEqual({});
  });

  it("updates state correctly when setIssues action is dispatched", () => {
    const store = configureStore({ reducer: { issues: issuesReducer } });
    const testRepoUrl = "https://github.com/FluffyClaws/react-kanban";
    const testIssues: Issue[] = [
      {
        id: 1,
        title: "Issue 1",
        state: "open",
        assignee: null,
        number: 1,
        created_at: "2020-01-01T00:00:00Z",
        user: { login: "user1" },
        comments: 0,
      },
      {
        id: 2,
        title: "Issue 2",
        state: "closed",
        assignee: null,
        number: 2,
        created_at: "2020-01-02T00:00:00Z",
        user: { login: "user2" },
        comments: 0,
      },
    ];

    store.dispatch(setIssues({ repoUrl: testRepoUrl, issues: testIssues }));

    expect(store.getState().issues.issuesData[testRepoUrl].todo).toContainEqual(
      testIssues[0]
    );
    expect(store.getState().issues.issuesData[testRepoUrl].done).toContainEqual(
      testIssues[1]
    );
    expect(store.getState().issues.issuesData[testRepoUrl].inProgress).toEqual(
      []
    );
  });

  it("updates state correctly when setRepoUrl action is dispatched", () => {
    const store = configureStore({ reducer: { issues: issuesReducer } });
    const testRepoUrl = "https://github.com/FluffyClaws/react-kanban";

    store.dispatch(setIssues({ repoUrl: testRepoUrl, issues: [] }));
    store.dispatch(setRepoUrl(testRepoUrl));

    expect(store.getState().issues.currentRepoUrl).toEqual(testRepoUrl);
  });
});

export {};
