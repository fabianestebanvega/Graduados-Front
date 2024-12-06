import React, { useState, useEffect } from "react";

import graduados from "../../graduados.json"; // Importa tu JSON

const PerfilGraduado = () => {
  const [agrupaciones, setAgrupaciones] = useState([
    { titulo: "Cursos", secciones: [] },
    { titulo: "Experiencias", secciones: [] },
  ]);
  const [mostrarModalAgrupacion, setMostrarModalAgrupacion] = useState(false);
  const [mostrarModalSeccion, setMostrarModalSeccion] = useState(false);
  const [nuevaAgrupacion, setNuevaAgrupacion] = useState("");
  const [agrupacionSeleccionada, setAgrupacionSeleccionada] = useState(null);
  const [tituloSeccion, setTituloSeccion] = useState("");
  const [contenidoSeccion, setContenidoSeccion] = useState("");
  const [menuOpciones, setMenuOpciones] = useState({});
  const [modoEdicion, setModoEdicion] = useState(false); // Indica si estamos editando
  const [itemEditando, setItemEditando] = useState(null); // Información del elemento que se edita
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [usuario, setUsuario] = useState(null); // Usuario actual
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [esEmpresario, setEsEmpresario] = useState(false);

useEffect(() => {
  try {
    const storedUser = localStorage.getItem("loggedInUser"); // Obtener datos del localStorage
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // Convertir JSON a objeto
      setUsuario(parsedUser); // Guardar en el estado
    } else {
      console.error("No se encontró información de usuario en localStorage.");
    }
  } catch (error) {
    console.error("Error al procesar los datos del localStorage:", error);
  }
}, []);


const storedUser = localStorage.getItem("loggedInUser");
if (!storedUser) {
  console.warn("El usuario no está logueado.");
  return; // No hacer nada si no hay usuario
}

const abrirModalEdicion = () => {
  if (usuario) {
    setNombre(usuario.nombre || "");
    setCorreo(usuario.correo || "");
    setDireccion(usuario.direccion || "");
    setEsEmpresario(usuario.esEmpresario || false);
    setMostrarModalEdicion(true); // Mostrar el modal
  }
};

const guardarEdicion = () => {
  if (usuario) {
    const updatedUser = {
      ...usuario,
      nombre,
      correo,
      direccion,
      esEmpresario,
    };

    // Actualizar estado y localStorage
    setUsuario(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    setMostrarModalEdicion(false); // Cerrar modal
  }
};

if (!usuario) {
  return <p>Cargando información del usuario...</p>;
} 


  // Crear nueva agrupación
  const agregarAgrupacion = () => {
    if (modoEdicion && itemEditando?.tipo === "agrupacion") {
      const nuevasAgrupaciones = [...agrupaciones];
      nuevasAgrupaciones[itemEditando.index].titulo = nuevaAgrupacion; // Actualizar título
      setAgrupaciones(nuevasAgrupaciones);
    } else if (nuevaAgrupacion.trim()) {
      setAgrupaciones([
        ...agrupaciones,
        { titulo: nuevaAgrupacion, secciones: [] },
      ]);
    }
    setNuevaAgrupacion("");
    setModoEdicion(false);
    setItemEditando(null);
    setMostrarModalAgrupacion(false);
  };
  

  // Agregar sección
  const agregarSeccion = () => {
    if (modoEdicion && itemEditando?.tipo === "seccion") {
      const nuevasAgrupaciones = agrupaciones.map((agrupacion, index) => {
        if (index === itemEditando.agrupacionIndex) {
          const nuevasSecciones = [...agrupacion.secciones];
          nuevasSecciones[itemEditando.seccionIndex] = {
            titulo: tituloSeccion,
            contenido: contenidoSeccion,
          };
          return { ...agrupacion, secciones: nuevasSecciones };
        }
        return agrupacion;
      });
      setAgrupaciones(nuevasAgrupaciones);
    } else if (tituloSeccion.trim() && contenidoSeccion.trim()) {
      const nuevasAgrupaciones = agrupaciones.map((agrupacion, index) => {
        if (index === agrupacionSeleccionada) {
          return {
            ...agrupacion,
            secciones: [
              ...agrupacion.secciones,
              { titulo: tituloSeccion, contenido: contenidoSeccion },
            ],
          };
        }
        return agrupacion;
      });
      setAgrupaciones(nuevasAgrupaciones);
    }
    setTituloSeccion("");
    setContenidoSeccion("");
    setModoEdicion(false);
    setItemEditando(null);
    setMostrarModalSeccion(false);
  };
  

  // Eliminar agrupación
  const eliminarAgrupacion = (index) => {
    if (
      agrupaciones[index].titulo === "Cursos" ||
      agrupaciones[index].titulo === "Experiencias"
    ) {
      return; // No permitir eliminar "Cursos" y "Experiencias"
    }
    setAgrupaciones(agrupaciones.filter((_, i) => i !== index));
  };

  // Editar agrupación
  const editarAgrupacion = (index) => {
    if (agrupaciones[index].titulo === "Cursos" || agrupaciones[index].titulo === "Experiencias") {
      return; // No permitir editar "Cursos" y "Experiencias"
    }
    setItemEditando({ tipo: "agrupacion", index, titulo: agrupaciones[index].titulo });
    setNuevaAgrupacion(agrupaciones[index].titulo); // Cargar título en el input del modal
    setModoEdicion(true); // Cambiar al modo edición
    setMostrarModalAgrupacion(true); // Mostrar el modal
  };
  

  // Eliminar sección
  const eliminarSeccion = (agrupacionIndex, seccionIndex) => {
    const nuevasAgrupaciones = agrupaciones.map((agrupacion, index) => {
      if (index === agrupacionIndex) {
        return {
          ...agrupacion,
          secciones: agrupacion.secciones.filter(
            (_, idx) => idx !== seccionIndex
          ),
        };
      }
      return agrupacion;
    });
    setAgrupaciones(nuevasAgrupaciones);
  };

  // Editar sección
  const editarSeccion = (agrupacionIndex, seccionIndex) => {
    const seccion = agrupaciones[agrupacionIndex].secciones[seccionIndex];
    setItemEditando({ tipo: "seccion", agrupacionIndex, seccionIndex, ...seccion });
    setTituloSeccion(seccion.titulo); // Cargar título en el input del modal
    setContenidoSeccion(seccion.contenido); // Cargar contenido en el input del modal
    setModoEdicion(true); // Cambiar al modo edición
    setMostrarModalSeccion(true); // Mostrar el modal
  };
  

  // Toggle del menú de opciones
  const toggleMenuOpciones = (index) => {
    setMenuOpciones((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-6">
      {/* Contenedor principal */}
      
 <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6">

 {usuario ? (
  <div className="bg-white rounded-lg shadow-lg p-6 mb-6 flex items-center space-x-6">
    <div className="flex-shrink-0">
      <img
        src={usuario.foto} // Imagen predeterminada
        alt="Foto del graduado"
        className="w-30 h-36 mx-auto mb-4 border border-gray-300 rounded-md"
      />
    </div>
    <div className="flex-1">
    <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {usuario.nombre}
            </h1>
            <p className="text-mg text-gray-600 mb-1">{usuario.correo}</p>
            <p className="text-mg text-gray-600 mb-1">{usuario.direccion}</p>
            <p className="text-mg text-gray-600 mb-4">
              {usuario.esEmpresario ? "Empresario" : "No es Empresario"}
            </p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={abrirModalEdicion}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
          Editar Información
        </button>
      </div>
    </div>
  </div>
) : (
  <p>Cargando información del usuario...</p>
)}
        {/* Botones */}
        <div className="text-right mb-6">
          <button
            onClick={() => setMostrarModalAgrupacion(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mr-4 text-sm"
          >
            Nueva Agrupación
          </button>
          <button
            onClick={() => setMostrarModalSeccion(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Agregar Sección
          </button>
        </div>

        {/* Mostrar Agrupaciones */}
        <div className="space-y-8">
          {agrupaciones.map((agrupacion, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-100 shadow-sm"
            >
              
              
              <div className="flex justify-between items-center">
  <h2 className="text-lg font-bold mb-2">{agrupacion.titulo}</h2>
  <div className="relative">
    <button
      onClick={() => toggleMenuOpciones(`agrupacion-${index}`)}
      className="text-gray-500 hover:text-gray-700"
    >
      Opciones
    </button>
    {menuOpciones[`agrupacion-${index}`] && (
      <div className="absolute right-0 bg-white shadow-lg rounded p-2 z-10">
        {agrupacion.titulo !== "Cursos" && agrupacion.titulo !== "Experiencias" ? (
          <>
            <button
              onClick={() => editarAgrupacion(index, "Nuevo Título")}
              className="block px-4 py-2 text-sm text-blue-500 hover:bg-gray-100"
            >
              Editar
            </button>
            <button
              onClick={() => eliminarAgrupacion(index)}
              className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
            >
              Eliminar
            </button>
          </>
        ) : (
          <p className="text-sm text-gray-400 px-4 py-2">No editable</p>
        )}
      </div>
    )}
  </div>
</div>

              {/* Mostrar Secciones */}
              {agrupacion.secciones.length > 0 ? (
                <div className="space-y-4">
                  {agrupacion.secciones.map((seccion, idx) => (
                    <div
                      key={idx}
                      className="border rounded-lg p-4 bg-white shadow text-sm"
                    >
                      <div className="flex justify-between items-center">
  <div>
    <h3 className="font-bold">{seccion.titulo}</h3>
    <p>{seccion.contenido}</p>
  </div>
  <div className="relative">
    <button
      onClick={() => toggleMenuOpciones(`seccion-${index}-${idx}`)}
      className="text-gray-500 hover:text-gray-700"
    >
      Opciones
    </button>
    {menuOpciones[`seccion-${index}-${idx}`] && (
      <div className="absolute right-0 bg-white shadow-lg rounded p-2 z-10">
        <button
          onClick={() => editarSeccion(index, idx, "Nuevo Título", "Nuevo Contenido")}
          className="block px-4 py-2 text-sm text-blue-500 hover:bg-gray-100"
        >
          Editar
        </button>
        <button
          onClick={() => eliminarSeccion(index, idx)}
          className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
        >
          Eliminar
        </button>
      </div>
    )}
  </div>
</div>

                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No hay secciones en esta agrupación.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal Nueva Agrupación */}
      {mostrarModalAgrupacion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-left">
            <h2 className="text-xl font-bold mb-4">
              {modoEdicion ? "Editar Agrupación" : "Nueva Agrupación"}
            </h2>

            <input
              type="text"
              placeholder="Título de la Agrupación"
              value={nuevaAgrupacion}
              onChange={(e) => setNuevaAgrupacion(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setMostrarModalAgrupacion(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={agregarAgrupacion}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal para editar información del graduado */}
{mostrarModalEdicion && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white rounded-lg p-6 w-full max-w-md text-left">
      <h2 className="text-xl font-bold mb-4">Editar Información</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
      <input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={esEmpresario}
          onChange={() => setEsEmpresario(!esEmpresario)}
          className="mr-2"
        />
        <label className="text-sm text-gray-600">Es Empresario</label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setMostrarModalEdicion(false)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
        >
          Cancelar
        </button>
        <button
          onClick={guardarEdicion}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
)}


      {/* Modal Nueva Sección */}
      {mostrarModalSeccion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-left">
            <h2 className="text-xl font-bold mb-4">
             {modoEdicion ? "Editar Sección" : "Nueva Sección"}
            </h2>

            <select
              value={agrupacionSeleccionada || ""}
              onChange={(e) => setAgrupacionSeleccionada(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">Selecciona una Agrupación</option>
              {agrupaciones.map((agrupacion, index) => (
                <option key={index} value={index}>
                  {agrupacion.titulo}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Título de la Sección"
              value={tituloSeccion}
              onChange={(e) => setTituloSeccion(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <textarea
              placeholder="Contenido"
              value={contenidoSeccion}
              onChange={(e) => setContenidoSeccion(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              rows="4"
            ></textarea>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setMostrarModalSeccion(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={agregarSeccion}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilGraduado;
