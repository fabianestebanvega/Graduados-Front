import React from "react";

const ModalEdicion = ({ isOpen, onClose, formData, onChange, onSave }) => {
  if (!isOpen) return null; // No mostrar si el modal está cerrado

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Editar Información</h2>
        <form>
          {/* Nombre */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={onChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Ingresa tu nombre"
            />
          </div>
          {/* Foto */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">URL de la Foto</label>
            <input
              type="text"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={onChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Ingresa la URL de tu foto"
            />
          </div>
          {/* Empresario */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="isEmpresario"
              checked={formData.empresario}
              onChange={(e) =>
                onChange({
                  target: {
                    name: "empresario",
                    type: "checkbox",
                    checked: e.target.checked,
                  },
                })
              }
              className="mr-2"
            />
            <label className="text-gray-700 font-bold">¿Eres Empresario?</label>
          </div>
          {/* Residencia */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Residencia</label>
            <input
              type="text"
              name="residencia"
              value={formData.residencia}
              onChange={onChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Ingresa tu lugar de residencia"
            />
          </div>
        </form>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdicion;
