import React, { useEffect, useMemo, useState } from "react";
import UserLayout from "../../../components/User/UserLayout";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AdminService } from "../../../services/admin/admin.service";
import Pagination from "../../../components/common/pagination/Pagination";

const TaskHistory = () => {
  const [taskHistory, setTaskHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const userService = useMemo(() => new AdminService(), []);

  const getAllTaskHistoryDetail = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-all-user-task-history?page=${currentPage}`;
      const response = await userService.getData(endpoint);
      if (response.status === 200) {
        console.log(response?.data?.data);
        setTaskHistory(response?.data?.data);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getAllTaskHistoryDetail();
  }, [currentPage || taskHistory]);
  return (
    <UserLayout>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Task History</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin">Home</Link>
              </li>
              <li className="breadcrumb-item active">List</li>
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
                        <h5 className="card-title">Task History</h5>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                          <thead className="table">
                            <tr>
                              <th>S.no</th>
                              <th>Role</th>
                              <th>Email</th>
                              <th>History Detail</th>
                            </tr>
                          </thead>
                          <tbody>
                            {taskHistory?.map((history, index) => {
                              if (history?.created && history?.removed) {
                                // Calculate the duration
                                const createdDate = new Date(history.created);
                                const removedDate = new Date(history.removed);
                                const durationMs = removedDate - createdDate;
                                const durationDays = Math.floor(
                                  durationMs / (1000 * 60 * 60 * 24)
                                ); // Duration in days
                                const durationMinutes = Math.floor(
                                  durationMs / (1000 * 60)
                                ); // Duration in minutes

                                let badgeColor;
                                switch (history.status) {
                                  case "Completed":
                                    badgeColor = "success";
                                    break;
                                  default:
                                    badgeColor = "secondary";
                                    break;
                                }

                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{history?.user?.role}</td>
                                    <td>{history?.user?.email}</td>
                                    <td>
                                      <strong>
                                        {`Employee: ${history?.user?.name}'s task status is `}
                                        <span
                                          className={`badge bg-${badgeColor}`}
                                        >
                                          {history?.status}
                                        </span>
                                        {` for task ${
                                          history?.task_assignment?.task?.name
                                        } from ${createdDate.toLocaleDateString()} to ${removedDate.toLocaleDateString()} `}
                                      </strong>
                                      {durationDays > 0
                                        ? `(${durationDays} days)`
                                        : `(${durationMinutes} minutes)`}
                                    </td>
                                  </tr>
                                );
                              } else if (history?.created) {
                                const createdDate = new Date(history.created);

                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{history?.user?.role}</td>
                                    <td>{history?.user?.email}</td>
                                    <td>
                                      <strong>
                                        {`Employee: ${history?.user?.name}'s task status is `}
                                        <span className="badge bg-warning">
                                          In Progress
                                        </span>
                                        {` for task ${
                                          history?.task_assignment?.task?.name
                                        } since ${createdDate.toLocaleDateString()}`}
                                      </strong>
                                    </td>
                                  </tr>
                                );
                              }
                              return null;
                            })}
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
        </section>
      </main>
    </UserLayout>
  );
};

export default TaskHistory;
