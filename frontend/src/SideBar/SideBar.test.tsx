import { describe, it, expect } from "vitest";
import SideBar from "../SideBar/SideBar.tsx";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("SideBar Component", () => {
  it("Renders Text", () => {
    render(
      <SideBar
        selectedStateState={{ selectedName: "Delware", isStateClicked: true }}
      />,
    );

    expect(screen.getByText("Representatives")).toBeInTheDocument();
  });
});
