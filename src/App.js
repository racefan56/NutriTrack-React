import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/Auth/AuthContext';
import { PatientProvider } from './context/Patients/PatientsContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Notfound from './pages/Notfound';

function App() {
  return (
    <AuthProvider>
      <PatientProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/*' element={<Notfound />} />
          </Routes>
          <Footer />
        </Router>
      </PatientProvider>
    </AuthProvider>
  );
}

export default App;
