import * as React from "react";

const defaultState = {
  despawnTimer: undefined,
  verticalDirection: undefined,
  horizontalDirection: undefined,
  customNotification: undefined,
};

const StoryContext = React.createContext({
  state: defaultState,
  setState: (nextState) => {},
});

const StoryProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState(defaultState);

  const storyValue = {
    state,
    setState,
  };

  return (
    <StoryContext.Provider value={storyValue}>{children}</StoryContext.Provider>
  );
};

export { StoryProvider, StoryContext };
