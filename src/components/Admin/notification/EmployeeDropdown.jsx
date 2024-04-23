import { useState, useEffect, useMemo } from "react";
import { EmployeeService } from "../../../services/admin/employees.service";
import { AdminService } from "../../../services/admin/admin.service";

const EmployeeForm = ({handleInformationDataFromEmployeeDropdown}) => {
  const [employeeTransferData, setEmployeeTransferData] = useState([
    { employeeId: "", desk: "", deskId: "" },
  ]);
  const [employees, setEmployees] = useState([]);
  const [desks, setDesks] = useState([]);
  const employeeService = useMemo(() => new EmployeeService(), []);
  const adminService = useMemo(() => new AdminService(), []);

  const getListOfAllEmployees = async () => {
    try {
      const response = await employeeService.getAllEmployees(1, false);
      if (response.status === 200) {
        setEmployees(response?.data?.data);
      }
    } catch (error) {}
  };

  const getAllDesks = async () => {
    try {
      const endpoint = `${
        process.env.REACT_APP_BACKEND_URL
      }/get-all-desks?paginatedData=${false}`;
      const response = await adminService.getData(endpoint);
      if (response.status === 200) {
        setDesks(response?.data?.data);
      }
    } catch (error) {}
  };

  const handleEmployeeDropdown = (event, index) => {
    const { value } = event.target;
    const employee = employees.find((e) => e._id === value);
    const updatedEmployees = [...employeeTransferData];
    updatedEmployees[index].employeeId = value;
    if (employee.associated) {
      const desk = desks.find((d) => d._id === employee.associated);
      updatedEmployees[index].desk =
        "Employee is associated with Desk " + desk.name;
      updatedEmployees[index].deskId = desk._id;
    } else {
      updatedEmployees[index].desk =
        "Employee is not associated with any Desk ";
      updatedEmployees[index].deskId = "";
    }
    setEmployeeTransferData(updatedEmployees);
    handleInformationDataFromEmployeeDropdown(updatedEmployees);
  };

  const handleDeskDropdown = (event, index) => {
    const { value } = event.target;
    const updatedEmployees = [...employeeTransferData];
    updatedEmployees[index].deskId = value;
    setEmployeeTransferData(updatedEmployees);
    handleInformationDataFromEmployeeDropdown(updatedEmployees);
  };

  const handleAddMoreButton = () => {
    setEmployeeTransferData([
      ...employeeTransferData,
      { employeeId: "", desk: "", deskId: "" },
    ]);
  };

  const handleDeleteDropdownButton = (index) => {
    if (index === 0) return;
    const updatedEmployees = [...employeeTransferData];
    updatedEmployees.splice(index, 1);
    setEmployeeTransferData(updatedEmployees);
    handleInformationDataFromEmployeeDropdown(updatedEmployees);
  };

  useEffect(() => {
    getListOfAllEmployees();
    getAllDesks();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <hr style={{ marginBottom: "10px" }} />
        <h3 style={{ fontSize: "1.2em" }}>Employees Transfer</h3>
      </div>
      {employeeTransferData.map((employee, index) => (
        <div
          key={index}
          className="row"
          style={{ alignItems: "center", marginBottom: "10px" }}
        >
          <div className="col-4">
            <label htmlFor={`options-${index}`} className="form-label">
              Select an option:
            </label>
            <select
              id={`options-${index}`}
              name={`options-${index}`}
              className="form-control"
              value={employee.employeeId}
              onChange={(e) => handleEmployeeDropdown(e, index)}
            >
              <option value="">Select</option>
              {employees.map((employee, index) => {
                return (
                  <option key={index} value={employee._id}>
                    {employee.name}
                  </option>
                );
              })}
            </select>
          </div>
          {employee.employeeId && (
            <>
              <div
                className="col-3"
                style={{ display: "flex", alignItems: "center" }}
              >
                <p style={{ marginBottom: "0", marginLeft: "10px" }}>
                  <b>Desk</b>: {employee.desk}
                </p>
              </div>
              <div className="col-4">
                <label htmlFor={`secondDropdown-${index}`}>
                  Update the desk
                </label>
                <select
                  id={`secondDropdown-${index}`}
                  name={`secondDropdown-${index}`}
                  value={employee.deskId}
                  onChange={(e) => handleDeskDropdown(e, index)}
                  className="form-control"
                >
                  <option value="">Select</option>
                  {desks.map((desk, index) => {
                    return (
                      <option key={index} value={desk._id}>
                        {desk.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </>
          )}

          <div
            className="col-1"
            style={{ display: "flex", alignItems: "center" }}
          >
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDeleteDropdownButton(index)}
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      ))}
      <button
        className="btn btn-secondary btn-sm"
        onClick={handleAddMoreButton}
      >
        Add More
      </button>
    </div>
  );
};

export default EmployeeForm;
