import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';
import graduados from '../graduados.json'; // Importa el JSON

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Para manejar mensajes de error
  const navigate = useNavigate();

  // Verificar si el usuario ya está logueado
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      // Si hay una sesión activa, redirige al perfil directamente
      navigate('/home/perfil', { state: { user: JSON.parse(storedUser) } });
    }
  }, [navigate]);

  // Función para manejar el inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();

    // Buscar el usuario en el JSON
    const usuario = graduados.find(
      (user) => user.correo === email && user.contraseña === password
    );

    if (usuario) {
      // Guardar el usuario en LocalStorage
      localStorage.setItem('loggedInUser', JSON.stringify(usuario));
      // Redirigir a la página de perfil
      navigate('/home/perfil', { state: { user: usuario } });
    } else {
      // Si no se encuentra el usuario, mostrar mensaje de error
      setError('Correo o contraseña incorrectos.');
    }
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

          {error && (
            <div className="text-red-600 text-sm mb-4">
              {error}
            </div>
          )}

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
            onClick={() => navigate('/register')}
            className="text-sm text-red-800 hover:underline"
          >
            Registrar
          </button>
          <button
            onClick={() => navigate('/forgot-password')}
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
