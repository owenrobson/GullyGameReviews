import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const STORAGE_KEY = 'ps_blog_auth';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (state) => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const userData = JSON.parse(stored);
          if (userData && userData.username) {
            state.user = userData;
            state.isAuthenticated = true;
          }
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
      state.isLoading = false;
      state.error = null;
    },
    
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
      } catch (error) {
        console.error('Error saving auth state:', error);
      }
    },
    
    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.payload;
    },
    
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      
      // Clear localStorage
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error('Error clearing auth state:', error);
      }
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  initializeAuth,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;