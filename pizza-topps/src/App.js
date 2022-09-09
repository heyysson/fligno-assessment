import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Home from './pages/Home';
import Pizza from './pages/Pizza';
import Addpizza from './pages/Addpizza';
import EditPizza from './pages/EditPizza';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminPrivateRoute from './AdminPrivateRoute';

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}`: '';
  return config;
});

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>

        {/* User */}
        <Route path="/login" 
          element={localStorage.getItem('auth_token') ? <Navigate to='/' replace/> : <Login />}/>
        <Route path="/register" 
          element={localStorage.getItem('auth_token') ? <Navigate to='/' replace/> : <Register />}/>

        {/* Admin */}
        <Route element={<AdminPrivateRoute/>} >
          <Route path="/admin" element={<Pizza/>} />
          <Route path="/admin/add-pizza" element={<Addpizza/>} />
          <Route path="/admin/edit-pizza/:id" element={<EditPizza/>} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
