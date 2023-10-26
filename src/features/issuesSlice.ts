import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Issue {
  id: number;
  title: string;
  state: "open" | "closed";
  assignee: any;
}

interface IssuesState {
  todo: Issue[];
  inProgress: Issue[];
  done: Issue[];
}

interface RootState {
  currentRepoUrl: string;
  issuesData: { [repoUrl: string]: IssuesState };
}

const initialState: RootState = {
  currentRepoUrl: "",
  issuesData: {},
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssues: (
      state,
      action: PayloadAction<{ repoUrl: string; issues: Issue[] }>
    ) => {
      const { repoUrl, issues } = action.payload;
      if (!repoUrl) {
        console.error("Repo URL is not provided.");
        return;
      }

      if (!state.issuesData) {
        state.issuesData = {};
      }

      if (!state.issuesData[repoUrl]) {
        state.issuesData[repoUrl] = {
          todo: [],
          inProgress: [],
          done: [],
        };

        issues.forEach((issue) => {
          if (issue.state === "closed") {
            state.issuesData[repoUrl].done.push(issue);
          } else if (issue.assignee) {
            state.issuesData[repoUrl].inProgress.push(issue);
          } else {
            state.issuesData[repoUrl].todo.push(issue);
          }
        });

        localStorage.setItem("issuesState", JSON.stringify(state));
      }
    },

    moveIssue: (
      state,
      action: PayloadAction<{ repoUrl: string; source: any; destination: any }>
    ) => {
      const { repoUrl, source, destination } = action.payload;

      if (!state.issuesData[repoUrl]) return;

      const sourceId = source.droppableId as keyof IssuesState;
      const destinationId = destination.droppableId as keyof IssuesState;

      if (
        !state.issuesData[repoUrl][sourceId] ||
        !state.issuesData[repoUrl][destinationId]
      )
        return;

      const [removed] = state.issuesData[repoUrl][sourceId].splice(
        source.index,
        1
      );
      state.issuesData[repoUrl][destinationId].splice(
        destination.index,
        0,
        removed
      );

      localStorage.setItem("issuesState", JSON.stringify(state));
    },

    setRepoUrl: (state, action: PayloadAction<string>) => {
      state.currentRepoUrl = action.payload;
      const savedState = JSON.parse(
        localStorage.getItem("issuesState") || "{}"
      );
      if (savedState.issuesData && savedState.issuesData[action.payload]) {
        state.issuesData[action.payload] =
          savedState.issuesData[action.payload];
      }
    },
  },
});

export const { setIssues, moveIssue, setRepoUrl } = issuesSlice.actions;
export default issuesSlice.reducer;
