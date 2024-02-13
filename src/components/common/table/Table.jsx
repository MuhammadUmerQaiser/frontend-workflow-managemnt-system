import React from "react";
import Pagination from "../pagination/Pagination";

const Table = ({ fields, employees }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        {fields.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.sno}>
                            <td>{employee.sno}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.domain}</td>
                            <td>{employee.designation}</td>
                            <td>
                                <button className="btn btn-sm btn-danger"><i className="bi bi-trash-fill"></i></button>
                                <button className="btn btn-sm btn-primary" style={{ marginLeft: '10px' }}><i className="bi bi-journal"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex align-items-center justify-content-center">
                <Pagination />
            </div>
        </div>
    );
};

export default Table;
