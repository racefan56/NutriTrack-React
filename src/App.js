import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/layout/Navbar/Navbar';

import Login from './pages/Login/Login';
import ControlPanel from './pages/ControlPanel/ControlPanel';
import Census from './pages/Census/Census';
import Alerts from './pages/Alerts';

import Patients from './pages/Patients/Patients';
import Patient from './pages/Patient/Patient';
import CreatePatient from './pages/CreatePatient/CreatePatient';

import PatientOrders from './pages/PatientOrders/PatientOrders';
import PatientOrder from './pages/PatientOrder/PatientOrder';
import CreatePatientOrder from './pages/CreatePatientOrder/CreatePatientOrder';

import Notfound from './pages/NotFound/Notfound';

import MyAccount from './pages/MyAccount/MyAccount';
import ChangePassword from './pages/ChangePassword/ChangePassword';

import MenuItems from './pages/MenuItems/MenuItems';
import MenuItemPage from './pages/MenuItemPage/MenuItemPage';
import CreateMenuItem from './pages/CreateMenuItem/CreateMenuItem';

import ProductionAreas from './pages/ProductionAreas/ProductionAreas';
import ProductionArea from './pages/ProductionArea/ProductionArea';
import CreateProductionArea from './pages/CreateProductionArea/CreateProductionArea';

import Units from './pages/Units/Units';
import Unit from './pages/Unit/Unit';
import CreateUnit from './pages/CreateUnit/CreateUnit';

import Rooms from './pages/Rooms/Rooms';
import Room from './pages/Room/Room';
import CreateRoom from './pages/CreateRoom/CreateRoom';

import Diets from './pages/Diets/Diets';
import Diet from './pages/Diet/Diet';
import CreateDiet from './pages/CreateDiet/CreateDiet';

import Menus from './pages/Menus/Menus';
import Menu from './pages/Menu/Menu';
import CreateMenu from './pages/CreateMenu/CreateMenu';

import Users from './pages/Users/Users';
import User from './pages/User/User';
import CreateUser from './pages/CreateUser/CreateUser';

import AutoLogout from './components/AutoLogout/AutoLogout';

function App() {
  return (
    <>
      <AutoLogout />
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />

          {/* MY ACCOUNT ROUTES */}
          <Route path='/my-account' element={<PrivateRoute />}>
            <Route path='/my-account' element={<MyAccount />} />
          </Route>
          <Route path='/my-account/change-password' element={<PrivateRoute />}>
            <Route
              path='/my-account/change-password'
              element={<ChangePassword />}
            />
          </Route>

          {/* CONTROL PANEL */}
          <Route
            path='/control-panel'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/control-panel' element={<ControlPanel />} />
          </Route>

          {/* PRODUCTION AREA ROUTES */}
          {/* View/Edit/Delete a production area */}
          <Route
            path='/control-panel/production-areas/:productionAreaId'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route
              path='/control-panel/production-areas/:productionAreaId'
              element={<ProductionArea />}
            />
          </Route>

          {/* Create a production area */}
          <Route
            path='/control-panel/production-areas/create'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route
              path='/control-panel/production-areas/create'
              element={<CreateProductionArea />}
            />
          </Route>

          {/* Get all production areas */}
          <Route
            path='/control-panel/production-areas'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route
              path='/control-panel/production-areas'
              element={<ProductionAreas />}
            />
          </Route>

          {/* UNIT ROUTES */}
          {/* View/Edit/Delete a unit */}
          <Route
            path='/control-panel/units/:unitId'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/control-panel/units/:unitId' element={<Unit />} />
          </Route>

          {/* Create a unit */}
          <Route
            path='/control-panel/units/create'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route
              path='/control-panel/units/create'
              element={<CreateUnit />}
            />
          </Route>

          {/* Get all units */}
          <Route
            path='/control-panel/units'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/control-panel/units' element={<Units />} />
          </Route>

          {/* ROOM ROUTES */}
          {/* View/Edit/Delete a room */}
          <Route
            path='/control-panel/rooms/:roomId'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/control-panel/rooms/:roomId' element={<Room />} />
          </Route>

          {/* Create a room */}
          <Route
            path='/control-panel/rooms/create'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route
              path='/control-panel/rooms/create'
              element={<CreateRoom />}
            />
          </Route>

          {/* Get all rooms */}
          <Route
            path='/control-panel/rooms'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/control-panel/rooms' element={<Rooms />} />
          </Route>

          {/* DIET ROUTES */}
          {/* View/Edit/Delete a diet */}
          <Route
            path='/control-panel/diets/:dietId'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/control-panel/diets/:dietId' element={<Diet />} />
          </Route>

          {/* Create a diet */}
          <Route
            path='/control-panel/diets/create'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route
              path='/control-panel/diets/create'
              element={<CreateDiet />}
            />
          </Route>

          {/* Get all diets */}
          <Route
            path='/control-panel/diets'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/control-panel/diets' element={<Diets />} />
          </Route>

          {/* PATIENT ROUTES */}

          {/* View all patients */}
          <Route path='/patients' element={<PrivateRoute />}>
            <Route path='/patients' element={<Patients />} />
          </Route>

          {/* Create patient */}
          <Route
            path='/patients/create'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/patients/create' element={<CreatePatient />} />
          </Route>

          {/* View/Edit/Delete patient */}
          <Route path='/patients/:patientId' element={<PrivateRoute />}>
            <Route path='/patients/:patientId' element={<Patient />} />
          </Route>

          {/* Patient Alerts/Census */}
          <Route path='/patients/census' element={<PrivateRoute />}>
            <Route path='/patients/census' element={<Census />} />
          </Route>
          <Route path='/patients/alerts' element={<PrivateRoute />}>
            <Route path='/patients/alerts' element={<Alerts />} />
          </Route>

          {/* PATIENT ORDER ROUTES */}
          {/* View all patient orders */}
          <Route
            path='/patients/patient-orders'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route
              path='/patients/patient-orders'
              element={<PatientOrders />}
            />
          </Route>

          {/* View a single patient order */}
          <Route
            path='/patients/:patientId/orders/:orderId'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route
              path='/patients/:patientId/orders/:orderId'
              element={<PatientOrder />}
            />
          </Route>

          {/* Create a patient order */}
          <Route
            path='/patients/:patientId/orders/createOrder'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route
              path='/patients/:patientId/orders/createOrder'
              element={<CreatePatientOrder />}
            />
          </Route>

          {/* MENU ITEM ROUTES */}
          {/* View all menu items */}
          <Route
            path='/control-panel/menu-items'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/control-panel/menu-items' element={<MenuItems />} />
          </Route>

          {/* Create menu item */}
          <Route
            path='/control-panel/menu-items/create'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route
              path='/control-panel/menu-items/create'
              element={<CreateMenuItem />}
            />
          </Route>

          {/* View/Edit/Delete menu item */}
          <Route
            path='/control-panel/menu-items/:menuItemId'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route
              path='/control-panel/menu-items/:menuItemId'
              element={<MenuItemPage />}
            />
          </Route>

          {/* MENU ROUTES */}
          {/* View all menus */}
          <Route
            path='/control-panel/menus'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/control-panel/menus' element={<Menus />} />
          </Route>

          {/* Create menu */}
          <Route
            path='/control-panel/menus/create'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route
              path='/control-panel/menus/create'
              element={<CreateMenu />}
            />
          </Route>

          {/* View/Edit/Delete menu */}
          <Route
            path='/control-panel/menus/:menuId'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/control-panel/menus/:menuId' element={<Menu />} />
          </Route>

          {/* USER ROUTES */}
          {/* View all users */}
          <Route
            path='/control-panel/users'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/control-panel/users' element={<Users />} />
          </Route>

          {/* Create user */}
          <Route
            path='/control-panel/users/create'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route
              path='/control-panel/users/create'
              element={<CreateUser />}
            />
          </Route>

          {/* View/Edit/Delete user */}
          <Route
            path='/control-panel/users/:userId'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/control-panel/users/:userId' element={<User />} />
          </Route>

          {/* PAGE NOT FOUND ROUTE */}
          <Route path='/*' element={<Notfound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
