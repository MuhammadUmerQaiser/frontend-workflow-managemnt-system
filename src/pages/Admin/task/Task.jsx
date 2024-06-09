import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../../../components/User/UserLayout";
import Table from "../../../components/common/table/Table";
import { useSnackbar } from "notistack";
import { AdminService } from "../../../services/admin/admin.service";
import Pagination from "../../../components/common/pagination/Pagination";

const Task = () => {
  const fields = ["_id", "name", "action"];
  const [tasks, setTask] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const adminService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getListOfAllTasks();
  }, [currentPage || tasks]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getListOfAllTasks = async () => {
    try {
      const endpoint = `${
        process.env.REACT_APP_BACKEND_URL
      }/get-all-tasks?page=${currentPage}&paginatedData=${true}`;
      const response = await adminService.getData(endpoint);
      if (response.status === 200) {
        setTask(response?.data?.data);
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

  return (
    <>
      <UserLayout>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Tasks</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/admin/tasks">Tasks</Link>
                </li>
                <li className="breadcrumb-item active">Lists</li>
              </ol>
            </nav>
          </div>
          <section className="section dashboard">
            <div className="row">
              <div className="col-lg-12">
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="Tasks">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-start justify-content-between mb-3">
                          <h5 className="card-title">Tasks</h5>
                          <Link
                            to="/admin/task/create"
                            className="btn btn-primary btn-sm mt-3"
                          >
                            Add New Task
                          </Link>
                        </div>
                        <div className="table-reponsive">
                          <div className="table-responsive">
                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th>Id</th>
                                  <th>Name</th>
                                  <th>Assignee</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {tasks?.map((task, index) => (
                                  <tr key={index}>
                                    <td>{task._id}</td>
                                    <td>{task.name}</td>
                                    <td>
                                      <ul>
                                        {task.task_assignments?.map(
                                          (assignment, assignmentIndex) => (
                                            <li key={assignmentIndex}>
                                              <Link
                                                to={`/admin/task/response/${task._id}?user=${assignment?.assigned_to?._id}`}
                                              >
                                                {`${assignment?.assigned_to?.name}, Email: ${assignment?.assigned_to?.email}`}
                                              </Link>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </td>
                                    <td>
                                      <Link
                                        to={`/admin/task/detail/${task._id}`}
                                        className="btn btn-sm btn-success"
                                        style={{ marginLeft: "10px" }}
                                      >
                                        <i className="bi bi-eye-fill"></i>
                                      </Link>
                                      <Link
                                        to={`/admin/task/response/${task._id}`}
                                        className="btn btn-sm btn-info"
                                        style={{ marginLeft: "10px" }}
                                      >
                                        <i className="bi bi-reply"></i>
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div className="d-flex align-items-center justify-content-center">
                              <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                              />
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

export default Task;
