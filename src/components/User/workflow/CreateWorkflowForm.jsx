// AddEmployeeForm.js
import React, { useMemo, useState } from "react";
import AuthButton from "../../common/Button/AuthButton";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { AdminService } from "../../../services/admin/admin.service";

const CreateWorkflowForm = () => {
  const [userWorkflowData, setUserWorkflowData] = useState({
    task: "",
    date: "",
    time: "",
    meeting: "",
    related: "",
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const userService = useMemo(() => new AdminService(), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserWorkflowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { task, date, time, related, meeting } = userWorkflowData;
    if (!task || !date || !time || !related || !meeting) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/create-user-workflow`;
      const response = await userService.postData(endpoint, userWorkflowData);
      if (response.status == 200) {
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/user");
      } else {
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

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Create Worklow</h5>
          <form className="row g-3" method="POST">
            <div className="col-12">
              <label htmlFor="name" className="form-label">
                Task
              </label>
              <textarea
                className="form-control"
                name="task"
                rows="4"
                style={{ resize: "none" }}
                value={userWorkflowData.task}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-6">
              <label htmlFor="name" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={userWorkflowData.date}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="name" className="form-label">
                Time
              </label>
              <input
                type="time"
                className="form-control"
                name="time"
                value={userWorkflowData.time}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label className="form-label">
                Is task perform inside or outside of SRB?
              </label>
              <div className="form-check d-flex" style={{ gap: "40px" }}>
                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="related"
                    value="Internal"
                    onChange={handleChange}
                    checked={userWorkflowData.related === "Internal"}
                  />
                  <label className="form-check-label">Inside</label>
                </div>
                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="related"
                    value="External"
                    onChange={handleChange}
                    checked={userWorkflowData.related === "External"}
                  />
                  <label className="form-check-label">Outside</label>
                </div>
              </div>
            </div>
            <div className="col-6">
              <label className="form-label">
                Have you conduct any meeting regarding task?
              </label>
              <div className="form-check d-flex" style={{ gap: "40px" }}>
                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="meeting"
                    value="Yes"
                    onChange={handleChange}
                    checked={userWorkflowData.meeting === "Yes"}
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="meeting"
                    value="No"
                    onChange={handleChange}
                    checked={userWorkflowData.meeting === "No"}
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
            </div>
            <div>
              <AuthButton
                label={"Create"}
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

export default CreateWorkflowForm;
