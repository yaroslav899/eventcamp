import React, { PureComponent } from 'react';

export default class Modal extends PureComponent {
  closeModal = (event) => {
    event.preventDefault();
    this.props.toggleModal();
  }

  render() {
    const { title, body, footer } = this.props;
    return(
      <div className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
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
    )
  }
}
