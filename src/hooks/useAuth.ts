import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  initializeAuth,
  loginStart,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
  clearError,
  User,
} from '../store/slices/authSlice';

// Get credentials from environment variables
const DEMO_CREDENTIALS = {
  username: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'password'
};

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  // Initialize auth state on mount
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const login = (username: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      dispatch(loginStart());

      // Simulate async login
      setTimeout(() => {
        if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
          const user: User = {
            id: '1',
            username: username,
            email: 'owen@example.com'
          };

          dispatch(loginSuccess(user));
          resolve(true);
        } else {
          dispatch(loginFailure('Invalid username or password'));
          resolve(false);
        }
      }, 500); // Small delay to simulate network request
    });
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearAuthError,
  };
};