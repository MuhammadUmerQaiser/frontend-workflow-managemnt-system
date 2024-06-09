import React from "react";
import AddTaskFormComponent from "../../../components/Admin/tasks/AddTaskFormComponent";
import UserLayout from "../../../components/User/UserLayout";
import { Link } from "react-router-dom";

const AddTaskForm = () => {
  return (
    <UserLayout>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Tasks</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/admin/tasks">Task</Link>
              </li>
              <li className="breadcrumb-item active">Create</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-12">
              <AddTaskFormComponent />
            </div>
          </div>
        </section>
      </main>
    </UserLayout>
  );
};

export default AddTaskForm;
