// src/layouts/MainLayout.jsx

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Función para alternar el colapso del sidebar
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex">
      {/* Sidebar con propiedades de colapso */}
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      {/* Contenido principal con margen ajustable */}
      <div
        className={`flex-1 transition-all duration-300 p-8 bg-gray-100 min-h-screen ${
          isCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
