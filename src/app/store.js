import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import patientReducer from '../features/patient/patientSlice';
import navigationReducer from '../features/navigation/navigationSlice';
import menuItemReducer from '../features/menuItem/menuItemSlice';
import productionAreaReducer from '../features/productionArea/productionAreaSlice';
import dietReducer from '../features/diet/dietSlice';
import unitReducer from '../features/unit/unitSlice';
import roomReducer from '../features/room/roomSlice';
import menuReducer from '../features/menu/menuSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patient: patientReducer,
    navigation: navigationReducer,
    menuItem: menuItemReducer,
    productionArea: productionAreaReducer,
    diet: dietReducer,
    unit: unitReducer,
    room: roomReducer,
    menu: menuReducer,
  },
});
