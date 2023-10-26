export interface Issue {
  id: number;
  title: string;
  state: "open" | "closed";
  assignee: any;
  number: number; // Issue number
  created_at: string;
  user: {
    login: string;
  };
  comments: number;
  pull_request?: { [key: string]: any };
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
  issue: Issue;
  index: number;
}
