import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  user: null,
  id: null,
  email: '',
  message: '',
  token: null,
  loading: false,
  isSuccess: true,
  userRole: null,
  loggedIn: false,
  countDownAutoLogoutWarning: 30000,
  countDownToWarningPopUp: 60000,
};

// Create user
export const createUser = createAsyncThunk(
  'auth/createUser',
  async (userObj, thunkAPI) => {
    try {
      return await authService.createUser(userObj);
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

// Update user password
export const updateUserPassword = createAsyncThunk(
  'auth/updateUserPassword',
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await authService.updateUserPassword(formData, token);
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

// Reset isSuccess
export const resetIsSuccess = createAsyncThunk(
  'auth/resetIsSuccess',
  async () => {
    return;
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
        state.isSuccess = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.user = action.payload.data.user;
        state.id = action.payload.data.user._id;
        state.token = `Bearer ${action.payload.token}`;
        state.email = action.payload.data.user.email;
        state.userRole = action.payload.data.user.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
        state.loggedIn = false;
        state.user = null;
        state.id = null;
        state.token = null;
        state.email = null;
        state.userRole = null;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.message = 'create user successful';
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(resetIsSuccess.fulfilled, (state) => {
        state.isSuccess = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
