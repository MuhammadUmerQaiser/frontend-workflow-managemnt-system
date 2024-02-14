import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../../components/Admin/AdminLayout";
import Table from "../../../components/common/table/Table";
import { EmployeeService } from "../../../services/admin/employees.service";
import { useSnackbar } from "notistack";

const Employees = () => {
  const fields = ["Id", "Name", "Email", "Domain", "Designation", "Action"];
  const [employees, setEmployees] = useState([]);
  const employeeService = useMemo(() => new EmployeeService(), []);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getListOfAllEmployees();
  }, []);

  const getListOfAllEmployees = async () => {
    try {
      const response = await employeeService.getAllEmployees();
      console.log(response);
      if (response.status === 200) {
        setEmployees(response?.data);
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } 
  }
  
  return (
    <>
      <AdminLayout>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Employees</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item">Employees</li>
                <li className="breadcrumb-item active">Lists</li>
              </ol>
            </nav>
          </div>
          <section className="section dashboard">
            <div className="row">
              <div className="col-lg-12">
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="employees">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-start justify-content-between mb-3">
                          <h5 className="card-title">Employees</h5>
                          <Link
                            to="/admin/employees/create"
                            className="btn btn-primary btn-sm mt-3"
                          >
                            Add New Employee
                          </Link>
                        </div>
                        <div className="table-reponsive">
                          <Table fields={fields} data={employees} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </AdminLayout>
    </>
  );
};

export default Employees;
