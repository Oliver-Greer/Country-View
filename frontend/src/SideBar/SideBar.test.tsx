import { describe, it, expect } from "vitest";
import SideBar from "../SideBar/SideBar.tsx";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("SideBar Component", () => {
  it("Renders Text", () => {
    render(
      <SideBar
        selectedStateState={{
          isStateClicked: true,
          selectedNameAndID: { selectedName: "California", selectedID: "CA" },
          isLoading: false,
          isError: false,
          reps: { members: [] },
        }}
      />,
    );

    expect(screen.getByText("Representatives")).toBeInTheDocument();
  });

  //TODO: Add more comprehensive tests
});
