import React from "react";
import AddEmployeeFormComponent from "../../../components/Admin/employees/AddEmployeeFormComponent";
import AdminLayout from "../../../components/Admin/AdminLayout";

const AddEmployeeForm = () => {
  return (
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
              <li className="breadcrumb-item active">Create</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-12">
              <AddEmployeeFormComponent />
            </div>
          </div>
        </section>
      </main>
    </AdminLayout>
  );
};

export default AddEmployeeForm;
