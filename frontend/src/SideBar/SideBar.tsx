interface SideBarProps {
  isStateClicked: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isStateClicked }) => {
  let transitionState = "transform translate-x-0";
  if (!isStateClicked) {
    transitionState = "transform -translate-x-[25vw]";
  }
  const baseClasses =
    "absolute ring-[1vw] z-1 h-screen align-center w-[25vw] rounded bg-zinc-800/90 ring-zinc-900 flex-none transition-transform duration-1000 ease-in-out";

  //get data from backend and map over it
  return (
    <div className={`${baseClasses} ${transitionState}`}>
      <div className="w-full flex flex-col items-center pt-10 px-4 overflow-y-auto max-h-full">
        <p className="text-center text-2xl md:text-4xl lg:text-6xl font-sans font-bold mb-20">
          Representatives
        </p>
        <div className="w-full space-y-4 flex-grow">
          <p className="text-center text-1xl md:text-2xl lg:text-4xl font-sans font-bold">
            1
          </p>
          <p className="text-center text-1xl md:text-2xl lg:text-4xl font-sans font-bold">
            2
          </p>
          <p className="text-center text-1xl md:text-2xl lg:text-4xl font-sans font-bold">
            3
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
