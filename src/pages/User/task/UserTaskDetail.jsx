import React, { useState, useEffect, useMemo } from "react";
import UserLayout from "../../../components/User/UserLayout";
import { useSnackbar } from "notistack";
import { Link, useParams } from "react-router-dom";
import { AdminService } from "../../../services/admin/admin.service";

const UserTaskDetail = () => {
  const [taskAssignment, setTaskAssignment] = useState({});
  const adminService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  useEffect(() => {
    getTaskAssignmentDetailById();
  }, []);

  const getTaskAssignmentDetailById = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-task-assignment/${params.taskAssignmentId}`;
      const response = await adminService.getData(endpoint);
      if (response.status === 200) {
        setTaskAssignment(response?.data?.data);
        console.log(response?.data?.data);
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <>
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
                  <Link to={`/user/tasks`}>Tasks</Link>
                </li>
                <li className="breadcrumb-item active">Details</li>
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
                        <div className="tab-content pt-2">
                          <div className="tab-pane fade show active profile-overview">
                            <div className="d-flex justify-content-between align-items-center">
                              <h5 className="card-title">Task Details</h5>
                              <Link
                                to={`/user/task/response/${params.taskAssignmentId}`}
                                className="btn btn-info"
                              >
                                <i className="bi bi-reply"></i>
                              </Link>
                            </div>
                            <div className="task-details">
                              <div className="row mt-3">
                                <div className="col-lg-3 col-md-4 label">
                                  <b>Name</b>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {taskAssignment.task?.name}
                                </div>
                              </div>

                              <div className="row mt-3">
                                <div className="col-lg-3 col-md-4 label">
                                  <b>Description</b>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {taskAssignment.task?.description}
                                </div>
                              </div>

                              <div className="row mt-3">
                                <div className="col-lg-3 col-md-4 label">
                                  <b>Due Date</b>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {new Date(
                                    taskAssignment.task?.due_date
                                  ).toLocaleDateString()}
                                </div>
                              </div>

                              <div className="row mt-3">
                                <div className="col-lg-3 col-md-4 label">
                                  <b>Assigned By</b>
                                </div>
                                <div className="col-lg-9 col-md-8 text-primary">
                                  {`Task created by: ${taskAssignment?.assignment_reference?.name}, Role: ${taskAssignment?.assignment_reference?.role}`}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </UserLayout>
    </>
  );
};

export default UserTaskDetail;
