import React, { useState, useEffect, useMemo } from "react";
import UserLayout from "../../../components/User/UserLayout";
import { EmployeeService } from "../../../services/admin/employees.service";
import { useSnackbar } from "notistack";
import { Link, useParams } from "react-router-dom";

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState([]);
  const employeeService = useMemo(() => new EmployeeService(), []);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  useEffect(() => {
    getEmployeeDetail();
  }, []);

  const getEmployeeDetail = async () => {
    try {
      const response = await employeeService.getSingleEmployeeDetailById(
        params.employeeId
      );
      if (response.status === 200) {
        setEmployee(response?.data);
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
                <li className="breadcrumb-item active">Details</li>
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
                        <div className="tab-content pt-2">
                          <div className="tab-pane fade show active profile-overview">
                            <h5 className="card-title">Employee Details</h5>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Name</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {employee.name}
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Email</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {employee.email}
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Role</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {employee.role}
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Domain</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {employee.domain}
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Designation</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {employee.designation}
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Member</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {employee.member}
                              </div>
                            </div>

                            {employee.member == "group" && (
                              <div className="row mt-3">
                                <div className="col-lg-3 col-md-4 label">
                                  <b>Team</b>
                                </div>
                                <div className="col-lg-9 col-md-8">
                                  {employee.team}
                                </div>
                              </div>
                            )}

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Grade</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {employee.grade}
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Tasks</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {employee.tasks ? (
                                  <ol>
                                    {employee.tasks.map((task, index) => (
                                      <li key={index}>{task}</li>
                                    ))}
                                  </ol>
                                ) : (
                                  <p>No tasks available</p>
                                )}
                              </div>
                            </div>
                          </div>
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

export default EmployeeDetail;
