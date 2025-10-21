import "./App.css";
import SideBar from "./SideBar/SideBar.tsx";
import USMap from "./USMap/USMap.tsx";
import { useState, useEffect } from "react";

function App() {
  const [isStateClicked, setStateClicked] = useState(
    JSON.parse(localStorage.getItem("isStateClicked") || "false") || false,
  ); // JSON.parse cannot take null values so check for key: "false" instead
  useEffect(() => {
    localStorage.setItem("isStateClicked", isStateClicked.toString());
  }, [isStateClicked]);

  return (
    <>
      <div className="pageLayout z-0 w-screen bg-linear-to-t from-zinc-800 to-red-950">
        <div>
          <SideBar isOpen={isStateClicked} />
          <USMap setStateClicked={setStateClicked} />
        </div>
      </div>
    </>
  );
}

export default App;
