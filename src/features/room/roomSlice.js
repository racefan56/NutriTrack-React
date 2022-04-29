import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roomService from './roomService';

const initialState = {
  rooms: null,
  room: null,
  loading: true,
  isError: false,
  message: '',
  isSuccess: false,
};

//Create room
export const createRoom = createAsyncThunk(
  'room/createRoom',
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await roomService.createRoom(formData, token);
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

//Get all rooms
export const getRooms = createAsyncThunk(
  'room/getRooms',
  async (queryString, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await roomService.getRooms(queryString, token);
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

//Get one room
export const getRoom = createAsyncThunk(
  'room/getRoom',
  async (roomId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await roomService.getRoom(roomId, token);
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

//Update one room
export const updateRoom = createAsyncThunk(
  'room/updateRoom',
  async ([roomId, formData], thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await roomService.updateRoom(roomId, formData, token);
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

//Delete one room
export const deleteRoom = createAsyncThunk(
  'room/deleteRoom',
  async (roomId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await roomService.deleteRoom(roomId, token);
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

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRoom.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.room = action.payload.data.data;
        state.loading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
        state.loading = false;
      })
      .addCase(getRooms.pending, (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.loading = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.rooms = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.rooms = null;
      })
      .addCase(getRoom.pending, (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.loading = true;
      })
      .addCase(getRoom.fulfilled, (state, action) => {
        state.room = action.payload.data.data;
        state.loading = false;
      })
      .addCase(getRoom.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.room = null;
      })
      .addCase(updateRoom.pending, (state) => {
        state.isError = false;
        state.loading = true;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.room = action.payload.data.data;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(deleteRoom.pending, (state) => {
        state.isError = false;
        state.loading = true;
      })
      .addCase(deleteRoom.fulfilled, (state) => {
        state.room = null;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
      });
  },
});

export const { reset } = roomSlice.actions;

export default roomSlice.reducer;
