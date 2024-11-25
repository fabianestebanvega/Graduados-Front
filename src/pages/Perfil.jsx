// src/pages/Perfil.jsx

import React, { useState } from 'react';

const Perfil = () => {
  // Estado inicial de los datos del usuario
  const [userData, setUserData] = useState({
    foto: 'https://via.placeholder.com/150', // URL de ejemplo para la foto de perfil
    codigo: '1152003',
    tipoDocumento: 'TI',
    documento: '1192729017',
    primerNombre: 'FABIAN',
    segundoNombre: 'ESTEBAN',
    primerApellido: 'VEGA',
    segundoApellido: 'GAFARO',
    celular: '3143092541',
    telefono: '3152427291',
    direccion: 'Calle 3-a #18-71 Siglo XXI',
    correoElectronico: 'fabianvega1702@gmail.com',
    correoInstitucional: 'fabianestebanvega@ufps.edu.co',
    trabaja: true,
  });

  // Estado para el manejo de edición y cursos
  const [isEditing, setIsEditing] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [nuevoCurso, setNuevoCurso] = useState('');

  // Maneja los cambios en los campos de usuario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Guarda los cambios en el perfil
  const handleSave = () => {
    setIsEditing(false);
  };

  // Agregar un nuevo curso a la lista de cursos
  const handleAddCurso = () => {
    if (nuevoCurso.trim()) {
      setCursos([...cursos, nuevoCurso]);
      setNuevoCurso('');
    }
  };

  // Eliminar un curso de la lista
  const handleDeleteCurso = (index) => {
    setCursos(cursos.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex">
          {/* Sección de la foto de perfil */}
          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 w-1/4">
            <img
              src={userData.foto}
              alt="Foto de perfil"
              className="w-32 h-32 rounded-full object-cover border"
            />
            <h2 className="mt-4 text-xl font-semibold text-gray-700">Datos Personales</h2>
            {isEditing && (
              <input
                type="text"
                name="foto"
                value={userData.foto}
                onChange={handleChange}
                placeholder="URL de la foto"
                className="px-4 py-2 mt-4 border rounded-lg w-full"
              />
            )}
          </div>

          {/* Sección de los datos personales */}
          <div className="p-6 w-3/4">
            <table className="w-full">
              <tbody>
                {/* Fila de Código */}
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-semibold w-1/3">Código</td>
                  <td className="px-4 py-2 text-gray-800">
                    {isEditing ? (
                      <input
                        type="text"
                        name="codigo"
                        value={userData.codigo}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    ) : (
                      userData.codigo
                    )}
                  </td>
                </tr>

                {/* Fila de Tipo de Documento */}
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-semibold w-1/3">Tipo de Documento</td>
                  <td className="px-4 py-2 text-gray-800">
                    {isEditing ? (
                      <input
                        type="text"
                        name="tipoDocumento"
                        value={userData.tipoDocumento}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    ) : (
                      userData.tipoDocumento
                    )}
                  </td>
                </tr>

                {/* Fila de Documento */}
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-semibold w-1/3">Documento</td>
                  <td className="px-4 py-2 text-gray-800">
                    {isEditing ? (
                      <input
                        type="text"
                        name="documento"
                        value={userData.documento}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    ) : (
                      userData.documento
                    )}
                  </td>
                </tr>

                {/* Fila de Primer Nombre */}
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-semibold w-1/3">Primer Nombre</td>
                  <td className="px-4 py-2 text-gray-800">
                    {isEditing ? (
                      <input
                        type="text"
                        name="primerNombre"
                        value={userData.primerNombre}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    ) : (
                      userData.primerNombre
                    )}
                  </td>
                </tr>

                {/* Fila de Celular */}
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-semibold w-1/3">Celular</td>
                  <td className="px-4 py-2 text-gray-800">
                    {isEditing ? (
                      <input
                        type="text"
                        name="celular"
                        value={userData.celular}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    ) : (
                      userData.celular
                    )}
                  </td>
                </tr>

                {/* Fila de Teléfono */}
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-semibold w-1/3">Teléfono</td>
                  <td className="px-4 py-2 text-gray-800">
                    {isEditing ? (
                      <input
                        type="text"
                        name="telefono"
                        value={userData.telefono}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    ) : (
                      userData.telefono
                    )}
                  </td>
                </tr>

                {/* Fila de Dirección */}
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-semibold w-1/3">Dirección</td>
                  <td className="px-4 py-2 text-gray-800">
                    {isEditing ? (
                      <input
                        type="text"
                        name="direccion"
                        value={userData.direccion}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    ) : (
                      userData.direccion
                    )}
                  </td>
                </tr>

                {/* Fila de Correo Electrónico */}
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-semibold w-1/3">Correo Electrónico</td>
                  <td className="px-4 py-2 text-gray-800">
                    {isEditing ? (
                      <input
                        type="email"
                        name="correoElectronico"
                        value={userData.correoElectronico}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    ) : (
                      userData.correoElectronico
                    )}
                  </td>
                </tr>

                {/* Fila de ¿Trabaja actualmente? */}
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-semibold w-1/3">¿Trabaja actualmente?</td>
                  <td className="px-4 py-2 text-gray-800">
                    {isEditing ? (
                      <input
                        type="checkbox"
                        name="trabaja"
                        checked={userData.trabaja}
                        onChange={handleChange}
                      />
                    ) : (
                      userData.trabaja ? 'Sí' : 'No'
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Botones de edición */}
            <div className="mt-6 flex">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 rounded-lg"
                >
                  Guardar cambios
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 rounded-lg"
                >
                  Editar perfil
                </button>
              )}
            </div>

            {/* Sección de Cursos Realizados */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Cursos Realizados</h2>
              <div className="flex mb-4">
                <input
                  type="text"
                  value={nuevoCurso}
                  onChange={(e) => setNuevoCurso(e.target.value)}
                  placeholder="Nombre del curso"
                  className="w-full px-4 py-2 border rounded-lg mr-2"
                />
                <button
                  onClick={handleAddCurso}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Agregar
                </button>
              </div>

              <ul className="list-disc pl-6">
                {cursos.map((curso, index) => (
                  <li key={index} className="flex items-center justify-between mb-2">
                    <span>{curso}</span>
                    <button
                      onClick={() => handleDeleteCurso(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
