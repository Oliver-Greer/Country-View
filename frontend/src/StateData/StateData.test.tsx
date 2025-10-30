import { describe, it, expect } from "vitest";
import StateData from "../StateData/StateData.tsx";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("StateData Component", () => {
  it("Renders a path", () => {
    render(
      <StateData id="AK" path="" click={() => {}} name="Alaska" style={{}} />,
    );
  });

  // TODO: Test rendering a path correctly and simulate a click
});
