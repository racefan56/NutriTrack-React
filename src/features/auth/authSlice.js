import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  email: '',
  token: null,
  loading: false,
  isSuccess: true,
  userRole: null,
  loggedIn: false,
  countDownAutoLogoutWarning: 30000,
  countDownToWarningPopUp: 60000,
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
    logout: () => {
      return initialState;
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
        state.lastClick = Date.now();
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

export const { logout } = authSlice.actions;

export default authSlice.reducer;
