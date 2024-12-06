// src/pages/Works.jsx
import React, { useEffect, useState } from 'react';
import Modal from '../components//Trabajo/ModalDetail';
import '../style/Work.css';

const Works = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // Trabajo seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal

  useEffect(() => {
    // Cargar JSON local
    import('../graduados.json')
      .then((data) => {
        const postsWithPublishers = data.default.flatMap((user) =>
          user.postTrabajo.map((post) => ({
            ...post,
            publisherName: user.nombre,
            publisherPhoto: user.foto,
          }))
        );
        setJobPosts(postsWithPublishers);
      })
      .catch((error) => console.error('Error al cargar el archivo JSON:', error));
  }, []);

  const handleViewDetails = (job) => {
    setSelectedJob(job); // Guardar el trabajo seleccionado
    setIsModalOpen(true); // Abrir el modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cerrar el modal
    setSelectedJob(null); // Limpiar el trabajo seleccionado
  };

  return (
    <div>
      <h1>Ofertas de Trabajo</h1>
      <div className="job-list">
        {jobPosts.map((job) => (
          <div className="job-card" key={job.id}>
            <div className="job-header">
              <img src={job.publisherPhoto} alt={job.publisherName} className="publisher-photo" />
              <p className="publisher-name">{job.publisherName}</p>
            </div>
            <h2>{job.title}</h2>
            <p><strong>Descripción:</strong> {job.description}</p>
            <button className="details-button" onClick={() => handleViewDetails(job)}>
              Ver más detalles
            </button>
          </div>
        ))}
      </div>

      {/* Modal reutilizable */}
      <Modal isOpen={isModalOpen} onClose={closeModal} job={selectedJob} />
    </div>
  );
};

export default Works;
