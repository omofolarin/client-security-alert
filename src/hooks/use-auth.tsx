import { loginUser, logout } from "../store-slices";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import React from "react";
import { useLocalStorage } from "./use-localstorage";

export const useAuth = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    value: token,
    setValue: setToken,
    removeValue: removeToken,
  } = useLocalStorage<string | null>("user_token", null);
  const {
    value: authUser,
    setValue: setAuthUser,
    removeValue: removeAuthUser,
  } = useLocalStorage<Record<string, unknown> | null>("auth_user", null);
  const [authChecked, setAuthChecked] = React.useState<boolean | null>(false);

  React.useEffect(() => {
    (async () => {
      if (authState.isAuth === false && authChecked === false) {
        if (authUser && token) {
          dispatch(loginUser(authUser));
        }

        setAuthChecked(true);
      }
    })();
  }, [authChecked, dispatch, token, authUser, authState.isAuth]);

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
    removeToken();
    removeAuthUser();
    dispatch(logout());
  };

  const updateUserData = React.useCallback(
    async (user: Record<string, unknown>) => {
      setAuthUser(Object.assign({}, authUser, user));
      dispatch(loginUser(Object.assign({}, authUser, user)));
    },
    [authUser]
  );

  return {
    authState,
    onLogin,
    logOut,
    authChecked,
    setAuthChecked,
    updateUserData,
  };
};

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  let location = useLocation();
  const navigate = useNavigate();
  const { authState, authChecked } = useAuth();

  React.useEffect(() => {
    const preAuth = ["/", "/signup", "/signup/user", "/signup/organization"];

    if (authChecked) {
      if (authState.isAuth && preAuth.includes(location.pathname)) {
        navigate("/home");
      } else if (!authState.isAuth && !preAuth.includes(location.pathname)) {
        navigate("/");
      }
    }
  }, [location.pathname, authState.isAuth, authChecked]);

  return <React.Fragment>{children}</React.Fragment>;
};
