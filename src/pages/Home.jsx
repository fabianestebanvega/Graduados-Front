// src/pages/Home.jsx

import React, { useState } from 'react';

const Home = () => {
  // Estado para manejar los posts y los datos del nuevo post
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', description: '', image: null });
  const [preview, setPreview] = useState(null); // Para previsualizar la imagen antes de subirla

  // Maneja el cambio en los campos del formulario de nuevo post
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  // Maneja la selección de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost((prevPost) => ({ ...prevPost, image: file }));
      setPreview(URL.createObjectURL(file)); // Previsualización de la imagen
    }
  };

  // Maneja la creación de un nuevo post
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.description && newPost.image) {
      setPosts([
        ...posts,
        {
          id: Date.now(),
          title: newPost.title,
          description: newPost.description,
          image: newPost.image,
          likes: 0,
          dislikes: 0,
          comments: [],
        },
      ]);
      setNewPost({ title: '', description: '', image: null });
      setPreview(null); // Resetea la previsualización
    }
  };

  // Maneja el "like" de un post
  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // Maneja el "dislike" de un post
  const handleDislike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
      )
    );
  };

  // Maneja el envío de un comentario en un post
  const handleAddComment = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
      )
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Sección de Inicio</h1>

      {/* Formulario para crear un nuevo post */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Crear un Nuevo Post con Imagen</h2>
        <form onSubmit={handleCreatePost} className="bg-white p-4 shadow-md rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Título</label>
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Título del post"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Descripción</label>
            <textarea
              name="description"
              value={newPost.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Descripción del post"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          {/* Previsualización de la imagen */}
          {preview && (
            <div className="mb-4">
              <img src={preview} alt="Previsualización" className="max-h-64 mx-auto" />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 rounded-lg"
          >
            Crear Post
          </button>
        </form>
      </div>

      {/* Lista de posts */}
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="bg-white p-4 shadow-md rounded-lg mb-6">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-700 mt-2">{post.description}</p>
              {post.image && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(post.image)}
                    alt="Imagen del post"
                    className="max-h-64 mx-auto"
                  />
                </div>
              )}
              <div className="flex items-center mt-4 space-x-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded-lg"
                >
                  👍 {post.likes}
                </button>
                <button
                  onClick={() => handleDislike(post.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded-lg"
                >
                  👎 {post.dislikes}
                </button>
              </div>

              {/* Sección de comentarios */}
              <div className="mt-4">
                <h4 className="font-semibold text-lg">Comentarios</h4>
                {post.comments.length > 0 ? (
                  <ul className="mt-2 space-y-2">
                    {post.comments.map((comment, index) => (
                      <li key={index} className="bg-gray-100 p-2 rounded">
                        {comment}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No hay comentarios.</p>
                )}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const commentText = e.target.elements[`comment-${post.id}`].value;
                    if (commentText) {
                      handleAddComment(post.id, commentText);
                      e.target.reset();
                    }
                  }}
                  className="mt-4"
                >
                  <input
                    type="text"
                    name={`comment-${post.id}`}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Escribe un comentario..."
                  />
                  <button
                    type="submit"
                    className="bg-red-700 hover:bg-red-800 text-white font-bold py-1 px-4 rounded-lg"
                  >
                    Comentar
                  </button>
                </form>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700">Aún no hay posts. ¡Crea el primero!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
