import React from 'react';
import { Link } from 'react-router-dom';
import EmployeeTable from "../../components/Admin/EmployeeTable"
import AdminLayout from "../../components/Admin/AdminLayout";

const Employees = () => {
  return (
    <>
         <AdminLayout>
      <main id="main" class="main">
        <section class="section dashboard">
          <div class="row">
            <div class="col-lg-12">
              <div class="tab-content">
                {/* Employees Tab */}
                <div class="tab-pane fade show active" id="employees">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Employee Table</h5>
                      <EmployeeTable/>
                      {/* Add New Employee Button */}
                      <Link to="/employees/addNewEmployees" class="btn btn-primary mt-3">
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
