import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ mensagem, onConfirmar, onCancelar }) => {
  return (
    <div className="my-modal-overlay">
      <div className="my-modal-content">
        <p>{mensagem}</p>
        <div className="my-modal-botoes">
          <button className="my-btn-sim" onClick={onConfirmar}>Sim</button>
          <button className="my-btn-nao" onClick={onCancelar}>Não</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
