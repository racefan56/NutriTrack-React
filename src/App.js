import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/Auth/AuthContext';
import { PatientProvider } from './context/Patients/PatientsContext';

import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/layout/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import ControlPanel from './pages/ControlPanel';
import Notfound from './pages/Notfound';

function App() {
  return (
    <AuthProvider>
      <PatientProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<PrivateRoute />}>
              <Route path='/home' element={<Home />} />
            </Route>
            <Route
              path='/control-panel'
              element={<PrivateRoute validRoles={['admin']} />}
            >
              <Route path='/control-panel' element={<ControlPanel />} />
            </Route>
            <Route path='/*' element={<Notfound />} />
          </Routes>
        </Router>
      </PatientProvider>
    </AuthProvider>
  );
}

export default App;
