// src/pages/Works.jsx

import React, { useState } from 'react';

const Works = () => {
  // Estado para manejar los posts y los datos del nuevo post
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', description: '' });

  // Maneja el cambio en los campos del formulario de nuevo post
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  // Maneja la creación de un nuevo post
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.description) {
      setPosts([
        ...posts,
        { id: Date.now(), title: newPost.title, description: newPost.description, likes: 0, dislikes: 0 }
      ]);
      setNewPost({ title: '', description: '' }); // Limpia el formulario
    }
  };

  // Maneja el "like" de un post
  const handleLike = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // Maneja el "dislike" de un post
  const handleDislike = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, dislikes: post.dislikes + 1 } : post
      )
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Sección de Trabajos</h1>

      {/* Formulario para crear un nuevo post */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Crear un Nuevo Post</h2>
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
            <div key={post.id} className="bg-white p-4 shadow-md rounded-lg mb-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-700 mt-2">{post.description}</p>
              <div className="flex items-center mt-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded-lg mr-2"
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
            </div>
          ))
        ) : (
          <p className="text-gray-700">Aún no hay posts. ¡Crea el primero!</p>
        )}
      </div>
    </div>
  );
};

export default Works;
