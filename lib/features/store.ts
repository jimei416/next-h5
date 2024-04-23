import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum pageType {
  /**
   * 组织管理
   */
  manage = "1",
  /**
   * 主页
   */
  home = "home",
  /**
   * 个人信息
   */
  perata = "perata",
  /**
   * 组织列表
   */
  orglist = "4",
}

// Define a type for the slice state
export interface CounterState {
  value: string;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: pageType.home,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setPage } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
