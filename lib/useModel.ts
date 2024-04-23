import { useSyncExternalStore } from "react";
const useModel = function (store: {
  subscribe: { bind: (arg0: any) => (onStoreChange: () => void) => () => void };
  getState: { bind: (arg0: any) => () => unknown };
  setState: (arg0: any) => void;
}) {
  const state = useSyncExternalStore(
    store.subscribe.bind(store),
    store.getState.bind(store)
  );
  return {
    useSelector(selector: (arg0: unknown) => any) {
      return selector(state);
    },
    useDispatch() {
      return (payLoad: any) => {
        store.setState(payLoad);
      };
    },
  };
};
export default useModel;
