import { RotatingLines } from "react-loader-spinner";

export const LoadingSpinner = () => {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      width="50"
      height="50"
      visible={true}
    />
  );
}
