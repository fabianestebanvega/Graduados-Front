// src/components/Register.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    codigo: '',
    tipoDocumento: 'TI', // Valor inicial
    documento: '',
    primerNombre: '',
    celular: '',
    telefono: '',
    direccion: '',
    correoElectronico: '',
    trabajaActualmente: false,
  });

  const navigate = useNavigate();

  // Maneja el cambio en los campos de entrada
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del registro:', formData);
    // Aquí puedes enviar los datos al backend o realizar otras acciones
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Formulario de Registro</h2>

        <form onSubmit={handleSubmit}>
          {/* Campo Código */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Código</label>
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ingresa tu código"
              required
            />
          </div>

          {/* Campo Tipo de Documento */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Tipo de Documento</label>
            <select
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="TI">Tarjeta de Identidad (TI)</option>
              <option value="CC">Cédula de Ciudadanía (CC)</option>
              <option value="CE">Cédula de Extranjería (CE)</option>
            </select>
          </div>

          {/* Campo Documento */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Documento</label>
            <input
              type="text"
              name="documento"
              value={formData.documento}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ingresa tu documento"
              required
            />
          </div>

          {/* Campo Primer Nombre */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Primer Nombre</label>
            <input
              type="text"
              name="primerNombre"
              value={formData.primerNombre}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ingresa tu primer nombre"
              required
            />
          </div>

          {/* Campo Celular */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Celular</label>
            <input
              type="text"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ingresa tu número de celular"
              required
            />
          </div>

          {/* Campo Teléfono */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ingresa tu número de teléfono"
            />
          </div>

          {/* Campo Dirección */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ingresa tu dirección"
              required
            />
          </div>

          {/* Campo Correo Electrónico */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Correo Electrónico</label>
            <input
              type="email"
              name="correoElectronico"
              value={formData.correoElectronico}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>

          {/* Checkbox Trabaja Actualmente */}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="trabajaActualmente"
                checked={formData.trabajaActualmente}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700 font-bold">¿Trabaja actualmente?</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 rounded-lg"
          >
            Registrar
          </button>
        </form>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => navigate('/')} // Redirige al login
            className="text-sm text-red-800 hover:underline"
          >
            Atras
          </button>
 
        </div>
      </div>
    </div>
  );
};

export default Register;
