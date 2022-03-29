import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/layout/Navbar/Navbar';

import Login from './pages/Login/Login';
import ControlPanel from './pages/ControlPanel/ControlPanel';
import Census from './pages/Census';
import Alerts from './pages/Alerts';
import Patients from './pages/Patients/Patients';
import PatientOrders from './pages/PatientOrders';
import MyAccount from './pages/MyAccount/MyAccount';
import Notfound from './pages/NotFound/Notfound';

function App() {
  return (
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
        <Route path='/census' element={<PrivateRoute validRoles={['admin']} />}>
          <Route path='/census' element={<Census />} />
        </Route>
        <Route path='/alerts' element={<PrivateRoute validRoles={['admin']} />}>
          <Route path='/alerts' element={<Alerts />} />
        </Route>
        <Route
          path='/patients'
          element={<PrivateRoute validRoles={['admin']} />}
        >
          <Route path='/patients' element={<Patients />} />
        </Route>
        <Route
          path='/patient-orders'
          element={<PrivateRoute validRoles={['admin']} />}
        >
          <Route path='/patient-orders' element={<PatientOrders />} />
        </Route>
        <Route path='/*' element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
