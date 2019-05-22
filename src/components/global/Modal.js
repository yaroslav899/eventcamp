import React from 'react';

const Modal = (props) => {
  const { title, body, footer, toggleModal } = props;

  const closeModal = (e) => {
    e.preventDefault();
    toggleModal();
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{body}</p>
          </div>
          <div className="modal-footer">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
