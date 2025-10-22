import React from "react";

interface StateDataProps {
  id: string;
  path: string;
  click: Function;
  name: string;
  style: object;
}

const StateData: React.FC<StateDataProps> = ({
  id,
  path,
  click,
  name,
  style,
}) => {
  return (
    <path
      key={name}
      className="statePath"
      id={id}
      d={path}
      onClick={() => click()}
      style={style}
    />
  );
};

export default StateData;
