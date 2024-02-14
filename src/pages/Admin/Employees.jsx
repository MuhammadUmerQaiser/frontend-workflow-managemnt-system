import React from 'react';
import { Link } from 'react-router-dom';
import EmployeeTable from "../../components/Admin/EmployeeTable"
import AdminLayout from "../../components/Admin/AdminLayout";

const Employees = () => {
  return (
    <>
         <AdminLayout>
      <main id="main" className="main">
        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-12">
              <div className="tab-content">
                {/* Employees Tab */}
                <div className="tab-pane fade show active" id="employees">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Employee Table</h5>
                      <EmployeeTable/>
                      {/* Add New Employee Button */}
                      <Link to="/employees/addNewEmployees" className="btn btn-primary mt-3">
                        Add New Employee
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main></AdminLayout>
    </>
  );
};

export default Employees;
