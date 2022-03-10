
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Notfound from './pages/Notfound';

function App() {
  // const [data, setData] = useState();
  // useEffect(() => {
  //   fetchTest();
  // }, []);
  // const fetchTest = async () => {
  //   const response = await fetch(
  //     'https://nutri-track-nick.herokuapp.com/api/v1/users/login'
  //   );
  //   const data2 = await response.json();
  //   setData(data2);
  //   console.log(data2);
  // };
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/*' element={<Notfound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
