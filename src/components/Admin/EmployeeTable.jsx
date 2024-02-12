
import React from 'react';

const EmployeeTable = () => {
  const mockData = [
    { sno: 1, name: 'John Doe', email: 'john.doe@example.com', domain: 'IT', designation: 'Software Engineer' },
    { sno: 2, name: 'Jane Doe', email: 'jane.doe@example.com', domain: 'HR', designation: 'HR Manager' },
    { sno: 3, name: 'Miles Morales', email: 'jane.doe@example.com', domain: 'HR', designation: 'HR Manager' },
    { sno: 4, name: 'Gwen Stacy', email: 'jane.doe@example.com', domain: 'HR', designation: 'HR Manager' },
    { sno: 5, name: 'Peter Parker', email: 'jane.doe@example.com', domain: 'HR', designation: 'HR Manager' },
    { sno: 6, name: 'Tony Stark', email: 'jane.doe@example.com', domain: 'HR', designation: 'HR Manager' },
  ];

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sno</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Domain</th>
            <th scope="col">Designation</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((employee) => (
            <tr key={employee.sno}>
              <td>{employee.sno}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.domain}</td>
              <td>{employee.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable
