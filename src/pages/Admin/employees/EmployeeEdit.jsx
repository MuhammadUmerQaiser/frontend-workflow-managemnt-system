import React from "react";
import EditEmployeeForm from "../../../components/Admin/employees/EditEmployeeForm";
import UserLayout from "../../../components/User/UserLayout";
import { Link } from "react-router-dom";

const AddEmployeeForm = () => {
  return (
    <UserLayout>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Employees</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/admin/employees">Employees</Link>
              </li>
              <li className="breadcrumb-item active">Edit</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-12">
              <EditEmployeeForm />
            </div>
          </div>
        </section>
      </main>
    </UserLayout>
  );
};

export default AddEmployeeForm;
