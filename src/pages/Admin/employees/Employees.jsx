import React from "react";
import { Link } from "react-router-dom";
import EmployeeTable from "../../../components/Admin/employees/EmployeeTable";
import AdminLayout from "../../../components/Admin/AdminLayout";

const Employees = () => {
  return (
    <>
      <AdminLayout>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Employees</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item">Employees</li>
                <li className="breadcrumb-item active">Lists</li>
              </ol>
            </nav>
          </div>
          <section className="section dashboard">
            <div className="row">
              <div className="col-lg-12">
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="employees">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-start justify-content-between mb-3">
                          <h5 className="card-title">Employees</h5>
                          <Link
                            to="/employees/addNewEmployees"
                            className="btn btn-primary btn-sm mt-3"
                          >
                            Add New Employee
                          </Link>
                        </div>
                        <EmployeeTable />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </AdminLayout>
    </>
  );
};

export default Employees;
