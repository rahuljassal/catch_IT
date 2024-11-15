import { createSlice } from "@reduxjs/toolkit";
import { USER_TYPES } from "@/utils/constants";

/**
 * Initial state for user slice
 * @typedef {Object} UserState
 * @property {string} userType - Type of user (guest/authenticated)
 * @property {Object|null} userInfo - User information
 * @property {boolean} isLoading - Loading state
 * @property {string|null} error - Error message
 */
const initialState = {
  userType: USER_TYPES.NONE,
  userInfo: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserData: (state) => {
      state.userType = USER_TYPES.GUEST;
      state.userInfo = null;
    },
  },
});
export const { setUserType, setUserInfo, clearUserData } = userSlice.actions;

// Selectors
export const selectUserType = (state) => state.user.userType;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
