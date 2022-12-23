import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchSetting: {},
  tableSetting: {},
};
export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    searchSettingChange: (state, action) => {
      const { screenName } = action.payload;
      state.searchSetting[screenName] = action.payload.checkedValues;
    },
    tableSettingChange: (state, action) => {
      const { screenName } = action.payload;
      state.tableSetting[screenName] = action.payload.checkedValues;
    },
  },
});
export const { searchSettingChange, tableSettingChange } = settingSlice.actions;

export default settingSlice.reducer;
