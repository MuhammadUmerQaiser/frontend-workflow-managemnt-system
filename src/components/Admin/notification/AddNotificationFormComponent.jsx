// AddEmployeeForm.js

import { useSnackbar } from "notistack";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminService } from "../../../services/admin/admin.service";
import AuthButton from "../../common/Button/AuthButton";
import EmployeeDropdown from "./EmployeeDropdown";

const AddNotificationFormComponent = () => {
  const [notificationData, setNotificationData] = useState({
    number: "",
    date: "",
    description: "",
    information: [],
  });

  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const adminService = useMemo(() => new AdminService(), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotificationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { number, date, description, information } = notificationData;

    if (!number || !date || !description || !information) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/create-notification`;
      const response = await adminService.postData(endpoint, notificationData);
      if (response.status === 200) {
        enqueueSnackbar("Notification Created Successfully", {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/admin/notification");
      } else if (response?.response?.status == 500) {
        enqueueSnackbar("An error occured", {
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
    setNotificationData({
      number: "",
      date: "",
      description: "",
      information: [],
    });
  };

  const handleInformationDataFromEmployeeDropdown = (data) => {
    setNotificationData((prevData) => ({
      ...prevData,
      information: data,
    }));
  };

  useEffect(() => {}, []);

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
                id="number"
                name="number"
                value={notificationData.number}
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
                value={notificationData.date}
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
                value={notificationData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <EmployeeDropdown
              handleInformationDataFromEmployeeDropdown={
                handleInformationDataFromEmployeeDropdown
              }
            />
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
