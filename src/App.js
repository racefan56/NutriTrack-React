import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/layout/Navbar/Navbar';

import Login from './pages/Login/Login';
import ControlPanel from './pages/ControlPanel/ControlPanel';
import Census from './pages/Census';
import Alerts from './pages/Alerts';
import Patients from './pages/Patients/Patients';
import Patient from './pages/Patient/Patient';
import CreatePatient from './pages/CreatePatient/CreatePatient';
import PatientOrders from './pages/PatientOrders';
import MyAccount from './pages/MyAccount/MyAccount';
import Notfound from './pages/NotFound/Notfound';
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

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />

          <Route
            path='/my-account'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/my-account' element={<MyAccount />} />
          </Route>
          <Route
            path='/census'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/census' element={<Census />} />
          </Route>
          <Route
            path='/alerts'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/alerts' element={<Alerts />} />
          </Route>

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

          {/* PATIENT ROUTES */}
          {/* View all patients */}
          <Route
            path='/patients'
            element={<PrivateRoute validRoles={['admin']} />}
          >
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
          <Route
            path='/patients/:patientId'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/patients/:patientId' element={<Patient />} />
          </Route>

          {/* PATIENT ORDER ROUTES */}
          <Route
            path='/patient-orders'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/patient-orders' element={<PatientOrders />} />
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

          {/* PAGE NOT FOUND ROUTE */}
          <Route path='/*' element={<Notfound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
