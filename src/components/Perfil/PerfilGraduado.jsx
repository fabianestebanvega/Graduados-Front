import React, { useState, useEffect } from "react";
import { FaIdCard, FaEnvelope, FaMapMarkerAlt, FaUserTie, FaEdit } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import ModalEdicion from "./ModalEdicion";

const PerfilGraduado = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    photoUrl: "",
    residencia: "",
    empresario: false,
  });

  useEffect(() => {
    const fetchPerfil = async () => {
      const userId = localStorage.getItem("loggedUserId");

      if (!userId) {
        console.error("Usuario no logueado.");
        return;
      }

      try {
        const response = await fetch(
          `https://lucky-respect-production.up.railway.app/api/users/${userId}/profile`
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const data = await response.json();
        setUsuario(data);
        console.log(data.empresario+ "--------")
        setFormData({
          nombre: data.nombre || "",
          photoUrl: data.photoUrl || "",
          empresario: !!data.empresario || false,
          residencia: data.residencia || "",
        });
      } catch (err) {
        console.error("Error al cargar el perfil:", err);
        setError("Error al cargar el perfil. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    const userId = localStorage.getItem("loggedUserId");
  
    try {
      // Realiza la solicitud PUT para guardar los datos
      const response = await fetch(
        `https://lucky-respect-production.up.railway.app/api/users/${userId}/update`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
  
      const result = await response.json();
  
      if (result !== 1) {
        throw new Error("Error al actualizar los datos del usuario");
      }
  
      // Si la actualización es exitosa, recarga los datos del perfil
      const updatedResponse = await fetch(
        `https://lucky-respect-production.up.railway.app/api/users/${userId}/profile`
      );
  
      if (!updatedResponse.ok) {
        throw new Error("Error al obtener los datos actualizados del usuario");
      }
  
      const updatedData = await updatedResponse.json();
  
      // Actualiza el estado con los datos actualizados
      console.log(updatedData.empresario+ " estado del updateData")
      setUsuario(updatedData);
      setFormData({
        nombre: updatedData.nombre || "",
        photoUrl: updatedData.photoUrl || "",
        empresario: !!updatedData.empresario || false,
        residencia: updatedData.residencia || "",
      });
  
      setShowModal(false);
      setSuccessMessage("Datos actualizados correctamente.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error al guardar los cambios:", err);
      setErrorMessage("Error al guardar los cambios. Intenta nuevamente.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };
  
  

  if (loading) {
    return <p>Cargando información del usuario...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-6">
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow">
          {errorMessage}
        </div>
      )}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6">
        {/* Foto y Nombre del Usuario */}
        <div className="flex items-center mb-6">
          <img
            src={usuario.photoUrl || "https://via.placeholder.com/150"}
            alt="Foto del usuario"
            className="w-24 h-24 object-cover rounded-full border mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{usuario.nombre}</h1>
            <p className="text-gray-600">{usuario.empresario ? "Empresario" : "Usuario Regular"}</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="ml-auto bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 flex items-center justify-center"
          >
            <FaEdit size={20} />
          </button>
        </div>

        {/* Información Personal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Cédula */}
          <div className="flex items-center bg-gray-100 p-4 rounded shadow">
            <FaIdCard className="text-blue-600 text-xl mr-4" />
            <div>
              <p className="text-gray-800 font-bold">{usuario.cedula || "No especificado"}</p>
              <p className="text-gray-500 text-sm">Cédula</p>
            </div>
          </div>
          {/* Correo Electrónico */}
          <div className="flex items-center bg-gray-100 p-4 rounded shadow">
            <FaEnvelope className="text-green-600 text-xl mr-4" />
            <div>
              <p className="text-gray-800 font-bold">{usuario.username || "No especificado"}</p>
              <p className="text-gray-500 text-sm">Correo Electrónico</p>
            </div>
          </div>
          {/* Residencia */}
          <div className="flex items-center bg-gray-100 p-4 rounded shadow">
            <FaMapMarkerAlt className="text-red-600 text-xl mr-4" />
            <div>
              <p className="text-gray-800 font-bold">{usuario.residencia || "No especificada"}</p>
              <p className="text-gray-500 text-sm">Residencia</p>
            </div>
          </div>
          {/* Código del Programa */}
          <div className="flex items-center bg-gray-100 p-4 rounded shadow">
            <IoSchoolSharp className="text-purple-600 text-xl mr-4" />
            <div>
              <p className="text-gray-800 font-bold">{usuario.codigoPrograma || "No especificado"}</p>
              <p className="text-gray-500 text-sm">Código del Programa</p>
            </div>
          </div>
          {/* Empresario */}
          <div className="flex items-center bg-gray-100 p-4 rounded shadow">
            <FaUserTie className="text-purple-600 text-xl mr-4" />
            <div>
              <p className="text-gray-800 font-bold">{usuario.empresario ? "Sí" : "No"}</p>
              <p className="text-gray-500 text-sm">Empresario</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Edición */}
      <ModalEdicion
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        formData={formData}
        onChange={handleInputChange}
        onSave={handleSave}
      />
    </div>
  );
};

export default PerfilGraduado;
