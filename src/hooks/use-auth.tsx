import { loginUser, logout } from "../store-slices";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import React from "react";
import { useLocalStorage } from "./use-localstorage";

export const useAuth = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [token, setToken] = useLocalStorage<string | null>("user_token", null);
  const [authUser, setAuthUser] = useLocalStorage<Record<
    string,
    unknown
  > | null>("auth_user", null);
  const [authChecked, setAuthChecked] = React.useState(null);

  const onLogin = async (token: string, user: Record<string, unknown>) => {
    if (token) {
      setToken(token);
    }
    if (user) {
      setAuthUser(user);
    }

    return dispatch(loginUser(user));
  };

  const logOut = async () => {
    setToken(null);
    setAuthUser(null);
    dispatch(logout());
  };

  return {
    authState,
    onLogin,
    logOut,
    authChecked,
  };
};

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  let location = useLocation();
  const navigate = useNavigate();
  const { authState } = useAuth();
  console.log({ authState });

  React.useEffect(() => {
    const preAuth = [
      "/login",
      "/signup",
      "/signup/user",
      "/signup/organization",
    ];

    if (authState.isAuth && preAuth.includes(location.pathname)) {
      navigate("/home");
    } else if (!authState.isAuth && !preAuth.includes(location.pathname)) {
      navigate("/");
    }
  }, [location.pathname]);

  return <React.Fragment>{children}</React.Fragment>;
};
