import React from "react";
import AuthButton from "../Button/AuthButton";

const ListModal = ({ listModalId, onRequestClose, children }) => {
  return (
    <>
      <div className="modal fade" id={listModalId} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">List</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="listModalCloseButton"
                onClick={onRequestClose}
              ></button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListModal;
