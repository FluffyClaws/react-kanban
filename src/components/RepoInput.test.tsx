// RepoInput.test.tsx
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RepoInput from "./RepoInput";
import useLoadIssues from "../hooks/useLoadIssues";

jest.mock("../hooks/useLoadIssues", () => jest.fn());

const setup = () => {
  (useLoadIssues as jest.Mock).mockImplementation(() => jest.fn());

  return render(<RepoInput />);
};

describe("RepoInput Component", () => {
  it("renders the input field correctly", () => {
    setup();
    const inputElement = screen.getByPlaceholderText("Enter repository URL");
    expect(inputElement).toBeInTheDocument();
  });

  it("allows the user to input a GitHub repository URL", () => {
    setup();
    const inputElement = screen.getByPlaceholderText(
      "Enter repository URL"
    ) as HTMLInputElement;
    fireEvent.change(inputElement, {
      target: { value: "https://github.com/user/repo" },
    });
    expect(inputElement.value).toBe("https://github.com/user/repo");
  });

  it('displays links based on the submitted URL after clicking the "Load" button', () => {
    setup();
    const inputElement = screen.getByPlaceholderText("Enter repository URL");
    fireEvent.change(inputElement, {
      target: { value: "https://github.com/user/repo" },
    });
    fireEvent.click(screen.getByText("Load"));

    const userProfileLink = screen.getByText("Visit user's Profile");
    const repoLink = screen.getByText("Visit repo Repo");

    expect(userProfileLink).toBeInTheDocument();
    expect(userProfileLink).toHaveAttribute("href", "https://github.com/user");
    expect(repoLink).toBeInTheDocument();
    expect(repoLink).toHaveAttribute("href", "https://github.com/user/repo");
  });
});
