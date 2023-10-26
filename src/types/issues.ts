export interface Issue {
  id: number;
  title: string;
  state: "open" | "closed";
  assignee: any;
}

export interface IssuesState {
  todo: Issue[];
  inProgress: Issue[];
  done: Issue[];
}

export interface RootState {
  currentRepoUrl: string;
  issuesData: { [repoUrl: string]: IssuesState };
}

export interface ColumnProps {
  title: string;
  issues: Issue[];
  columnId: "todo" | "inProgress" | "done";
}

export interface IssueProps {
  issue: {
    id: number;
    title: string;
  };
  index: number;
}
