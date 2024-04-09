import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { fetchIssues } from "../api/githubAPI";
import useLoadIssues from "./useLoadIssues";
import { setIssues, setRepoUrl } from "../features/issuesSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));
jest.mock("../api/githubAPI");

interface TestComponentProps {
  url: string;
}

const TestComponent: React.FC<TestComponentProps> = ({ url }) => {
  const load = useLoadIssues(url);
  return <button onClick={load}>Load Issues</button>;
};

describe("useLoadIssues", () => {
  const mockDispatch = jest.fn();
  const testUrl = "https://github.com/test/repo";

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (fetchIssues as jest.Mock).mockResolvedValue([
      { id: 1, title: "Test Issue" },
    ]);

    Storage.prototype.getItem = jest.fn(() => null);
    Storage.prototype.setItem = jest.fn();
  });

  it("fetches issues and dispatches actions if issues are not in localStorage", async () => {
    const { getByText } = render(<TestComponent url={testUrl} />);

    fireEvent.click(getByText("Load Issues"));

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(fetchIssues).toHaveBeenCalledWith(testUrl);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith(setIssues(expect.any(Object)));
    expect(mockDispatch).toHaveBeenCalledWith(setRepoUrl(testUrl));
  });

  it("loads issues from localStorage if available", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({
        issuesData: { [testUrl]: [{ id: 2, title: "Stored Issue" }] },
      })
    );

    const { getByText } = render(<TestComponent url={testUrl} />);

    fireEvent.click(getByText("Load Issues"));

    expect(fetchIssues).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(setRepoUrl(testUrl));
  });
});
