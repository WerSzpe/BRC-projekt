import './App.css';
import React from "react";
import {Route, Routes, Navigate} from 'react-router-dom';

import SensorsView from './components/SensorsView';

import LedsView from './components/LedsView';
import NotFound from './components/NotFound';
import HomeView from './components/HomeView';
import Login from './components/Login';

function App() {

  
  return (
    <div className="container-fluid">
      <div className='container'>
        <div className='content'>
                      
          <Routes>
            <Route path='/' element={<HomeView/>}/>
            <Route path='/sensors' element={<SensorsView/>}/>
            <Route path='/leds' element={<LedsView/>} />
            <Route path='/login' element={<Login />} />

            <Route path='/notFound' element={<NotFound/>}/>
            <Route path="*" element={<Navigate to ="/notFound" />}/>
          </Routes>      
                
        </div>
      </div>
    </div>
  );
}

export default App;
