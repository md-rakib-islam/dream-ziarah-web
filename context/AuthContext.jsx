"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { loginUser, verifySession, refreshToken, logout } from "@/lib/auth";

// Create the Auth Context
const AuthContext = createContext(null);

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Action types
const AUTH_ACTIONS = {
  SET_LOADING: "SET_LOADING",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  VERIFY_SUCCESS: "VERIFY_SUCCESS",
  VERIFY_FAILURE: "VERIFY_FAILURE",
  REFRESH_SUCCESS: "REFRESH_SUCCESS",
  REFRESH_FAILURE: "REFRESH_FAILURE",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILURE: "LOGOUT_FAILURE",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Reducer function
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };

    case AUTH_ACTIONS.VERIFY_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case AUTH_ACTIONS.VERIFY_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };

    case AUTH_ACTIONS.REFRESH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };

    case AUTH_ACTIONS.REFRESH_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };

    case AUTH_ACTIONS.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGOUT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// Auth Provider Component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login function
  const login = useCallback(async (username, password) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

      const result = await loginUser(username, password);

      if (result.success) {
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: result.user,
        });
        return { success: true };
      } else {
        dispatch({
          type: AUTH_ACTIONS.LOGIN_FAILURE,
          payload: result.error,
        });
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = "Network error. Please try again.";
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  }, []);

  // Verify session function
  const verifyUserSession = useCallback(async () => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

      let currentUser = await verifySession();

      if (!currentUser) {
        currentUser = await refreshToken();
      }

      if (currentUser) {
        dispatch({
          type: AUTH_ACTIONS.VERIFY_SUCCESS,
          payload: currentUser,
        });
      } else {
        dispatch({
          type: AUTH_ACTIONS.VERIFY_FAILURE,
          payload: "No active session",
        });
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.VERIFY_FAILURE,
        payload: "Session verification failed.",
      });
    }
  }, []);

  // Refresh token function
  const refreshUserToken = useCallback(async () => {
    try {
      const refreshedUser = await refreshToken();

      if (refreshedUser) {
        dispatch({
          type: AUTH_ACTIONS.REFRESH_SUCCESS,
          payload: refreshedUser,
        });
        return true;
      } else {
        dispatch({
          type: AUTH_ACTIONS.REFRESH_FAILURE,
          payload: "Refresh failed, session expired.",
        });
        return false;
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.REFRESH_FAILURE,
        payload: "Token refresh network error.",
      });
      return false;
    }
  }, []);

  // Logout function
  const logoutUser = useCallback(async () => {
    try {
      await logout();
      dispatch({ type: AUTH_ACTIONS.LOGOUT_SUCCESS });
      return { success: true };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGOUT_FAILURE,
        payload: "Logout failed.",
      });
      return { success: false, error: "Logout failed." };
    }
  }, []);

  // Clear error function
  const clearError = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  }, []);

  // Initial session verification and token refresh setup
  useEffect(() => {
    // Perform initial session verification
    verifyUserSession();

    // Set up automatic token refresh (every 14 minutes for a 15-min token)
    const refreshIntervalId = setInterval(() => {
      refreshUserToken();
    }, 14 * 60 * 1000); // 14 minutes

    // Cleanup function
    return () => clearInterval(refreshIntervalId);
  }, [verifyUserSession, refreshUserToken]);

  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    login,
    logout: logoutUser,
    verifySession: verifyUserSession,
    refreshToken: refreshUserToken,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the Auth Context
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
