import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import patientService from './patientService';
import { logout } from './../auth/authSlice';

const initialState = {
  patients: null,
  patient: null,
  loading: true,
  isError: false,
  isSuccess: false,
};

//Create patient
export const createPatient = createAsyncThunk(
  'patient/createPatient',
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await patientService.createPatient(formData, token);
    } catch (error) {
      console.log(error.response);
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

//Get all patients
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

//Get one patient
export const getPatient = createAsyncThunk(
  'patient/getPatient',
  async (patientId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await patientService.getPatient(patientId, token);
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

//Update one patient
export const updatePatient = createAsyncThunk(
  'patient/updatePatient',
  async ([patientId, formData], thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await patientService.updatePatient(patientId, formData, token);
    } catch (error) {
      console.log(error.response);
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

//Delete one patient
export const deletePatient = createAsyncThunk(
  'patient/deletePatient',
  async (patientId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await patientService.deletePatient(patientId, token);
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
      .addCase(createPatient.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.patient = action.payload.data.data;
        state.isSuccess = true;
        state.loading = false;
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(getPatients.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload.data.data;
      })
      .addCase(getPatients.rejected, (state) => {
        state.isError = true;
        state.loading = false;
        state.patients = null;
      })
      .addCase(getPatient.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patient = action.payload.data.data;
      })
      .addCase(getPatient.rejected, (state) => {
        state.loading = false;
        state.patient = null;
      })
      .addCase(updatePatient.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.patient = action.payload.data.data;
        state.isSuccess = true;
        state.loading = false;
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(deletePatient.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(deletePatient.fulfilled, (state) => {
        state.patient = [];
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      })
      // Return state to defaults on user logout
      .addCase(logout, () => {
        return initialState;
      });
  },
});

export const { reset } = patientSlice.actions;

export default patientSlice.reducer;
