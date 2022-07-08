import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import patientService from './patientService';
import { logout } from './../auth/authSlice';

const initialState = {
  patients: null,
  patient: null,
  patientOrders: null,
  patientOrder: null,
  loading: true,
  isError: false,
  isSuccess: false,
  message: '',
  census: null,
};

//Create patient
export const createPatient = createAsyncThunk(
  'patient/createPatient',
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await patientService.createPatient(formData, token);
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

//Create patient order
export const createPatientOrder = createAsyncThunk(
  'patient/createPatientOrder',
  async ([patientId, formData], thunkAPI) => {
    console.log(formData);
    try {
      const token = thunkAPI.getState().auth.token;
      return await patientService.createPatientOrder(
        patientId,
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

//Get all patient orders
export const getPatientOrders = createAsyncThunk(
  'patient/getPatientOrders',
  async (queryString, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await patientService.getPatientOrders(queryString, token);
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

//Get one patient order
export const getPatientOrder = createAsyncThunk(
  'patient/getPatientOrder',
  async ([patientId, orderId], thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await patientService.getPatientOrder(orderId, patientId, token);
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

//Update one patient order
export const updatePatientOrder = createAsyncThunk(
  'patient/updatePatientOrder',
  async ([patientId, orderId, formData], thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await patientService.updatePatientOrder(
        patientId,
        orderId,
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

//Delete one patient order
export const deletePatientOrder = createAsyncThunk(
  'patient/deletePatientOrder',
  async ([patientId, orderId], thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await patientService.deletePatientOrder(patientId, orderId, token);
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

//Get patient census report
export const getCensus = createAsyncThunk(
  'patient/getCensus',
  async (thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await patientService.getCensus(token);
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
      state.isSuccess = false;
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
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(createPatientOrder.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(createPatientOrder.fulfilled, (state, action) => {
        state.patientOrder = action.payload.data.data;
        state.isSuccess = true;
        state.loading = false;
      })
      .addCase(createPatientOrder.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(getPatients.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.patients = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getPatients.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.patients = null;
      })
      .addCase(getPatient.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getPatient.fulfilled, (state, action) => {
        state.patient = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getPatient.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.patient = null;
      })
      .addCase(getPatientOrders.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getPatientOrders.fulfilled, (state, action) => {
        state.patientOrders = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getPatientOrders.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.patientOrders = null;
      })
      .addCase(getPatientOrder.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getPatientOrder.fulfilled, (state, action) => {
        state.patientOrder = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getPatientOrder.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.patientOrder = null;
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
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(updatePatientOrder.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(updatePatientOrder.fulfilled, (state, action) => {
        state.patientOrder = action.payload.data.data;
        state.isSuccess = true;
        state.loading = false;
      })
      .addCase(updatePatientOrder.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(deletePatient.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(deletePatient.fulfilled, (state) => {
        state.patient = null;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(deletePatientOrder.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(deletePatientOrder.fulfilled, (state) => {
        state.patientOrder = null;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(deletePatientOrder.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(getCensus.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.loading = true;
      })
      .addCase(getCensus.fulfilled, (state, action) => {
        state.census = action.payload.data;
        state.loading = false;
      })
      .addCase(getCensus.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.census = null;
      })
      // Return state to defaults on user logout
      .addCase(logout, () => {
        return initialState;
      });
  },
});

export const { reset } = patientSlice.actions;

export default patientSlice.reducer;
