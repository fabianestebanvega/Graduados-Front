// src/components/Sidebar.jsx

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaHome, FaUser, FaClipboard } from 'react-icons/fa';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();

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
    </div>
  );
};

export default Sidebar;
