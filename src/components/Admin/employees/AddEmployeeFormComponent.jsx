// AddEmployeeForm.js

import React, { useEffect, useMemo, useState } from "react";
import { generateRandomPassword } from "../../../helpers/helpers";
import AuthButton from "../../common/Button/AuthButton";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { EmployeeService } from "../../../services/admin/employees.service";
import {
  getAllDesignation,
  getAllDomains,
  getAllRoles,
} from "../../../services/global";

const AddEmployeeForm = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    password: "",
    domain: "",
    designation: "",
    role: "",
  });
  const [roles, setRoles] = useState([]);
  const [domains, setDomains] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const employeeService = useMemo(() => new EmployeeService(), []);

  const generatePassword = () => {
    const password = generateRandomPassword();
    setEmployeeData({
      ...employeeData,
      password: password,
    });
  };

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
      const response = await employeeService.addEmployees(employeeData);

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
    setRoles(await getAllRoles());
    setDomains(await getAllDomains());
    setDesignations(await getAllDesignation());
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Create Employee</h5>
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
                value={employeeData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={employeeData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex" style={{ gap: "30px" }}>
              <div className="col-8">
                <label htmlFor="email" className="form-label">
                  Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="password"
                  value={employeeData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ width: "150px", height: "40px", marginTop: "30px" }}
                onClick={() => generatePassword()}
              >
                Generate Password
              </button>
            </div>
            <div className="col-6">
              <label htmlFor="domain" className="form-label">
                Roles
              </label>
              <select
                className="form-select"
                name="role"
                value={employeeData.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                {roles.map((role, index) => {
                  return (
                    <option key={index} value={role.name}>
                      {role.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="domain" className="form-label">
                Domain
              </label>
              <select
                className="form-select"
                name="domain"
                value={employeeData.domain}
                onChange={handleChange}
              >
                <option value="">Select Domain</option>
                {domains.map((domain, index) => {
                  return (
                    <option key={index} value={domain.name}>
                      {domain.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="designation" className="form-label">
                Designation
              </label>
              <select
                className="form-select"
                name="designation"
                value={employeeData.designation}
                onChange={handleChange}
              >
                <option value="">Select Designation</option>
                {designations.map((designation, index) => {
                  return (
                    <option key={index} value={designation.name}>
                      {designation.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <AuthButton
                label={"Add Employee"}
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

export default AddEmployeeForm;
