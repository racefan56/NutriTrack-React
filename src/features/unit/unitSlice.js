import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import unitService from './unitService';

const initialState = {
  units: null,
  unit: null,
  loading: true,
  isError: false,
  message: '',
  isSuccess: false,
};

//Create unit
export const createUnit = createAsyncThunk(
  'unit/createUnit',
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await unitService.createUnit(formData, token);
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

//Update one unit
export const updateUnit = createAsyncThunk(
  'unit/updateUnit',
  async ([unitId, formData], thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await unitService.updateUnit(unitId, formData, token);
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

//Delete one unit
export const deleteUnit = createAsyncThunk(
  'unit/deleteUnit',
  async (unitId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await unitService.deleteUnit(unitId, token);
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
      .addCase(createUnit.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(createUnit.fulfilled, (state, action) => {
        state.unit = action.payload.data.data;
        state.isSuccess = true;
        state.loading = false;
      })
      .addCase(createUnit.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(getUnits.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getUnits.fulfilled, (state, action) => {
        state.units = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getUnits.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.units = null;
      })
      .addCase(getUnit.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getUnit.fulfilled, (state, action) => {
        state.unit = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getUnit.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.unit = null;
      })
      .addCase(updateUnit.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(updateUnit.fulfilled, (state, action) => {
        state.unit = action.payload.data.data;
        state.isSuccess = true;
        state.loading = false;
      })
      .addCase(updateUnit.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(deleteUnit.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(deleteUnit.fulfilled, (state) => {
        state.unit = null;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(deleteUnit.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      });
  },
});

export const { reset } = unitSlice.actions;

export default unitSlice.reducer;
