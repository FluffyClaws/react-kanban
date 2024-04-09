import { useDispatch, useSelector } from "react-redux";
import useDragEnd from "./useDragEnd";
import { moveIssue } from "../features/issuesSlice";
import { renderHook } from "@testing-library/react";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../features/issuesSlice", () => ({
  moveIssue: jest.fn(),
}));

describe("useDragEnd", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    (useSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        issues: {
          currentRepoUrl: "https://github.com/FluffyClaws/react-kanban",
        },
      })
    );
  });

  it("dispatches moveIssue action on successful drag end", () => {
    const result = {
      destination: { droppableId: "column-1", index: 1 },
      source: { droppableId: "column-1", index: 0 },
    };

    const { result: hookResult } = renderHook(() => useDragEnd());

    hookResult.current(result);

    expect(moveIssue).toHaveBeenCalledWith({
      repoUrl: "https://github.com/FluffyClaws/react-kanban",
      source: result.source,
      destination: result.destination,
    });
    expect(mockDispatch).toHaveBeenCalledWith(moveIssue(expect.any(Object)));
  });

  it("does not dispatch moveIssue action if destination is null", () => {
    const result = {
      destination: null,
      source: { droppableId: "column-1", index: 0 },
    };

    const { result: hookResult } = renderHook(() => useDragEnd());

    hookResult.current(result);

    expect(moveIssue).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("does not dispatch moveIssue action if source and destination are the same", () => {
    const result = {
      destination: { droppableId: "column-1", index: 0 },
      source: { droppableId: "column-1", index: 0 },
    };

    const { result: hookResult } = renderHook(() => useDragEnd());

    hookResult.current(result);

    expect(moveIssue).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
