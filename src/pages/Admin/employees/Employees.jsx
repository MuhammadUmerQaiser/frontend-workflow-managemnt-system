import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../components/Admin/AdminLayout";
import Table from "../../../components/common/table/Table";

const Employees = () => {
  const fields = ['Sno', 'Name', 'Email', 'Domain', 'Designation', 'Action'];
  const employees = [
    {
      sno: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      domain: "IT",
      designation: "Software Engineer",
    },
    {
      sno: 2,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      domain: "HR",
      designation: "HR Manager",
    },
    {
      sno: 3,
      name: "Miles Morales",
      email: "jane.doe@example.com",
      domain: "HR",
      designation: "HR Manager",
    },
    {
      sno: 4,
      name: "Gwen Stacy",
      email: "jane.doe@example.com",
      domain: "HR",
      designation: "HR Manager",
    },
    {
      sno: 5,
      name: "Peter Parker",
      email: "jane.doe@example.com",
      domain: "HR",
      designation: "HR Manager",
    },
    {
      sno: 6,
      name: "Tony Stark",
      email: "jane.doe@example.com",
      domain: "HR",
      designation: "HR Manager",
    },
  ];
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
                            to="/employees/create"
                            className="btn btn-primary btn-sm mt-3"
                          >
                            Add New Employee
                          </Link>
                        </div>
                        <div className="table-reponsive">
                          <Table fields={fields} employees={employees} />
                        </div>
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
