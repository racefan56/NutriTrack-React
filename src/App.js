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

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route
            path='/control-panel'
            element={<PrivateRoute validRoles={['admin']} />}
          >
            <Route path='/control-panel' element={<ControlPanel />} />
          </Route>
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
