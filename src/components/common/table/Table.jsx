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
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            {fields.map((item, index) => (
              <th key={index} style={{ textTransform: "capitalize" }}>
                {item == "_id" ? "Id" : item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {fields.map((field, fieldIndex) => {
                if (field !== "action" && field != "active") {
                  return <td key={fieldIndex}>{rowData[field]}</td>;
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

                {!editModalButton && (
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
          {/* {data.map((data) => (
            <tr key={data._id}>
              <td>{data._id}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.domain}</td>
              <td>{data.designation}</td>
              <td>
                <button className="btn btn-sm btn-danger">
                  <i className="bi bi-trash-fill"></i>
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  style={{ marginLeft: "10px" }}
                >
                  <i className="bi bi-journal"></i>
                </button>
              </td>
            </tr>
          ))} */}
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
