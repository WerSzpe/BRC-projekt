import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Articles from './components/Articles';
import { AuthProvider, useAuth } from './components/AuthContext';
import { StylesProvider} from './components/StylesContext';
import ShowUsers from './components/ShowUsers';
import { ToastContainer } from 'react-toastify';
import Navigation from "./components/Navigation";


const ProtectedRoute = ({ children }) => {
  const {user} = useAuth();
  return user!==null ? <>{children} </>: <></>;
};




const App = () => {


  return (

  <Router>
    <AuthProvider>
      <ToastContainer />
      <StylesProvider>
            <Routes>

              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/watki/*" element={<ProtectedRoute><Articles /></ProtectedRoute>} />
              </Routes>

      </StylesProvider>
    </AuthProvider>
  </Router>
  );
};

export default App;
