import React from "react";
import AuthButton from "../Button/AuthButton";

const AddModal = ({ modalId, createItem, loading, children }) => {
  return (
    <>
      <div className="modal fade" id={modalId} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create</h5>
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
                label={"Create"}
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
