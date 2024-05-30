import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserLayout from "../../../components/User/UserLayout";
import TaskResponsesLayout from "../../../components/User/task/TaskResponsesLayout";
import { AdminService } from "../../../services/admin/admin.service";
import { useSnackbar } from "notistack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "../../../styles/task/task.css";
import { isAuthenticated } from "../../../helpers/helpers";

const UserTaskResponse = () => {
  const { taskAssignmentId } = useParams();
  const [taskAssignment, setTaskAssignment] = useState(null);
  const [taskAssignedBy, setTaskAssignedBy] = useState(null);
  const [allowResponseMessage, setAllowResponseMessage] = useState(true);
  const [employeeWithLowerLevels, setEmployeeWithLowerLevels] = useState([]);
  const userService = useMemo(() => new AdminService(), []);
  const [reciever, setReciever] = useState(null);
  const user = isAuthenticated();
  const { enqueueSnackbar } = useSnackbar();

  const getTaskAssignmentDetailById = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-task-assignment/${taskAssignmentId}`;
      const response = await userService.getData(endpoint);
      if (response.status === 200) {
        setTaskAssignment(response?.data?.data);
        console.log(response?.data?.data);
        setReciever(response?.data?.data?.assignment_reference);
        if (response?.data?.data && response?.data?.data.transfer.length > 0) {
          const taskTransferAssignee = response?.data?.data.transfer.find(
            (item) => item.assignee._id === user.id
          );
          if (taskTransferAssignee) {
            setAllowResponseMessage(taskTransferAssignee?.is_task_response);
            setTaskAssignedBy(taskTransferAssignee?.assigned_by);
          } else {
            setAllowResponseMessage(response?.data?.data?.is_task_response);
            setTaskAssignedBy(response?.data?.data?.assignment_reference);
            console.log("else");
          }
        } else if (
          response?.data?.data &&
          response?.data?.data?.is_task_response
        ) {
          console.log("else if");
          setAllowResponseMessage(response?.data?.data?.is_task_response);
          setTaskAssignedBy(response?.data?.data?.assignment_reference);
        }
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const getEmployeesDetailsWithLowerLevels = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-users-with-lower-roles`;
      const response = await userService.getData(endpoint);
      if (response.status === 200) {
        setEmployeeWithLowerLevels(response?.data?.data);
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleMuiSelectChange = (event, value) => {
    transferTheTaskToAnotherEmployee(event, value._id);
  };

  const transferTheTaskToAnotherEmployee = async (e, transferedEmployeeId) => {
    e.preventDefault();
    const data = {
      assigned_to: transferedEmployeeId,
    };

    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/transfer-task-assignment-to-another-employee/${taskAssignment._id}`;
      const response = await userService.postData(endpoint, data);

      if (response.status === 200) {
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        getTaskAssignmentDetailById();
      }
      if (
        response?.response?.status === 500 ||
        response?.response?.status === 400
      ) {
        enqueueSnackbar(response?.response?.data?.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleCloseTaskRequest = async (e) => {
    e.preventDefault();

    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/close-task-assignment-request/${taskAssignmentId}`;
      const response = await userService.postData(endpoint, {});

      if (response.status === 200) {
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        getTaskAssignmentDetailById();
      }
      if (
        response?.response?.status === 500 ||
        response?.response?.status === 400
      ) {
        enqueueSnackbar(response?.response?.data?.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  useEffect(() => {
    getTaskAssignmentDetailById();
    getEmployeesDetailsWithLowerLevels();
  }, [taskAssignmentId]);
  return (
    <>
      <UserLayout>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Task</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/user">Home</Link>
                </li>
                <li className="breadcrumb-item active">
                  Task Id: {taskAssignment?.task?._id}
                </li>
              </ol>
            </nav>
          </div>
          <section className="section dashboard">
            <div className="row">
              <div className="col-lg-12">
                <div className="container mt-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="employee-select-container">
                        <h5 className="card-title">
                          Task Room{" "}
                          {taskAssignedBy && (
                            <span className="card-title">
                              Assigned By: {taskAssignedBy?.name} (Role:{" "}
                              {taskAssignedBy?.role})
                            </span>
                          )}
                        </h5>
                        {allowResponseMessage && (
                          <>
                            <div>
                              <label className="form-label employee-label mt-3">
                                Employees
                              </label>
                              <Autocomplete
                                id="employee-select"
                                className="employee-select"
                                options={employeeWithLowerLevels}
                                getOptionLabel={(option) => option.name}
                                onChange={(event, value) =>
                                  handleMuiSelectChange(event, value)
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Select Employee"
                                    variant="outlined"
                                  />
                                )}
                              />
                            </div>
                          </>
                        )}
                      </div>
                      {allowResponseMessage && (
                        <div className="mt-2 mb-3">
                          {(taskAssignment?.close_assignment_request ===
                            "none" ||
                            taskAssignment?.close_assignment_request ===
                              "rejected") && (
                            <button
                              className="btn btn-success btn-sm mb-3"
                              onClick={(e) => handleCloseTaskRequest(e)}
                            >
                              Close Task
                            </button>
                          )}
                          {taskAssignment?.close_assignment_request ===
                            "rejected" && (
                            <span className="text-danger">
                              Your task close request is rejected. Reason:{" "}
                              {taskAssignment?.task_rejection_reason}.
                            </span>
                          )}
                          {taskAssignment?.close_assignment_request ===
                            "accepted" && (
                            <span className="text-success">
                              Your task close request is accepted.
                            </span>
                          )}
                          {taskAssignment?.close_assignment_request ===
                            "pending" && (
                            <span className="text-info">
                              Your task close request is pending.
                            </span>
                          )}
                        </div>
                      )}

                      {taskAssignment &&
                        taskAssignment?.assignment_reference && (
                          <TaskResponsesLayout
                            taskAssignment={taskAssignment}
                            reciever={reciever}
                            allowResponseMessage={allowResponseMessage}
                          />
                        )}
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

export default UserTaskResponse;
