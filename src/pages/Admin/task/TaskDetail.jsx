import React, { useState, useEffect, useMemo } from "react";
import UserLayout from "../../../components/User/UserLayout";
import { useSnackbar } from "notistack";
import { Link, useParams } from "react-router-dom";
import { AdminService } from "../../../services/admin/admin.service";

const TaskDetail = () => {
  const [task, setTask] = useState({});
  const adminService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  useEffect(() => {
    getTaskDetailById();
  }, []);

  const getTaskDetailById = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-task/${params.taskId}`;
      const response = await adminService.getData(endpoint);
      if (response.status === 200) {
        setTask(response?.data?.data);
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
                  <Link to={`/admin/tasks`}>Tasks</Link>
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
                                to={`/admin/task/response/${params.taskId}`}
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
                                  {task.task?.name}
                                </div>
                              </div>

                              <div className="row mt-3">
                                <div className="col-lg-3 col-md-4 label">
                                  <b>Description</b>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {task.task?.description}
                                </div>
                              </div>

                              <div className="row mt-3">
                                <div className="col-lg-3 col-md-4 label">
                                  <b>Due Date</b>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {new Date(
                                    task.task?.due_date
                                  ).toLocaleDateString()}
                                </div>
                              </div>

                              <div className="row mt-3">
                                <div className="col-lg-3 col-md-4 label">
                                  <b>Assigned By</b>
                                </div>
                                <div className="col-lg-9 col-md-8 text-primary">
                                  {`Task created by: ${task.task?.assigned_by?.name}, Role: ${task.task?.assigned_by?.role}`}
                                </div>
                              </div>
                            </div>

                            <h5 className="card-title mt-4">
                              Task Assignment Details
                            </h5>
                            <div className="assignment-details">
                              {task.taskAssignments?.map(
                                (assignment, index) => (
                                  <div
                                    key={index}
                                    className="assignment-detail mt-3 p-3 border rounded bg-light"
                                  >
                                    <div className="row">
                                      <div className="col-lg-3 col-md-4 label">
                                        <b>Assigned To</b>
                                      </div>
                                      <div className="col-lg-9 col-md-8 text-success">
                                        {`Task assigned to: ${assignment.assigned_to?.name}, Role: ${assignment.assigned_to?.role}`}
                                      </div>
                                    </div>

                                    <div className="row mt-3">
                                      <div className="col-lg-3 col-md-4 label">
                                        <b>Close Request</b>
                                      </div>
                                      <div className="col-lg-9 col-md-8">
                                        {assignment?.close_assignment_request.toUpperCase()}
                                      </div>
                                    </div>

                                    <div className="row mt-3">
                                      <div className="col-lg-3 col-md-4 label">
                                        <b>Transfer History</b>
                                      </div>
                                      <div className="col-lg-9 col-md-8">
                                        {assignment?.transfer?.map(
                                          (transfer, transferIndex) => (
                                            <div
                                              key={transferIndex}
                                              className="transfer-detail mt-2 p-2 border rounded"
                                            >
                                              <div>
                                                <b>Assigned To:</b>{" "}
                                                {transfer?.assignee?.name}
                                              </div>
                                              <div>
                                                <b>Assigned By:</b>{" "}
                                                {transfer?.assigned_by?.name}
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
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

export default TaskDetail;
