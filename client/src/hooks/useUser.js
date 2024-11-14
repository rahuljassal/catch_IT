import { useSelector, useDispatch } from "react-redux";
import {
  selectUserType,
  selectUserInfo,
  setUserType,
  setUserInfo,
  clearUserData,
} from "../store/userSlice";

export const useUser = () => {
  const dispatch = useDispatch();
  const userType = useSelector(selectUserType);
  const userInfo = useSelector(selectUserInfo);

  const updateUserType = (type) => {
    dispatch(setUserType(type));
  };

  const updateUserInfo = (info) => {
    dispatch(setUserInfo(info));
  };

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
