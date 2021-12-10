import { useReducer } from "react";

const useAnchor = () => {
  const [anchor, setAnchor] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "drop":
          return action.position;
        case "retrieve":
          return { x: null, y: null };
        case "eventDrop":
          return { x: action.event.clientX, y: action.event.clientY };
      }
    },
    { x: null, y: null }
  );

  return [anchor, setAnchor];
};

export default useAnchor;
