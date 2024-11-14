import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userType: "", // "guest" | "authenticated"
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
      state.userType = "guest";
      state.userInfo = null;
    },
  },
});

export const { setUserType, setUserInfo, clearUserData } = userSlice.actions;

// Selectors
export const selectUserType = (state) => state.user.userType;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
