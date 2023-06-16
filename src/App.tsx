import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './Login';
import Dashboard from './Dashboard';
import { GG_KEY } from './constants';
import AuthService from './services/auth';


function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const key = localStorage.getItem(GG_KEY);
    
    if (key) {
      setAuthenticated(true);
    }
  }, []);

  const handleCallbackResponse = async (res: any) => {
    const authService = new AuthService();
    const jwtResponse = await authService.signIn(res.credential);
    
    if (jwtResponse) {
      if (jwtResponse?.type == 'Error') {
        alert('Login failed!');
        setAuthenticated(false);
        localStorage.removeItem(GG_KEY);
        return false;
      }

      localStorage.setItem(GG_KEY, jwtResponse?.token);
      setAuthenticated(true);

      return true;
    }
  }

  const PrivateRoute = ({ authenticated, children }: any) => {
    console.log('PrivateRoute', authenticated);
    return authenticated ? <>{children}</> : <Navigate to="/login" />;
  }

  const Logout = () => {
    localStorage.removeItem(GG_KEY);
    return <Navigate to="/login" />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <PrivateRoute authenticated={authenticated}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="login" element={<Login handleCallbackResponse={handleCallbackResponse} />} />
        <Route 
          path="dashboard"
          element={
            <PrivateRoute authenticated={authenticated}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
