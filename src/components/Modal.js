import React from 'react';
import '../assets/styles/bootstrap.css';
import '../assets/styles/Modal.css';

const Modal = ({ showModal, title, body, handleCancel, handleConfirm }) => {
  return (
    <div className="modal-overlay" style={{ display: showModal ? 'block' : 'none' }}>
        <div id="custom-modal" className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
            </div>
            <div className="modal-body">
                <p>{body}</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleConfirm}>OK</button>
                {handleCancel != null &&<button type="button" className="btn btn-secondary" onClick={handleCancel}>Close</button>}
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Modal;
