import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import patientService from './patientService';
import { logout } from './../auth/authSlice';

const initialState = {
  patients: [],
  loading: false,
};

// Login user
export const getPatients = createAsyncThunk(
  'patient/getPatients',
  async (queryString, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await patientService.getPatients(queryString, token);
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

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload.data.data;
      })
      .addCase(getPatients.rejected, (state) => {
        state.loading = false;
        state.patients = [];
      })
      // Return state to defaults on user logout
      .addCase(logout, () => {
        return initialState;
      });
  },
});

export const { reset } = patientSlice.actions;

export default patientSlice.reducer;
