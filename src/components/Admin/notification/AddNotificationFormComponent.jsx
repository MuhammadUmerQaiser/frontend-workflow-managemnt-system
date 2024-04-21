// AddEmployeeForm.js

import { useSnackbar } from "notistack";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminService } from "../../../services/admin/admin.service";
import AuthButton from "../../common/Button/AuthButton";
import EmployeeDropdown from "./EmployeeDropdown";

const AddNotificationFormComponent = () => {
  const [employeeData, setEmployeeData] = useState({
    notificationId: "",
    date: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const adminService = useMemo(() => new AdminService(), []);
  const [employees, setEmployees] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, domain, designation, role } = employeeData;

    if (!email || !password || !name || !domain || !designation || !role) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await adminService.postData(employeeData);

      if (response.status === 200) {
        enqueueSnackbar("Employee Created Successfully", {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/admin/employees");
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } finally {
      setLoading(false);
    }
    setEmployeeData({
      name: "",
      email: "",
      password: "",
      domain: "",
      designation: "",
    });
  };

  const init = async () => {
    getAllEmployees();
    console.log("employees");
    console.log(employees);
  };

  useEffect(() => {
    init();
  }, []);
  const getAllEmployees = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-all-unassoicated-employees`;
      const response = await adminService.getData(endpoint);
      if (response.status === 200) {
        setEmployees(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Create Notification</h5>
          <form className="row g-3" method="POST">
            <div className="col-6">
              <label htmlFor="name" className="form-label">
                Notification ID
              </label>
              <input
                type="number"
                className="form-control"
                id="notificationId"
                name="notificationId"
                value={employeeData.notificationId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-6">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-control"
                value={employeeData.date}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows="4"
                cols="50"
                value={employeeData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <EmployeeDropdown />
            <div>
              <AuthButton
                label={"Add Notification"}
                onClick={handleSubmit}
                loading={loading}
                className="btn btn-success mt-3"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNotificationFormComponent;
