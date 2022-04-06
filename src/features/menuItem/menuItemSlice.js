import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import menuItemService from './menuItemService';

const initialState = {
  menuItems: [],
  menuItem: null,
  loading: true,
};

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
      .addCase(getMenuItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMenuItems.fulfilled, (state, action) => {
        state.menuItems = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getMenuItems.rejected, (state) => {
        state.loading = false;
        state.menuItems = [];
      })
      .addCase(getMenuItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMenuItem.fulfilled, (state, action) => {
        state.menuItem = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getMenuItem.rejected, (state) => {
        state.loading = false;
        state.menuItem = [];
      });
  },
});

export const { reset } = menuItemSlice.actions;

export default menuItemSlice.reducer;
