import { createSelector } from "reselect";

// Basic selectors
const getIssuesData = (state: any) => state.issues?.issuesData;
const getCurrentRepoUrl = (state: any) => state.issues?.currentRepoUrl;

// Memoized selector
export const getIssuesForCurrentRepo = createSelector(
  [getIssuesData, getCurrentRepoUrl],
  (issuesData, repoUrl) =>
    issuesData?.[repoUrl] || {
      todo: [],
      inProgress: [],
      done: [],
    }
);
