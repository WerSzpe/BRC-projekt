import './App.css';
import React from "react";
import { Route, Routes, Navigate} from 'react-router-dom';

import { AuthProvider, useAuth } from './components/AuthContext';

import Login from './components/Login';
import HomeView from './components/HomeView';
import SensorsView from './components/SensorsView';
import LedsView from './components/LedsView';
import NotFound from './components/NotFound';

const ProtectedRoute = ({children}) => {
  const {user} = useAuth();
  return user !== null ? <>{children}</>:<></>;
}

function App() {
  //TODO dodać protected route
  return (
    <div className="container-fluid">
      <div className='container'>
        <div className='content'>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<HomeView/>} />
            <Route path='/sensors' element={<SensorsView/>}/>
            <Route path='/leds' element={<LedsView/>} />
            <Route path='/login' element={<Login />} />

            <Route path='/notFound' element={<NotFound/>}/>
            <Route path="*" element={<Navigate to ="/notFound" />}/>
          </Routes>      
        </AuthProvider>  
        </div>
      </div>
    </div>
  );
}

export default App;
