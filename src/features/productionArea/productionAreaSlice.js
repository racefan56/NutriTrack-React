import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productionAreaService from './productionAreaService';

const initialState = {
  productionAreas: [],
  productionArea: [],
  loading: true,
  isError: false,
  message: '',
  isSuccess: false,
};

//Get all productionAreas
export const getProductionAreas = createAsyncThunk(
  'productionArea/getProductionAreas',
  async (queryString, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productionAreaService.getProductionAreas(queryString, token);
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

//Get one productionArea
export const getProductionArea = createAsyncThunk(
  'productionArea/getProductionArea',
  async (productionAreaId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productionAreaService.getProductionArea(
        productionAreaId,
        token
      );
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

export const productionAreaSlice = createSlice({
  name: 'productionArea',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductionAreas.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getProductionAreas.fulfilled, (state, action) => {
        state.productionAreas = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getProductionAreas.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.menuItems = [];
      })
      .addCase(getProductionArea.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getProductionArea.fulfilled, (state, action) => {
        state.productionArea = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getProductionArea.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.productionArea = [];
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

export const { reset } = productionAreaSlice.actions;

export default productionAreaSlice.reducer;
