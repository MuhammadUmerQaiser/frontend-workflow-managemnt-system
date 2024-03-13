// AddEmployeeForm.js

import React, { useMemo, useState } from "react";
import AuthButton from "../../common/Button/AuthButton";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { EmployeeService } from "../../../services/admin/employees.service";

const CreateWorkflowForm = () => {
  const [employeeData, setEmployeeData] = useState();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const employeeService = useMemo(() => new EmployeeService(), []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
                id="name"
                name="name"
                rows="4"
                style={{ resize: "none" }}
              ></textarea>
            </div>
            <div className="col-6">
              <label htmlFor="name" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
              />
            </div>
            <div className="col-6">
              <label htmlFor="name" className="form-label">
                Time
              </label>
              <input
                type="time"
                className="form-control"
                id="time"
                name="time"
              />
            </div>
            <div className="col-6">
              <label className="form-label">Is task perform inside or outside of SRB?</label>
              <div className="form-check d-flex" style={{ gap: "40px" }}>
                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="member"
                    value="individual"
                  />
                  <label className="form-check-label">Inside</label>
                </div>
                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="member"
                    value="group"
                  />
                  <label className="form-check-label">Outside</label>
                </div>
              </div>
            </div>
            <div className="col-6">
              <label className="form-label">Have you conduct any meeting regarding task?</label>
              <div className="form-check d-flex" style={{ gap: "40px" }}>
                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="member"
                    value="individual"
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="member"
                    value="group"
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
