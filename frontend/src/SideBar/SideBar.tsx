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
      <p className="absolute z-3 top-10 inset-x-0 text-4xl md:text-6xl lg:text-8xl text-center text-zinc-300 font-sans font-bold">
        <b>{selectedStateState.selectedNameAndID.selectedName}</b>
      </p>
      <div className={`${baseClasses} ${transitionState}`}>
        <div className="w-full flex flex-col items-center pt-10 px-4 overflow-y-auto max-h-full">
          <p className="text-center text-4xl md:text-6xl lg:text-8xl font-sans font-bold mb-20">
            <b>Representatives</b>
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
  const allMembers: Member[] = selectedStateState.reps?.members || [];

  return (
    <div className="flex justify-center">
      <ol className="flex-grow list-decimal pl-5 text-2xl md:text-4xl lg:text-6xl font-sans font-bold mb-20 p-2 text-center text-gray-500">
      {allMembers.length > 0 ? (
        allMembers.map((member, index) => {
          return <SideBarEntry key={index} member={member} />;
        })
      ) : (
        <div>
          <p>
            No representatives found for this state.
          </p>
        </div>
      )}
      </ol>
    </div>
  );
};

const SideBarEntry: React.FC<SideBarEntryProps> = ({ member }) => {
  return (
    <li>
      <div className="p-2 text-gray-500">
        <p className="text-left text-2xl md:text-4xl lg:text-6xl font-sans font-bold mb-20">
          Representative Name: {member.name}
        </p>
      </div>
      <div className="p-2 text-gray-500">
        <p className="text-left text-2xl md:text-4xl lg:text-6xl font-sans font-bold mb-20">
          Political Party: {member.party}
        </p>
      </div>
      <div className="p-2 text-gray-500">
        <p className="text-left text-2xl md:text-4xl lg:text-6xl font-sans font-bold mb-20">
          Chamber: {member.chamber}
        </p>
      </div>
      <div className="p-2 text-gray-500">
        <p className="text-left text-2xl md:text-4xl lg:text-6xl font-sans font-bold mb-20">
          District: {member.district}
        </p>
      </div>
    </li>
  );
};

export default SideBar;
