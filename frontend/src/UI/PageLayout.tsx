import React from "react";
import USMap, { type USMapProps } from "../US_components/USMap";
import SideBar, { type SideBarProps } from "./SideBar";
import { useState, useEffect } from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isStateClicked, setStateClicked] = useState(
    JSON.parse(localStorage.getItem("isStateClicked") || "false") || false,
  ); // JSON.parse cannot take null values so check for key: "" instead
  useEffect(() => {
    localStorage.setItem("isStateClicked", isStateClicked.toString());
  }, [isStateClicked]);

  return (
    <div className="pageLayout z-0 w-screen bg-linear-to-t from-zinc-800 to-red-950">
      <div>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return child;
          }
          const elementA = child as React.ReactElement<SideBarProps>;
          if (child.type === SideBar) {
            return React.cloneElement(elementA, {
              isOpen: isStateClicked,
            });
          }

          if (!React.isValidElement(child)) {
            return child;
          }
          const elementB = child as React.ReactElement<USMapProps>;
          if (child.type === USMap) {
            return React.cloneElement(elementB, {
              setStateClicked: setStateClicked,
            });
          }
          return child;
        })}
      </div>
    </div>
  );
};

export default PageLayout;
