// AddEmployeeForm.js

import React, { useEffect, useMemo, useState } from "react";
import AuthButton from "../../common/Button/AuthButton";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { EmployeeService } from "../../../services/admin/employees.service";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AdminService } from "../../../services/admin/admin.service";

const AddTaskFormComponent = () => {
  const [taskData, setTaskData] = useState({
    name: "",
    due_date: "",
    description: "",
    assigned_to: [],
    assigned_by: "",
  });
  const user = JSON.parse(localStorage.getItem("auth"));
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const employeeService = useMemo(() => new EmployeeService(), []);
  const adminService = useMemo(() => new AdminService(), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
      assigned_by: user.id
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, assigned_by, assigned_to, due_date } = taskData;
    console.log(taskData, user);
    if (!description || !name || !assigned_to || !due_date) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/create-task`;
      const response = await adminService.postData(endpoint, taskData);

      if (response.status === 200) {
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate('/admin/tasks');
      }
      if (response?.response?.status === 500 || response?.response?.status === 400) {
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
    } finally {
      setLoading(false);
    }
  };

  const handleMuiSelectChange = async (name, value) => {
    const employeeIds = value.map((item) => item._id);
    const updatedEmployees = taskData.assigned_to.filter((workingGroupId) =>
      employeeIds.includes(workingGroupId)
    );
    const newEmployees = value
      .filter((item) => !taskData.assigned_to.includes(item._id))
      .map((item) => item._id);
    setTaskData((prev) => ({
      ...prev,
      assigned_to: [...updatedEmployees, ...newEmployees],
    }));
  };

  const getListOfAllEmployees = async () => {
    try {
      const response = await employeeService.getAllEmployees(1, false);
      if (response.status === 200) {
        setEmployees(response?.data?.data);
      }
    } catch (error) {}
  };

  const init = async () => {
    getListOfAllEmployees();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Create Task</h5>
          <form className="row g-3" method="POST">
            <div className="col-6">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={taskData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-6">
              <label htmlFor="email" className="form-label">
                Due Date
              </label>
              <input
                type="date"
                className="form-control"
                id="due_date"
                name="due_date"
                value={taskData.due_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                name="description"
                rows="6"
                style={{ resize: "none" }}
                value={taskData.description}
                onChange={handleChange}
              >
                {" "}
              </textarea>
            </div>
            <div className="col-6">
              <label htmlFor="domain" className="form-label">
                Assigned To
              </label>
              <Autocomplete
                multiple
                id="tags-standard"
                options={employees}
                getOptionLabel={(option) => option.name}
                style={{ width: 465 }}
                name="assigned_to"
                onChange={(event, value) =>
                  handleMuiSelectChange("assigned_to", value)
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
            <div>
              <AuthButton
                label={"Add Task"}
                onClick={handleSubmit}
                loading={loading}
                className="btn btn-secondary btn-sm mt-3"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskFormComponent;
