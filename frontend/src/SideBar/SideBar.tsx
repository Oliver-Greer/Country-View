import type { SelectedStateState, Member } from "../App.tsx";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner.tsx";

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
          <p className="text-center p-10 text-4xl md:text-6xl lg:text-8xl font-sans font-bold mb-20">
            <b>Representatives</b>
          </p>
            <RepsListComponent selectedStateState={selectedStateState}/>
        </div>
    </div>
  );
};

const RepsListComponent: React.FC<RepsListComponentProps> = ({
  selectedStateState,
}) => {
  const allMembers: Member[] = selectedStateState.reps?.members || [];
  const requestStateLoading: Boolean = selectedStateState.isLoading;
  const requestStateError: Boolean = selectedStateState.isError;

  if (requestStateError) {
    return (
      <div className="flex justify-center pl-5 text-2xl md:text-4xl lg:text-6xl font-sans font-bold mb-20 p-2 text-center text-gray-500">
        <p>
          An error occurred. Please try again later.
        </p>
      </div>
    )
  } else if (requestStateLoading) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner/>
      </div>
    );
  } else if (allMembers.length <= 0) {
    return (
      <div className="flex justify-center pl-5 text-2xl md:text-4xl lg:text-6xl font-sans font-bold mb-20 p-2 text-center text-gray-500">
        <p>
          No representives found in this state.
        </p>
      </div>
    )
  } else {
    return (
      <div className="w-fullflex flex-col justify-center items-center pt-10 px-4 overflow-y-auto overflow-x-hidden max-h-full">
        <div className="text-2xl px-25 break-words md:text-4xl lg:text-6xl font-sans font-bold mb-20 p-2 text-center text-gray-500">
            {
              allMembers.map((member, index) => {
                return <SideBarEntry key={index} member={member} />;
              })
            }
        </div>
      </div>
    );
  }
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
