import { useSelector, useDispatch } from "react-redux";
import {
  selectUserType,
  selectUserInfo,
  setUserType,
  setUserInfo,
  clearUserData,
} from "@/store/slices/userSlice";
import { USER_TYPES } from "@/utils/constants";

/**
 * Custom hook for user state management
 * @returns {Object} User state and actions
 */
export const useUser = () => {
  const dispatch = useDispatch();
  const userType = useSelector(selectUserType);
  const userInfo = useSelector(selectUserInfo);

  /**
   * Update user type
   * @param {string} type - User type (guest/authenticated)
   */
  const updateUserType = (type) => {
    dispatch(setUserType(type));
  };

  /**
   * Update user information
   * @param {Object} info - User information
   */
  const updateUserInfo = (info) => {
    dispatch(setUserInfo(info));
  };

  /**
   * Clear user data and set to guest
   */
  const clearUser = () => {
    dispatch(clearUserData());
  };

  return {
    userType,
    userInfo,
    updateUserType,
    updateUserInfo,
    clearUser,
  };
};
