import "./App.css";
import SideBar from "./SideBar/SideBar.tsx";
import USMap from "./USMap/USMap.tsx";
import { useReducer, useEffect } from "react";

export type SelectedStateState = {
  selectedName: string;
  isStateClicked: boolean;
};

type SetStateSelected = {
  type: "SET_STATE_SELECTED";
  payload: string;
};

type SetStateNotSelected = {
  type: "SET_STATE_NOT_SELECTED";
};

export type ClickStateAction = SetStateNotSelected | SetStateSelected;

const selectedStateReducer = (
  state: SelectedStateState,
  action: ClickStateAction,
) => {
  switch (action.type) {
    case "SET_STATE_SELECTED":
      return { ...state, isStateClicked: true, selectedName: action.payload };
    case "SET_STATE_NOT_SELECTED":
      return { ...state, isStateClicked: false, selectedName: "" };
    default:
      throw new Error();
  }
};

const initialStateState: SelectedStateState = {
  isStateClicked:
    JSON.parse(localStorage.getItem("isStateClicked") || "false") || false,
  selectedName: localStorage.getItem("selectedName") || "",
};

// move state up to App level
function App() {
  const [selectedStateState, dispatchSelectedState] = useReducer(
    selectedStateReducer,
    initialStateState,
  );

  useEffect(() => {
    localStorage.setItem("selectedName", selectedStateState.selectedName);
  }, [selectedStateState.selectedName]);
  useEffect(() => {
    localStorage.setItem(
      "isStateClicked",
      selectedStateState.isStateClicked.toString(),
    );
  }, [selectedStateState.isStateClicked]);

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
