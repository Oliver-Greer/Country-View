import state_data from "../../public/state_data.json";
import StateData from "../StateData/StateData.tsx";
import "./USMap.css";
import { useRef, useEffect, useReducer } from "react";

type MapState = {
  viewBox: string;
  targetViewBox: string;
  selectedName: string;
};

type MapSetViewboxAction = {
  type: "SET_VIEWBOX";
  payload: string;
};

type MapSetTargetViewboxAction = {
  type: "SET_TARGET_VIEWBOX";
  payload: string;
};

type MapSetSelectedNameAction = {
  type: "SET_SELECTED_NAME";
  payload: string;
};

type MapAction =
  | MapSetViewboxAction
  | MapSetTargetViewboxAction
  | MapSetSelectedNameAction;

const initialViewBox = "0 0 2000 1700";

const initialMapState: MapState = {
  viewBox: localStorage.getItem("viewBox") || initialViewBox,
  targetViewBox: localStorage.getItem("targetViewBox") || initialViewBox,
  selectedName: localStorage.getItem("selectedName") || "",
};

export interface USMapProps {
  setStateClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const mapReducer = (state: MapState, action: MapAction) => {
  switch (action.type) {
    case "SET_VIEWBOX":
      return { ...state, viewBox: action.payload };
    case "SET_TARGET_VIEWBOX":
      return { ...state, targetViewBox: action.payload };
    case "SET_SELECTED_NAME":
      return { ...state, selectedName: action.payload };
    default:
      throw new Error();
  }
};

const USMap: React.FC<USMapProps> = ({ setStateClicked }) => {
  const animationRef = useRef<number | null>(null);

  const [mapState, dispatchMapState] = useReducer(mapReducer, initialMapState);

  useEffect(() => {
    localStorage.setItem("viewBox", mapState.viewBox);
  }, [mapState.viewBox]);
  useEffect(() => {
    localStorage.setItem("targetViewBox", mapState.targetViewBox);
  }, [mapState.targetViewBox]);
  useEffect(() => {
    localStorage.setItem("selectedName", mapState.selectedName);
  }, [mapState.selectedName]);

  const animateViewBox = (target: string, duration = 1000) => {
    dispatchMapState({ type: "SET_TARGET_VIEWBOX", payload: target });
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startTime = performance.now();
    const startViewBox = mapState.viewBox.split(" ").map(Number);
    const endViewBox = target.split(" ").map(Number);

    const stepThroughAnimation = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      let t = Math.min(1, elapsedTime / duration);
      t = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // ease in and out

      const newViewBox = startViewBox.map(
        (startingValue: number, index: number) => {
          return startingValue + t * (endViewBox[index] - startingValue); // lerp function
        },
      );

      dispatchMapState({ type: "SET_VIEWBOX", payload: newViewBox.join(" ") });

      if (t < 1) {
        animationRef.current = requestAnimationFrame(stepThroughAnimation);
      } else {
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(stepThroughAnimation);
  };

  const handleClick = (bounds: Record<string, number>, name: string) => {
    let newViewBox = `${bounds["x_min"] - (bounds["x_max"] - bounds["x_min"]) / 2} ${bounds["y_min"] - (bounds["y_max"] - bounds["y_min"]) / 2} ${(bounds["x_max"] - bounds["x_min"]) * 2} ${(bounds["y_max"] - bounds["y_min"]) * 2}`;
    if (newViewBox == mapState.targetViewBox) {
      newViewBox = initialViewBox;
      setStateClicked(false);
      dispatchMapState({ type: "SET_SELECTED_NAME", payload: "" });
    } else {
      setStateClicked(true);
      dispatchMapState({ type: "SET_SELECTED_NAME", payload: name });
    }
    animateViewBox(newViewBox);
  };

  const getStateColorLogic = () => {
    // if majority of reps are repub, return red
    // if majority are dem return blue
    // otherwise return purple
    // perhaps a gradient mapping would be nice
    // should fetch asynchronously using axios and show loading screen, remember to use async and await
    // This means the app main component needs to share some state and conditionally render a loading screen
    return { base: "#8f0000ff", hover: "#da0000ff" };
  };

  return (
    <>
      <div className="w-screen h-screen">
        <p className="absolute z-3 top-10 inset-x-0 text-2xl md:text-4xl lg:text-6xl text-center text-zinc-300 font-sans font-bold">
          {mapState.selectedName}
        </p>
        <div className="z-1 flex items-center w-full">
          <svg className="w-screen h-screen flex " viewBox={mapState.viewBox}>
            {state_data.map((state) => {
              const colors = getStateColorLogic();

              return (
                <StateData
                  name={state.name}
                  key={state.name}
                  id={state.id}
                  path={state.path}
                  click={() => {
                    handleClick(state.bounds, state.name);
                  }}
                  style={{
                    fill: colors.base,
                    "--hover-fill": colors.hover,
                  }}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </>
  );
};

export default USMap;
