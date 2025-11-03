import { describe, it, expect } from "vitest";
import { selectedStateReducer } from "./App";
import App from "./App";
import type { ClickStateAction, SelectedStateState } from "./App";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("State Reducer", () => {
  it("sets isStateClicked to false on NOT_SELECTED action", () => {
    const action: ClickStateAction = { type: "SET_STATE_NOT_SELECTED" };
    const currentState: SelectedStateState = {
      isStateClicked: true,
      selectedNameAndID: { selectedName: "California", selectedID: "CA" },
      isLoading: false,
      isError: false,
      reps: { members: [] },
    };

    const newState: SelectedStateState = selectedStateReducer(
      currentState,
      action,
    );

    const expectedState: SelectedStateState = {
      isStateClicked: false,
      selectedNameAndID: { selectedName: "", selectedID: "" },
      isLoading: false,
      isError: false,
      reps: { members: [] },
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it("sets isStateClicked to true and name to change on SELECTED action", () => {
    const action: ClickStateAction = {
      type: "SET_STATE_SELECTED",
      payload: { selectedName: "California", selectedID: "CA" },
    };
    const currentState: SelectedStateState = {
      isStateClicked: false,
      selectedNameAndID: { selectedName: "", selectedID: "" },
      reps: { members: [] },
      isError: false,
      isLoading: false,
    };

    const newState: SelectedStateState = selectedStateReducer(
      currentState,
      action,
    );

    const expectedState: SelectedStateState = {
      isStateClicked: true,
      selectedNameAndID: { selectedName: "California", selectedID: "CA" },
      reps: { members: [] },
      isError: false,
      isLoading: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });
});

describe("App Component", () => {
  it("renders all properties", () => {
    render(<App />);
    // NOTE: minimal test case as temp example
    // TODO: add more tests
    expect(screen.getByText("Representatives")).toBeInTheDocument();
  });
});
