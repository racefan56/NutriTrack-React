import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dietService from './dietService';

const initialState = {
  diets: [],
  diet: [],
  loading: true,
  isError: false,
  message: '',
  isSuccess: '',
};

//Get all diets
export const getDiets = createAsyncThunk(
  'diet/getDiets',
  async (queryString, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await dietService.getDiets(queryString, token);
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

//Get one diet
export const getDiet = createAsyncThunk(
  'diet/getDiet',
  async (dietId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await dietService.getProductionArea(dietId, token);
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

// //Update one menuItem
// export const updateMenuItem = createAsyncThunk(
//   'menuItem/updateMenuItem',
//   async ([menuItemId, formData], thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.token;
//       return await menuItemService.updateMenuItem(menuItemId, formData, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// //Delete one menuItem
// export const deleteMenuItem = createAsyncThunk(
//   'menuItem/deleteMenuItem',
//   async (menuItemId, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.token;
//       return await menuItemService.deleteMenuItem(menuItemId, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const dietSlice = createSlice({
  name: 'productionArea',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDiets.pending, (state) => {
        state.isError = false;
        state.loading = true;
      })
      .addCase(getDiets.fulfilled, (state, action) => {
        state.diets = action.payload.data.data;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(getDiets.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.menuItems = [];
      })
      .addCase(getDiet.pending, (state) => {
        state.isError = false;
        state.loading = true;
      })
      .addCase(getDiet.fulfilled, (state, action) => {
        state.diet = action.payload.data.data;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(getDiet.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.menuItems = [];
      });
  },
});

export const { reset } = dietSlice.actions;

export default dietSlice.reducer;
