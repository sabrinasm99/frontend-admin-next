import { createGlobalState } from "react-hooks-global-state";

const initialState = { backdrop: false };
const { useGlobalState } = createGlobalState(initialState);

function useBackdrop() {
  const [backdrop, setBackdrop] = useGlobalState("backdrop");
  return [backdrop, setBackdrop];
}

export default useBackdrop;