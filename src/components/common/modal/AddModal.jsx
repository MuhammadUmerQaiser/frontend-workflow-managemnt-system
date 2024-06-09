import React from "react";
import AuthButton from "../Button/AuthButton";

const AddModal = ({ modalId, createItem, loading, heading = 'Create', children }) => {
  return (
    <>
      <div className="modal fade" id={modalId} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{heading}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="addModalCloseButton"
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <AuthButton
                label={heading}
                onClick={createItem}
                loading={loading}
                className="btn btn-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddModal;
