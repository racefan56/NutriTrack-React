import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
  users: null,
  user: null,
  loading: true,
  isError: false,
  message: '',
  isSuccess: false,
};

//Create user
export const createUser = createAsyncThunk(
  'user/createUser',
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await userService.createUser(formData, token);
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

//Get all users
export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (queryString, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await userService.getUsers(queryString, token);
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

//Get one user
export const getUser = createAsyncThunk(
  'user/getUser',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await userService.getUser(userId, token);
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

//Update one user
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ([userId, formData], thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await userService.updateUser(userId, formData, token);
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

//Delete one user
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await userService.deleteUser(userId, token);
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload.data.data;
        state.isSuccess = true;
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(getUsers.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.data.users;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.users = null;
      })
      .addCase(getUser.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.data.data;
        state.isSuccess = true;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
