// src/components/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Función para manejar el inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home/perfil'); // Redirige a la página de perfil
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-24 h-24" />
        </div>

        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Ingresa tu correo"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 rounded-lg"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Enlaces adicionales */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => navigate('/register')} // Redirige a la página de registro
            className="text-sm text-red-800 hover:underline"
          >
            Registrar
          </button>
          <button
            onClick={() => navigate('/forgot-password')} // Ruta temporal para "Olvidé mi contraseña"
            className="text-sm text-red-800 hover:underline"
          >
            Olvidé mi contraseña
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
