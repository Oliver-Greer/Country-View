import "./App.css";
import SideBar from "./SideBar/SideBar.tsx";
import USMap from "./USMap/USMap.tsx";
import { useReducer, useEffect, useCallback } from "react";
import {
  getLocalStorage,
  setLocalStorage,
} from "./utilities/localStorageHandler.tsx";
import axios from "axios";

export type SelectedStateState = {
  selectedNameAndID: Record<any, string>;
  isStateClicked: boolean;
  reps: Record<any, any>;
  isLoading: boolean;
  isError: boolean;
};

type SetStateSelected = {
  type: "SET_STATE_SELECTED";
  payload: Record<any, string>;
};

type SetStateNotSelected = {
  type: "SET_STATE_NOT_SELECTED";
};

type RepsFetchInit = {
  type: "REPS_FETCH_INIT";
};

type RepsFetchSuccess = {
  type: "REPS_FETCH_SUCCESS";
  payload: Record<any, any>;
};

type RepsFetchError = {
  type: "REPS_FETCH_ERROR";
};

export type ClickStateAction =
  | SetStateNotSelected
  | SetStateSelected
  | RepsFetchInit
  | RepsFetchSuccess
  | RepsFetchError;

const selectedStateReducer = (
  state: SelectedStateState,
  action: ClickStateAction,
) => {
  switch (action.type) {
    case "SET_STATE_SELECTED":
      return {
        ...state,
        isStateClicked: true,
        selectedNameAndID: action.payload,
      };
    case "SET_STATE_NOT_SELECTED":
      return {
        ...state,
        isStateClicked: false,
        selectedNameAndID: { selectedName: "", selectedID: "" },
      };
    case "REPS_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "REPS_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        reps: action.payload,
      };
    case "REPS_FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const initialStateState: SelectedStateState = {
  isStateClicked:
    JSON.parse(getLocalStorage("isStateClicked") || "false") || false,
  selectedNameAndID: {
    selectedName: getLocalStorage("selectedName") || "",
    selectedID: getLocalStorage("selectedID") || "",
  },
  reps: { members: [] },
  isLoading: false,
  isError: false,
};

function App() {
  const [selectedStateState, dispatchSelectedState] = useReducer(
    selectedStateReducer,
    initialStateState,
  );

  const handleFetchStateReps = useCallback(async () => {
    if (!selectedStateState.selectedNameAndID.selectedID) return;

    dispatchSelectedState({ type: "REPS_FETCH_INIT" });

    const firebaseHostingUrl = window.location.href;
    const url = `${firebaseHostingUrl}/api/members?state=${selectedStateState.selectedNameAndID.selectedID}`;

    try {
      const result = await axios.get(url);

      dispatchSelectedState({
        type: "REPS_FETCH_SUCCESS",
        payload: result.data.members,
      });
    } catch {
      dispatchSelectedState({ type: "REPS_FETCH_ERROR" });
    }
  }, [selectedStateState.selectedNameAndID.selectedID]);

  useEffect(() => {
    setLocalStorage(
      "isStateClicked",
      selectedStateState.isStateClicked.toString(),
    );
    setLocalStorage(
      "selectedID",
      selectedStateState.selectedNameAndID.selectedID,
    );
    setLocalStorage(
      "selectedName",
      selectedStateState.selectedNameAndID.selectedName,
    );
  }, [selectedStateState]);

  useEffect(() => {
    if (selectedStateState.isStateClicked) {
      handleFetchStateReps();
    }
  }, [handleFetchStateReps]);

  return (
    <>
      <div className="pageLayout z-0 w-screen bg-linear-to-t from-zinc-800 to-red-950">
        <div>
          <SideBar selectedStateState={selectedStateState} />
          <USMap dispatchSelectedState={dispatchSelectedState} />
        </div>
      </div>
    </>
  );
}

export default App;

export { selectedStateReducer };
