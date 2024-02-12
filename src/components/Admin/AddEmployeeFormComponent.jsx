// AddEmployeeForm.js

import React, { useState } from 'react';

const AddEmployeeForm = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    domain: '',
    designation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here, e.g., send data to API
    console.log('Submitted data:', employeeData);
    // Clear the form fields after submission if needed
    setEmployeeData({
      name: '',
      email: '',
      domain: '',
      designation: '',
    });
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Add Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
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

            <div className="mb-3">
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

            <div className="mb-3">
              <label htmlFor="domain" className="form-label">
                Domain
              </label>
              <input
                type="text"
                className="form-control"
                id="domain"
                name="domain"
                value={employeeData.domain}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="designation" className="form-label">
                Designation
              </label>
              <input
                type="text"
                className="form-control"
                id="designation"
                name="designation"
                value={employeeData.designation}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Add Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
