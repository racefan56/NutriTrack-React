import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import patientReducer from '../features/patient/patientSlice';
import navigationReducer from '../features/navigation/navigationSlice';
import menuItemReducer from '../features/menuItem/menuItemSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patient: patientReducer,
    navigation: navigationReducer,
    menuItem: menuItemReducer,
  },
});
