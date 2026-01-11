import { describe, it, expect } from "vitest";
import { mapReducer } from "../USMap/USMap.tsx";
import type { MapAction, MapState } from "../USMap/USMap.tsx";
import "@testing-library/jest-dom";

describe("Map Reducer", () => {
  it("Sets current view box to new view box on SET_VIEWBOX action", () => {
    const action: MapAction = {
      type: "SET_VIEWBOX",
      payload: "0 0 2000 1700",
    };

    const currentState: MapState = {
      viewBox: "",
      targetViewBox: "0 1 2 3",
    };

    const newState: MapState = mapReducer(currentState, action);

    const expectedState: MapState = {
      viewBox: "0 0 2000 1700",
      targetViewBox: "0 1 2 3",
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it("Set target view box to new view box on SET_TARGET_VIEWBOX action", () => {
    const action: MapAction = {
      type: "SET_TARGET_VIEWBOX",
      payload: "0 0 2000 1700",
    };

    const currentState: MapState = {
      viewBox: "1 2 3 4",
      targetViewBox: "0 1 2 3",
    };

    const newState: MapState = mapReducer(currentState, action);

    const expectedState: MapState = {
      viewBox: "1 2 3 4",
      targetViewBox: "0 0 2000 1700",
    };

    expect(newState).toStrictEqual(expectedState);
  });
});

// TODO: Test actual Map component
