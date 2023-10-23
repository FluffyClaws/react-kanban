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

const initialState: IssuesState = {
  todo: [],
  inProgress: [],
  done: [],
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssues: (state, action: PayloadAction<Issue[]>) => {
      action.payload.forEach((issue) => {
        if (issue.state === "closed") {
          state.done.push(issue);
        } else if (issue.assignee) {
          state.inProgress.push(issue);
        } else {
          state.todo.push(issue);
        }
      });
    },
    moveIssue: (state, action: PayloadAction<any>) => {
      // Handle drag and drop logic
    },
  },
});

export const { setIssues, moveIssue } = issuesSlice.actions;
export default issuesSlice.reducer;
