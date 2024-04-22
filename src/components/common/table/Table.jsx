import React, { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import { Link } from "react-router-dom";

const Table = ({
  fields,
  data,
  currentPage,
  itemsPerPage,
  totalPages,
  handlePageChange,
  deleteData = null,
  detailLink = "/",
  editLink,
  showViewButton = true,
  editModalButton = false,
  deleteModalButton = true,
  editModalButtonId = "",
  handleRowDataOnEditClick = null,
  editButtonLink = true
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            {fields.map((item, index) => (
              <th key={index} style={{ textTransform: "capitalize" }}>
                {item == "_id" ? "Id" : item.replace(/[-_]/g, " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {fields.map((field, fieldIndex) => {
                if (field !== "action" && field != "active") {
                  if (field.includes("-")) {
                    const [fieldName, subFieldName] = field.split("-");
                    if (
                      fieldName &&
                      subFieldName &&
                      rowData[fieldName] &&
                      rowData[fieldName][subFieldName]
                    ) {
                      return (
                        <td key={fieldIndex}>
                          {rowData[fieldName][subFieldName]}
                        </td>
                      );
                    }
                  } else {
                    return <td key={fieldIndex}>{rowData[field]}</td>;
                  }
                } else if (field !== "action" && field == "active") {
                  return (
                    <td key={fieldIndex}>
                      <span
                        className={`badge bg-${
                          rowData["isActive"] ? "success" : "danger"
                        }`}
                      >
                        {rowData["isActive"] ? "Active" : "Inactive"}
                      </span>
                    </td>
                  );
                }
                return null;
              })}
              <td>
                {deleteModalButton && (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteData(rowData["_id"])}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                )}
                {editModalButton && (
                  <button
                    className="btn btn-sm btn-primary"
                    style={{ marginLeft: "10px" }}
                    data-bs-toggle="modal"
                    data-bs-target={`#${editModalButtonId}`}
                    onClick={() => handleRowDataOnEditClick(rowData)}
                  >
                    <i className="bi bi-journal"></i>
                  </button>
                )}

                {!editModalButton && editButtonLink && (
                  <Link
                    to={`${editLink}/${rowData["_id"]}`}
                    className="btn btn-sm btn-primary"
                    style={{ marginLeft: "10px" }}
                  >
                    <i className="bi bi-journal"></i>
                  </Link>
                )}

                {showViewButton && (
                  <Link
                    to={`${detailLink}/${rowData["_id"]}`}
                    className="btn btn-sm btn-success"
                    style={{ marginLeft: "10px" }}
                  >
                    <i className="bi bi-eye-fill"></i>
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex align-items-center justify-content-center">
        {/* <Pagination /> */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Table;
