import React from 'react';
import { createMarkupText } from '../../helper';

const Modal = (props) => {
  const {
    toggleModal,
    modalTitle,
    modalBody,
    modalFooter,
  } = props;

  const closeModal = (e) => {
    e.preventDefault();
    toggleModal();
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" dangerouslySetInnerHTML={createMarkupText(modalTitle)} />
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{modalBody}</p>
          </div>
          { modalFooter && <div className="modal-footer">
            {modalFooter}
          </div> }
        </div>
      </div>
    </div>
  );
};

export default Modal;
