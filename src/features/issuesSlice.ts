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
      state.todo = [];
      state.inProgress = [];
      state.done = [];

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

    moveIssue: (state, action) => {
      const { source, destination } = action.payload;
      const sourceId = source.droppableId as keyof IssuesState;
      const destinationId = destination.droppableId as keyof IssuesState;

      // Ensure that source and destination columns exist
      if (!state[sourceId] || !state[destinationId]) return;

      const [removed] = state[sourceId].splice(source.index, 1);
      state[destinationId].splice(destination.index, 0, removed);
    },
  },
});

export const { setIssues, moveIssue } = issuesSlice.actions;
export default issuesSlice.reducer;
