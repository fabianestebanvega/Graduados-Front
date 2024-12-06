// src/components/Modal.jsx
import React from 'react';
import '../../style/Modal.css'; // Estilo para el modal

const Modal = ({ isOpen, onClose, job }) => {
  if (!isOpen) return null; // No renderizar el modal si no está abierto

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{job.title}</h2>
        <p><strong>Descripción:</strong> {job.description}</p>
        <p><strong>Empresa:</strong> {job.company}</p>
        <p><strong>Ubicación:</strong> {job.location}</p>
        <p><strong>Publicado por:</strong> {job.publisherName}</p>
        <img src={job.publisherPhoto} alt={job.publisherName} className="modal-photo" />
      </div>
    </div>
  );
};

export default Modal;
