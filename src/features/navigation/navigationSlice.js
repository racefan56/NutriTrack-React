import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pathname: '/',
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setPathname: (state, action) => {
      state.pathname = action.payload;
      console.log(state.pathname);
    },
  },
});

export const { setPathname } = navigationSlice.actions;

export default navigationSlice.reducer;
