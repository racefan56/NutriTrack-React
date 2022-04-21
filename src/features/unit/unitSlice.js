import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import unitService from './unitService';

const initialState = {
  units: [],
  unit: [],
  loading: true,
  isError: false,
  message: '',
  isSuccess: '',
};

//Get all units
export const getUnits = createAsyncThunk(
  'unit/getUnits',
  async (queryString, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await unitService.getUnits(queryString, token);
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

//Get one unit
export const getUnit = createAsyncThunk(
  'unit/getUnit',
  async (unitId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await unitService.getUnit(unitId, token);
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

export const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUnits.pending, (state) => {
        state.isError = false;
        state.loading = true;
      })
      .addCase(getUnits.fulfilled, (state, action) => {
        state.units = action.payload.data.data;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(getUnits.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.units = [];
      })
      .addCase(getUnit.pending, (state) => {
        state.isError = false;
        state.loading = true;
      })
      .addCase(getUnit.fulfilled, (state, action) => {
        state.unit = action.payload.data.data;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(getUnit.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.unit = [];
      });
    //   .addCase(updateMenuItem.pending, (state) => {
    //     state.isError = false;
    //     state.loading = true;
    //   })
    //   .addCase(updateMenuItem.fulfilled, (state, action) => {
    //     state.menuItem = action.payload.data.data;
    //     state.loading = false;
    //     state.isSuccess = true;
    //   })
    //   .addCase(updateMenuItem.rejected, (state, action) => {
    //     state.isError = true;
    //     state.message = action.payload;
    //     state.loading = false;
    //     state.menuItem = [];
    //   })
    //   .addCase(deleteMenuItem.pending, (state) => {
    //     state.isError = false;
    //     state.loading = true;
    //   })
    //   .addCase(deleteMenuItem.fulfilled, (state) => {
    //     state.menuItem = [];
    //     state.loading = false;
    //     state.isSuccess = true;
    //   })
    //   .addCase(deleteMenuItem.rejected, (state, action) => {
    //     state.isError = true;
    //     state.message = action.payload;
    //     state.loading = false;
    //   });
  },
});

export const { reset } = unitSlice.actions;

export default unitSlice.reducer;
