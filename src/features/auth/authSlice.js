import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  email: '',
  token: null,
  loading: false,
  userRole: null,
  loggedIn: false,
};

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userObj, thunkAPI) => {
    try {
      return await authService.loginUser(userObj);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.loading = true;
      state.isSuccess = true;
      state.loggedIn = false;
      state.token = null;
      state.email = '';
      state.userRole = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.loggedIn = true;
        state.token = `Bearer ${action.payload.token}`;
        state.email = action.payload.data.user.email;
        state.userRole = action.payload.data.user.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
        state.token = null;
        state.email = null;
        state.userRole = null;
      });
  },
});

export const { reset, logout } = authSlice.actions;

export default authSlice.reducer;
