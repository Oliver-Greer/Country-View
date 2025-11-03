import type { SelectedStateState, Member } from "../App.tsx";

interface SideBarProps {
  selectedStateState: SelectedStateState;
}

interface RepsListComponentProps {
  selectedStateState: SelectedStateState;
}

interface SideBarEntryProps {
  member: Member;
}

const SideBar: React.FC<SideBarProps> = ({ selectedStateState }) => {
  let transitionState = "transform translate-x-0";
  if (!selectedStateState.isStateClicked) {
    transitionState = "transform -translate-x-[25vw]";
  }
  const baseClasses =
    "absolute ring-[1vw] z-1 h-screen align-center w-[25vw] rounded bg-zinc-800/90 ring-zinc-900 flex-none transition-transform duration-1000 ease-in-out";

  return (
    <div>
      <p className="absolute z-3 top-10 inset-x-0 text-2xl md:text-4xl lg:text-6xl text-center text-zinc-300 font-sans font-bold">
        {selectedStateState.selectedNameAndID.selectedName}
      </p>
      <div className={`${baseClasses} ${transitionState}`}>
        <div className="w-full flex flex-col items-center pt-10 px-4 overflow-y-auto max-h-full">
          <p className="text-center text-2xl md:text-4xl lg:text-6xl font-sans font-bold mb-20">
            Representatives
          </p>
          <RepsListComponent
            selectedStateState={selectedStateState}
          ></RepsListComponent>
        </div>
      </div>
    </div>
  );
};

const RepsListComponent: React.FC<RepsListComponentProps> = ({
  selectedStateState,
}) => {
  const allMembers = selectedStateState.reps.members;
  const isArray = Array.isArray(allMembers);

  return (
    <div className="w-full space-y-4 flex-grow">
      {isArray && allMembers.length > 0 ? (
        allMembers.map((member, index) => {
          return <SideBarEntry key={index} member={member} />;
        })
      ) : (
        <div className="p-4 text-center text-gray-500">
          No representatives found for this state.
        </div>
      )}
    </div>
  );
};

const SideBarEntry: React.FC<SideBarEntryProps> = ({ member }) => {
  return (
    <div>
      <>{member.name}</>
      <>{member.party}</>
      <>{member.chamber}</>
      <>{member.district}</>
    </div>
  );
};

export default SideBar;
