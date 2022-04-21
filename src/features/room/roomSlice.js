import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roomService from './roomService';

const initialState = {
  rooms: [],
  room: [],
  loading: true,
  isError: false,
  message: '',
  isSuccess: '',
};

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
      .addCase(getRooms.pending, (state) => {
        state.isError = false;
        state.loading = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.rooms = action.payload.data.data;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.rooms = [];
      })
      .addCase(getRoom.pending, (state) => {
        state.isError = false;
        state.loading = true;
      })
      .addCase(getRoom.fulfilled, (state, action) => {
        state.room = action.payload.data.data;
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(getRoom.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.loading = false;
        state.room = [];
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

export const { reset } = roomSlice.actions;

export default roomSlice.reducer;
