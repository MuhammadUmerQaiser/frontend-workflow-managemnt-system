import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../../../components/User/UserLayout";
import Table from "../../../components/common/table/Table";
import { EmployeeService } from "../../../services/admin/employees.service";
import { useSnackbar } from "notistack";

const Employees = () => {
  const fields = ["_id", "name", "email", "domain", "designation", "action"];
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const employeeService = useMemo(() => new EmployeeService(), []);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getListOfAllEmployees();
  }, [currentPage || employees]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getListOfAllEmployees = async () => {
    try {
      const response = await employeeService.getAllEmployees(currentPage);
      if (response.status === 200) {
        setEmployees(response?.data?.data);
        setCurrentPage(response?.data?.currentPage);
        setPageSize(response?.data?.pageSize);
        setTotalPages(response?.data?.totalPages);
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await employeeService.deleteEmployee(id);
      if (response.status === 200) {
        getListOfAllEmployees();
        enqueueSnackbar("Employee Deleted Successfully", {
          variant: "success",
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <>
      <UserLayout>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Employees</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/admin/employees">Employees</Link>
                </li>
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
                          <Table
                            fields={fields}
                            data={employees}
                            currentPage={currentPage}
                            itemsPerPage={pageSize}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                            deleteData={deleteEmployee}
                            detailLink={"/admin/employee/detail"}
                            editLink={"/admin/employee/edit"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </UserLayout>
    </>
  );
};

export default Employees;
