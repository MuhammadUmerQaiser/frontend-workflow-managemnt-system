/* eslint-disable react-hooks/exhaustive-deps */
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../../../components/User/UserLayout";
import AddModal from "../../../components/common/modal/AddModal";
import Table from "../../../components/common/table/Table";
import { AdminService } from "../../../services/admin/admin.service";

const Notification = () => {
  const fields = ["_id", "number", "date", "description", "action"];
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const adminService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getAllNotifications = async () => {
    try {
      const endpoint = `${
        process.env.REACT_APP_BACKEND_URL
      }/get-notifications?page=${currentPage}&paginatedData=${true}`;
      const response = await adminService.getData(endpoint);
      if (response.status === 200) {
        setNotifications(response?.data?.data);
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

  const getAllEmployees = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-all-unassoicated-employees`;
      const response = await adminService.getData(endpoint);
      if (response.status === 200) {
        // setEmployees(response?.data?.data);
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  useEffect(() => {
    getAllNotifications();
  }, [currentPage || notifications]);

  return (
    <>
      <UserLayout>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Notification</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/admin/notification">Notification</Link>
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
                          <h5 className="card-title">Notifications</h5>
                          <Link
                            to="/admin/notification/create"
                            className="btn btn-primary btn-sm mt-3"
                          >
                            Add New Notification
                          </Link>
                        </div>
                        <div className="table-reponsive">
                          <Table
                            fields={fields}
                            data={notifications}
                            currentPage={currentPage}
                            itemsPerPage={pageSize}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                            deleteModalButton={false}
                            editLink={"/admin/employee/edit"}
                            detailLink={"/admin/desk"}
                            showViewButton={true}
                            editModalButton={false}
                            editButtonLink={false}
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

export default Notification;
