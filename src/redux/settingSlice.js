import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchSetting: [],
  tableSetting: [],
};
export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    searchSettingChange: (state, action) => {
      state.searchSetting = action.payload;
    },
    tableSettingChange: (state, action) => {
      state.tableSetting = action.payload;
    },
  },
});
export const { searchSettingChange, tableSettingChange } = settingSlice.actions;

export default settingSlice.reducer;
