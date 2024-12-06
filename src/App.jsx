// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; // Importa el formulario de registro
import MainLayout from './layouts/MainLayout';

import Works from './pages/Works';
import Home from './pages/Home';
import PerfilGraduado from './components/Perfil/PerfilGraduado';

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />


        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas en MainLayout */}
        <Route path="/home/*" element={<MainLayout />}>
          <Route path="perfil" element={<PerfilGraduado />} />
          <Route path="works" element={<Works />} />
          <Route path="inicio" element={<Home />} /> 
          <Route path="" element={<Navigate to="inicio" />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
