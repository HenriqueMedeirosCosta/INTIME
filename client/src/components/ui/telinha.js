import React from 'react';
import './telinha.css';
import { BsCheckCircleFill } from 'react-icons/bs';

const Telinha = ({ titulo, mensagem, aoConfirmar }) => {
  return (
    <>
      <div className="notificacao-backdrop"></div>

      <div className="modal d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-danger shadow-lg">

            <div className="modal-body text-center py-5">
              <BsCheckCircleFill size={60} color="#28a745" className="mb-3" />
              
              <h4 className="mb-3 text-danger fw-bold">{titulo}</h4>
              <p className="mb-4 fs-5 text-danger">{mensagem}</p>

              <button
                type="button"
                className="btn btn-primary btn-lg px-4"
                onClick={aoConfirmar}
              >
                Ir para status →
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Telinha;
