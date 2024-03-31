import React, { useEffect, useMemo, useState } from "react";
import UserLayout from "../../../components/User/UserLayout";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AdminService } from "../../../services/admin/admin.service";
import Table from "../../../components/common/table/Table";

const UserWorkflowHistory = () => {
  const fields = ["_id", "task", "related", "meeting", "action"];
  const [workflowHistory, setWorkflowHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const userService = useMemo(() => new AdminService(), []);

  const getAllUserWorkflowHistory = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-all-user-workflow-history?page=${currentPage}`;
      const response = await userService.getData(endpoint);
      if (response.status === 200) {
        console.log(response);
        setWorkflowHistory(response?.data?.data);
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
    getAllUserWorkflowHistory();
  }, [currentPage || workflowHistory]);
  return (
    <UserLayout>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Workflow History</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/user">Home</Link>
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
                        <h5 className="card-title">Workflow History</h5>
                      </div>
                      <div className="table-reponsive">
                        <Table
                          fields={fields}
                          data={workflowHistory}
                          currentPage={currentPage}
                          itemsPerPage={pageSize}
                          totalPages={totalPages}
                          handlePageChange={handlePageChange}
                          editLink={"/admin/employee/edit"}
                          showViewButton={true}
                          editModalButton={true}
                          deleteModalButton={false}
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
  );
};

export default UserWorkflowHistory;
