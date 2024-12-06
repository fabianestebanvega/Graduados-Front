import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaHome, FaUser, FaClipboard, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); // Limpiar el LocalStorage
    navigate('/login', { replace: true }); // Redirigir al login con replace para evitar regresar con el botón atrás
  };

  return (
    <div
      className={`bg-red-700 text-white h-screen fixed top-0 left-0 z-10 p-4 flex flex-col justify-between ${
        isCollapsed ? 'w-20' : 'w-64'
      } transition-width duration-300`}
    >
      {/* Botón de Colapsar */}
      <button
        onClick={toggleSidebar}
        className="mb-6 text-white flex items-center justify-center p-2 bg-red-600 rounded hover:bg-red-500"
      >
        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      {/* Menú de enlaces */}
      <div className="flex flex-col space-y-4">
        <Link
          to="/home/inicio"
          className={`p-2 rounded hover:bg-red-600 ${
            location.pathname === '/home/inicio' ? 'bg-red-600' : ''
          } ${isCollapsed ? 'text-center' : ''}`}
        >
          {!isCollapsed ? 'Inicio' : <FaHome size={24} />}
        </Link>

        <Link
          to="/home/perfil"
          className={`p-2 rounded hover:bg-red-600 ${
            location.pathname === '/home/perfil' ? 'bg-red-600' : ''
          } ${isCollapsed ? 'text-center' : ''}`}
        >
          {!isCollapsed ? 'Perfil' : <FaUser size={24} />}
        </Link>

        <Link
          to="/home/works"
          className={`p-2 rounded hover:bg-red-600 ${
            location.pathname === '/home/works' ? 'bg-red-600' : ''
          } ${isCollapsed ? 'text-center' : ''}`}
        >
          {!isCollapsed ? 'Trabajos' : <FaClipboard size={24} />}
        </Link>
      </div>

      {/* Botón de Cerrar Sesión */}
      <div>
        <button
          onClick={handleLogout}
          className={`p-2 rounded flex items-center justify-center bg-red-600 hover:bg-red-500 w-full ${
            isCollapsed ? 'text-center' : ''
          }`}
        >
          {isCollapsed ? <FaSignOutAlt size={24} /> : 'Cerrar Sesión'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
