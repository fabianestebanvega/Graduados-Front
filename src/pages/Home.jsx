import React, { useState, useEffect } from "react";
import data from "../graduados.json"; // Importar el archivo JSON

const Home = () => {
  const [graduados, setGraduados] = useState([]); // Todos los graduados
  const [usuario, setUsuario] = useState(null); // Usuario actual
  const [posts, setPosts] = useState([]); // Todos los posts combinados (usuario + otros)
  const [nuevoPost, setNuevoPost] = useState({ title: "", description: "" }); // Nuevo post
  const [mostrarModal, setMostrarModal] = useState(false); // Modal para crear post

  // Cargar datos del JSON y usuario del localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    let userPosts = [];

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsuario(parsedUser);

      // Agregar información del autor a los posts del usuario
      userPosts = (parsedUser.posts || []).map((post) => ({
        ...post,
        author: {
          nombre: parsedUser.nombre,
          foto: parsedUser.foto,
        },
      }));
    }

    // Agregar información del autor a los posts del JSON
    const jsonPosts = data.flatMap((user) =>
      (user.posts || []).map((post) => ({
        ...post,
        author: {
          nombre: user.nombre,
          foto: user.foto,
        },
      }))
    );

    // Combinar posts del usuario y del JSON, eliminando duplicados por `id`
    const allPosts = [...userPosts, ...jsonPosts].filter(
      (post, index, self) => index === self.findIndex((p) => p.id === post.id)
    );

    setPosts(allPosts);

    // Guardar graduados en el estado
    const storedGraduados = localStorage.getItem("graduados");
    if (storedGraduados) {
      setGraduados(JSON.parse(storedGraduados));
    } else {
      setGraduados(data);
      localStorage.setItem("graduados", JSON.stringify(data));
    }
  }, []);

  // Función para crear un nuevo post
  const crearPost = () => {
    if (nuevoPost.title.trim() && nuevoPost.description.trim()) {
      const nuevoPostCompleto = {
        id: Date.now(), // Usar timestamp como ID único
        title: nuevoPost.title,
        description: nuevoPost.description,
        image: "https://via.placeholder.com/300", // Imagen predeterminada
        likes: 0,
        dislikes: 0,
        author: {
          nombre: usuario.nombre,
          foto: usuario.foto,
        },
      };

      // Actualizar los posts del usuario actual
      const updatedUserPosts = [...(usuario?.posts || []), nuevoPostCompleto];
      const updatedUser = { ...usuario, posts: updatedUserPosts };

      // Actualizar el usuario en los graduados
      const updatedGraduados = graduados.map((grad) => {
        if (grad.correo === usuario.correo) {
          return { ...grad, posts: updatedUserPosts };
        }
        return grad;
      });

      // Guardar los datos actualizados en el estado y localStorage
      setUsuario(updatedUser);
      setGraduados(updatedGraduados);

      // Combinar todos los posts y eliminar duplicados
      const jsonPosts = data.flatMap((user) => user.posts || []);
      const allPosts = [...updatedUserPosts, ...jsonPosts].filter(
        (post, index, self) => index === self.findIndex((p) => p.id === post.id)
      );
      setPosts(allPosts);

      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      localStorage.setItem("graduados", JSON.stringify(updatedGraduados));

      // Limpiar formulario y cerrar modal
      setNuevoPost({ title: "", description: "" });
      setMostrarModal(false);
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="text-right mb-6">
        <button
          onClick={() => setMostrarModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
        >
          Crear Post
        </button>
      </div>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-left">
            <h2 className="text-xl font-bold mb-4">Crear Nuevo Post</h2>
            <input
              type="text"
              placeholder="Título"
              value={nuevoPost.title}
              onChange={(e) => setNuevoPost({ ...nuevoPost, title: e.target.value })}
              className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <textarea
              placeholder="Descripción"
              value={nuevoPost.description}
              onChange={(e) => setNuevoPost({ ...nuevoPost, description: e.target.value })}
              className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              rows="4"
            ></textarea>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={crearPost}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

<div className="max-w-4xl mx-auto space-y-6">
  <h1 className="text-3xl font-bold text-gray-800">Posts de Graduados</h1>

  <div className="space-y-6">
    {posts.length > 0 ? (
      posts.map((post, index) => {
        const autor = graduados.find((grad) => grad.posts?.some((p) => p.id === post.id));

        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col space-y-4"
          >
            {/* Información del autor */}
            <div className="flex items-center space-x-4">
              <img
                src={autor?.foto || "https://via.placeholder.com/150"}
                alt={autor?.nombre || "Autor desconocido"}
                className="w-12 h-12 rounded-full"
              />
              <h3 className="text-lg font-bold text-gray-800">{autor?.nombre || "Autor desconocido"}</h3>
            </div>

            {/* Contenido del post */}
            <h3 className="text-red-700 font-bold text-lg">{post.title}</h3>
            <p className="text-gray-700">{post.description}</p>
            <img
              src={post.image || "https://via.placeholder.com/300"}
              alt={post.title}
              className="w-full h-90 object-cover rounded-lg"
            />
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-green-600 hover:text-green-800">
                👍 <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-red-600 hover:text-red-800">
                👎 <span>{post.dislikes}</span>
              </button>
            </div>
          </div>
        );
      })
    ) : (
      <p className="text-gray-700 text-center">No hay posts disponibles en este momento.</p>
    )}
  </div>
</div>

    </div>
  );
};

export default Home;
