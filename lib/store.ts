import { counterSlice } from "@/lib/features/store";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineSlices(counterSlice);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
