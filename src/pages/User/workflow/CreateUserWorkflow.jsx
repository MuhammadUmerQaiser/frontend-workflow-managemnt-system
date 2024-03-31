import React from "react";
import UserLayout from "../../../components/User/UserLayout";
import { Link } from "react-router-dom";
import CreateWorkflowForm from "../../../components/User/workflow/CreateWorkflowForm";

const CreateUserWorkflow = () => {
  return (
    <UserLayout>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Workflow</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/user">Home</Link>
              </li>
              <li className="breadcrumb-item active">Create</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-12">
                <CreateWorkflowForm />
            </div>
          </div>
        </section>
      </main>
    </UserLayout>
  );
};

export default CreateUserWorkflow;
