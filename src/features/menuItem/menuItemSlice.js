import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import menuItemService from './menuItemService';

const initialState = {
  menuItems: null,
  menuItem: null,
  loading: true,
  isError: false,
  message: '',
  isSuccess: false,
};

//Create one menuItem
export const createMenuItem = createAsyncThunk(
  'menuItem/createMenuItem',
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await menuItemService.createMenuItem(formData, token);
    } catch (error) {
      console.log(error);
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

//Get all menuItems
export const getMenuItems = createAsyncThunk(
  'menuItem/getMenuItems',
  async (queryString, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await menuItemService.getMenuItems(queryString, token);
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

//Get one menuItem
export const getMenuItem = createAsyncThunk(
  'menuItem/getMenuItem',
  async (menuItemId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await menuItemService.getMenuItem(menuItemId, token);
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

//Update one menuItem
export const updateMenuItem = createAsyncThunk(
  'menuItem/updateMenuItem',
  async ([menuItemId, formData], thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await menuItemService.updateMenuItem(menuItemId, formData, token);
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

//Delete one menuItem
export const deleteMenuItem = createAsyncThunk(
  'menuItem/deleteMenuItem',
  async (menuItemId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await menuItemService.deleteMenuItem(menuItemId, token);
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

export const menuItemSlice = createSlice({
  name: 'menuItem',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenuItem.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createMenuItem.fulfilled, (state, action) => {
        state.menuItem = action.payload.data.data;
        state.loading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(createMenuItem.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
        state.loading = false;
      })
      .addCase(getMenuItems.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getMenuItems.fulfilled, (state, action) => {
        state.menuItems = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getMenuItems.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.loading = false;
        state.menuItems = [];
      })
      .addCase(getMenuItem.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getMenuItem.fulfilled, (state, action) => {
        state.menuItem = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getMenuItem.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.loading = false;
        state.menuItem = [];
      })
      .addCase(updateMenuItem.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        state.menuItem = action.payload.data.data;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(updateMenuItem.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.menuItem = [];
      })
      .addCase(deleteMenuItem.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(deleteMenuItem.fulfilled, (state) => {
        state.menuItem = [];
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(deleteMenuItem.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.loading = false;
      });
  },
});

export const { reset } = menuItemSlice.actions;

export default menuItemSlice.reducer;
