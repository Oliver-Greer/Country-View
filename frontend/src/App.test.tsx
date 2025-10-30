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
      selectedName: "Nebraska",
    };

    const newState: SelectedStateState = selectedStateReducer(
      currentState,
      action,
    );

    const expectedState: SelectedStateState = {
      isStateClicked: false,
      selectedName: "",
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it("sets isStateClicked to true and name to change on SELECTED action", () => {
    const action: ClickStateAction = {
      type: "SET_STATE_SELECTED",
      payload: "Nebraska",
    };
    const currentState: SelectedStateState = {
      isStateClicked: false,
      selectedName: "",
    };

    const newState: SelectedStateState = selectedStateReducer(
      currentState,
      action,
    );

    const expectedState: SelectedStateState = {
      isStateClicked: true,
      selectedName: "Nebraska",
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
