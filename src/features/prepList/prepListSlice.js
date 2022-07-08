import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import prepListService from './prepListService';

const initialState = {
  prepList: null,
  loading: true,
  isError: false,
  message: '',
  isSuccess: false,
};

//Get one prepList
export const getPrepList = createAsyncThunk(
  'prepList/getPrepList',
  async (queryString, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await prepListService.getPrepList(queryString, token);
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

export const prepListSlice = createSlice({
  name: 'prepList',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPrepList.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getPrepList.fulfilled, (state, action) => {
        state.prepList = action.payload.data.prepList;
        state.loading = false;
      })
      .addCase(getPrepList.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.prepList = null;
      });
  },
});

export const { reset } = prepListSlice.actions;

export default prepListSlice.reducer;
