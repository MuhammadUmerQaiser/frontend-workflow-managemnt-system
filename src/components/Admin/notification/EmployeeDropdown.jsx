import { useState, useEffect } from "react";
import deleteIcon from "../../../assets/img/deleteIcon.png";

const EmployeeForm = () => {
  const [employees, setEmployees] = useState([
    { selectedOption: "", desk: "", secondDropdownValue: "" },
  ]);

  const handleOptionChange = (event, index) => {
    const { value } = event.target;
    const updatedEmployees = [...employees];
    updatedEmployees[index].selectedOption = value;
    setEmployees(updatedEmployees);
    // Fetch data for the selected employee from the backend
    // You can make a backend request here using the selected value and update the corresponding row's desk field
    // Example:
    // fetchEmployeeData(value).then((data) => {
    //   updatedEmployees[index].desk = data.desk;
    //   setEmployees(updatedEmployees);
    // });
  };

  const handleSecondDropdownChange = (event, index) => {
    const { value } = event.target;
    const updatedEmployees = [...employees];
    updatedEmployees[index].secondDropdownValue = value;
    setEmployees(updatedEmployees);
  };

  const handleAddRow = () => {
    setEmployees([
      ...employees,
      { selectedOption: "", desk: "", secondDropdownValue: "" },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <hr style={{ marginBottom: "10px" }} />
        <h3 style={{ fontSize: "1.2em" }}>Employees Transfer</h3>
      </div>
      {employees.map((employee, index) => (
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
              value={employee.selectedOption}
              onChange={(e) => handleOptionChange(e, index)}
            >
              <option value="">Select</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          <div
            className="col-3"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p style={{ marginBottom: "0", marginLeft: "10px" }}>
              Desk: {employee.desk}
            </p>
          </div>
          <div className="col-4">
            <label htmlFor={`secondDropdown-${index}`}>Update the desk</label>
            <select
              id={`secondDropdown-${index}`}
              name={`secondDropdown-${index}`}
              value={employee.secondDropdownValue}
              onChange={(e) => handleSecondDropdownChange(e, index)}
              className="form-control"
            >
              <option value="">Select</option>
              <option value="value1">Value 1</option>
              <option value="value2">Value 2</option>
              <option value="value3">Value 3</option>
            </select>
          </div>

          <div
            className="col-1"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              onClick={() => handleDeleteRow(index)}
              src={deleteIcon}
              style={{ width: 20, height: 20, cursor: "pointer" }}
              alt="Delete"
            />
          </div>
        </div>
      ))}
      <button onClick={handleAddRow}>Add More</button>
    </div>
  );
};

export default EmployeeForm;
