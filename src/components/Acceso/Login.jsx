import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpg"; // Ruta al logo

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
  const [modalMessage, setModalMessage] = useState(""); // Mensaje en el modal

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://lucky-respect-production.up.railway.app/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const userId = await response.json();

      if (userId === -1) {
        setError("Correo o contraseña incorrectos.");
        return;
      }

      const estateResponse = await fetch(
        `https://lucky-respect-production.up.railway.app/api/users/${userId}/estate`
      );

      const estate = await estateResponse.json();

      if (estate === -1) {
        setModalMessage("Tu cuenta aún no ha sido aprobada. Por favor, espera la confirmación de un administrador.");
        setShowModal(true);
        return;
      }

      if (estate === 1) {
        localStorage.setItem("loggedUserId", userId);
        window.location.href = "/admin/dashboard";
        return;
      }

      if (estate === 200) {
        localStorage.setItem("loggedUserId", userId);
        window.location.href = "/home/perfil";
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error al iniciar sesión. Intenta de nuevo.");
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
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 rounded"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Enlaces adicionales */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => navigate("/register")}
            className="text-sm text-red-700 hover:underline"
          >
            Registrarse
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Cuenta No Aprobada</h2>
            <p className="text-gray-700 text-center mb-4">{modalMessage}</p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
