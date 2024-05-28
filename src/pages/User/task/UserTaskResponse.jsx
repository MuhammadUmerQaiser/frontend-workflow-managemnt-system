import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserLayout from "../../../components/User/UserLayout";
import TaskResponsesLayout from "../../../components/User/task/TaskResponsesLayout";
import { AdminService } from "../../../services/admin/admin.service";
import { useSnackbar } from "notistack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "../../../styles/task/task.css";

const UserTaskResponse = () => {
  const { taskAssignmentId } = useParams();
  const [taskAssignment, setTaskAssignment] = useState(null);
  const [employeeWithLowerLevels, setEmployeeWithLowerLevels] = useState([]);
  const userService = useMemo(() => new AdminService(), []);
  const [reciever, setReciever] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const getTaskDetailById = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-task-assignment/${taskAssignmentId}`;
      const response = await userService.getData(endpoint);
      if (response.status === 200) {
        setTaskAssignment(response?.data?.data);
        setReciever(response?.data?.data?.assignment_reference);
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

  const handleMuiSelectChange = async (name, value) => {
    // const workingGroupIds = value.map((item) => item._id);
    // const updatedGroups = deskData.working_group.filter((workingGroupId) =>
    //   workingGroupIds.includes(workingGroupId)
    // );
    // const newGroups = value
    //   .filter((item) => !deskData.working_group.includes(item._id))
    //   .map((item) => item._id);
    // setDeskData((prev) => ({
    //   ...prev,
    //   working_group: [...updatedGroups, ...newGroups],
    // }));
  };

  useEffect(() => {
    getTaskDetailById();
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
                    <div className="employee-select-container mb-3">
                      <h5 className="card-title">
                        Task Room{" "}
                        <span className="card-title">
                          Assigned By:{" "}
                          {taskAssignment?.assignment_reference?.name} (Role:{" "}
                          {taskAssignment?.assignment_reference?.role})
                        </span>
                      </h5>
                      <div>
                        <label className="form-label employee-label mt-3">
                          Employees
                        </label>
                        <Autocomplete
                          id="employee-select"
                          className="employee-select"
                          options={employeeWithLowerLevels}
                          getOptionLabel={(option) => option.name}
                          name="working_group"
                          onChange={(event, value) =>
                            handleMuiSelectChange("working_group", value)
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
                    </div>
                      {taskAssignment &&
                        taskAssignment?.assignment_reference && (
                          <TaskResponsesLayout
                            taskAssignment={taskAssignment}
                            reciever={reciever}
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
