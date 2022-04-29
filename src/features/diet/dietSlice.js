import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dietService from './dietService';

const initialState = {
  diets: null,
  diet: null,
  loading: true,
  isError: false,
  message: '',
  isSuccess: '',
};

//Create diet
export const createDiet = createAsyncThunk(
  'diet/createDiet',
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await dietService.createDiet(formData, token);
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
      return await dietService.getDiet(dietId, token);
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

//Update one diet
export const updateDiet = createAsyncThunk(
  'diet/updateDiet',
  async ([dietId, formData], thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await dietService.updateDiet(dietId, formData, token);
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

//Delete one diet
export const deleteDiet = createAsyncThunk(
  'diet/deleteDiet',
  async (dietId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await dietService.deleteDiet(dietId, token);
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
      .addCase(createDiet.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(createDiet.fulfilled, (state, action) => {
        state.diet = action.payload.data.data;
        state.isSuccess = true;
        state.loading = false;
      })
      .addCase(createDiet.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(getDiets.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getDiets.fulfilled, (state, action) => {
        state.diets = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getDiets.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.menuItems = null;
      })
      .addCase(getDiet.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getDiet.fulfilled, (state, action) => {
        state.diet = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getDiet.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.menuItem = null;
      })
      .addCase(updateDiet.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(updateDiet.fulfilled, (state, action) => {
        state.diet = action.payload.data.data;
        state.isSuccess = true;
        state.loading = false;
      })
      .addCase(updateDiet.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(deleteDiet.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(deleteDiet.fulfilled, (state) => {
        state.diet = null;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(deleteDiet.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      });
  },
});

export const { reset } = dietSlice.actions;

export default dietSlice.reducer;
