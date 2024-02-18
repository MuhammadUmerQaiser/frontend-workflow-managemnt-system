// AddEmployeeForm.js
import React, { useMemo, useState, useEffect } from "react";
import AuthButton from "../../common/Button/AuthButton";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeService } from "../../../services/admin/employees.service";

const AddEmployeeForm = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    domain: "",
    designation: "",
    member: "",
    team: "",
    grade: "",
    tasks: [],
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const params = useParams();
  const employeeService = useMemo(() => new EmployeeService(), []);

  useEffect(() => {
    getEmployeeDetail();
  }, []);

  const getEmployeeDetail = async () => {
    try {
      const response = await employeeService.getSingleEmployeeDetailById(
        params.employeeId
      );
      if (response.status === 200) {
        setEmployeeData({
          name: response.data?.name,
          email: response.data?.email,
          domain: response.data?.domain,
          designation: response.data?.designation,
          member: response.data?.member,
          team: response.data?.team,
          grade: response.data?.grade,
          tasks: response.data?.tasks,
        });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "tasks") {
      setEmployeeData((prevData) => ({
        ...prevData,
        tasks: checked
          ? [...prevData.tasks, value]
          : prevData.tasks.filter((task) => task !== value),
      }));
    } else {
      setEmployeeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, domain, designation, member, team, grade, tasks } =
      employeeData;

    if (
      !email ||
      !name ||
      !domain ||
      !designation ||
      !member ||
      !grade ||
      !tasks
    ) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await employeeService.updateEmployee(
        params.employeeId,
        employeeData
      );

      if (response.status === 200) {
        enqueueSnackbar("Employee Edit Successfully", {
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
      domain: "",
      designation: "",
      member: "",
      team: "",
      grade: "",
      tasks: [],
    });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Edit Employee {employeeData.name}</h5>
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
                disabled
              />
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
                <option value="domain1">Domain 1</option>
                <option value="domain2">Domain 2</option>
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
                <option value="designation1">Designation 1</option>
                <option value="designation2">Designation 2</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Member</label>
              <div className="form-check d-flex" style={{ gap: "40px" }}>
                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="member"
                    value="individual"
                    onChange={handleChange}
                    checked={employeeData.member === "individual"}
                  />
                  <label className="form-check-label">Individual</label>
                </div>
                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="member"
                    value="group"
                    onChange={handleChange}
                    checked={employeeData.member === "group"}
                  />
                  <label className="form-check-label">Group</label>
                </div>
              </div>
            </div>
            {employeeData.member == "group" && (
              <div className="col-6">
                <label htmlFor="domain" className="form-label">
                  Team
                </label>
                <select
                  className="form-select"
                  name="team"
                  value={employeeData.team}
                  onChange={handleChange}
                >
                  <option value="">Select Team</option>
                  <option value="team1">Team 1</option>
                  <option value="team2">Team 2</option>
                </select>
              </div>
            )}
            <div className="col-6">
              <label htmlFor="designation" className="form-label">
                Grade
              </label>
              <select
                className="form-select"
                name="grade"
                value={employeeData.grade}
                onChange={handleChange}
              >
                <option value="">Select Grade</option>
                <option value="grade1">Grade 1</option>
                <option value="grade2">Grade 2</option>
              </select>
            </div>
            <div className="col-12">
              <label htmlFor="designation" className="form-label">
                Tasks
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="tasks"
                  value="Task 1"
                  onChange={handleChange}
                  checked={employeeData.tasks.includes("Task 1")}
                />
                <label className="form-check-label">Task 1</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="tasks"
                  value="Task 2"
                  onChange={handleChange}
                  checked={employeeData.tasks.includes("Task 2")}
                />
                <label className="form-check-label">Task 2</label>
              </div>
            </div>
            <div>
              <AuthButton
                label={"Edit Employee"}
                onClick={handleSubmit}
                loading={loading}
                className="btn btn-primary mt-3"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
