import React from "react";
import AddEmployeeFormComponent from "../../../components/Admin/employees/AddEmployeeFormComponent";
import UserLayout from "../../../components/User/UserLayout";
import { Link } from "react-router-dom";
import AddNotificationFormComponent from "../../../components/Admin/notification/AddNotificationFormComponent";

const AddNotificationForm = () => {
  return (
    <UserLayout>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Notification</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/admin/notification">Notification</Link>
              </li>
              <li className="breadcrumb-item active">Create</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-12">
              <AddNotificationFormComponent />
            </div>
          </div>
        </section>
      </main>
    </UserLayout>
  );
};

export default AddNotificationForm;
