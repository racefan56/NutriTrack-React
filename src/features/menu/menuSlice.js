import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import menuService from './menuService';

const initialState = {
  menus: null,
  menu: null,
  loading: true,
  isError: false,
  message: '',
  isSuccess: false,
};

//Create menu
export const createMenu = createAsyncThunk(
  'menu/createMenu',
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await menuService.createMenu(formData, token);
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

//Get all menus
export const getMenus = createAsyncThunk(
  'menu/getMenus',
  async (queryString, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await menuService.getMenus(queryString, token);
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

//Get one menu
export const getMenu = createAsyncThunk(
  'menu/getMenu',
  async (menuId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await menuService.getMenu(menuId, token);
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

//Update one menu
export const updateMenu = createAsyncThunk(
  'menu/updateMenu',
  async ([menuId, formData], thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await menuService.updateMenu(menuId, formData, token);
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

//Delete one menu
export const deleteMenu = createAsyncThunk(
  'menu/deleteMenu',
  async (menuId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await menuService.deleteMenu(menuId, token);
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

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.menu = action.payload.data.data;
        state.isSuccess = true;
        state.loading = false;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(getMenus.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getMenus.fulfilled, (state, action) => {
        state.menus = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getMenus.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.menus = null;
      })
      .addCase(getMenu.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getMenu.fulfilled, (state, action) => {
        state.menu = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getMenu.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.menu = null;
      })
      .addCase(updateMenu.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        state.menu = action.payload.data.data;
        state.isSuccess = true;
        state.loading = false;
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(deleteMenu.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(deleteMenu.fulfilled, (state) => {
        state.menu = null;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      });
  },
});

export const { reset } = menuSlice.actions;

export default menuSlice.reducer;
