import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productionAreaService from './productionAreaService';

const initialState = {
  productionAreas: null,
  productionArea: null,
  loading: true,
  isError: false,
  message: '',
  isSuccess: false,
};

//Create production area
export const createProductionArea = createAsyncThunk(
  'productionArea/createProductionArea',
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productionAreaService.createProductionArea(formData, token);
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

//Update one production area
export const updateProductionArea = createAsyncThunk(
  'productionArea/updateProductionArea',
  async ([productionAreaId, formData], thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productionAreaService.updateProductionArea(
        productionAreaId,
        formData,
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

//Delete one production area
export const deleteProductionArea = createAsyncThunk(
  'productionArea/deleteProductionArea',
  async (productionAreaId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productionAreaService.deleteProductionArea(
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
      .addCase(createProductionArea.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createProductionArea.fulfilled, (state, action) => {
        state.productionArea = action.payload.data.data;
        state.loading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(createProductionArea.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
        state.productionArea = null;
        state.loading = false;
      })
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
        state.productionAreas = [];
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
        state.productionArea = {};
      })
      .addCase(updateProductionArea.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(updateProductionArea.fulfilled, (state, action) => {
        state.productionArea = action.payload.data.data;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(updateProductionArea.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(deleteProductionArea.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(deleteProductionArea.fulfilled, (state) => {
        state.productionArea = {};
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(deleteProductionArea.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      });
  },
});

export const { reset } = productionAreaSlice.actions;

export default productionAreaSlice.reducer;
