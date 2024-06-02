import React, { useState, useEffect, useMemo } from "react";
import UserLayout from "../../../components/User/UserLayout";
import { useSnackbar } from "notistack";
import { Link, useParams } from "react-router-dom";
import { AdminService } from "../../../services/admin/admin.service";

const NotificationDetail = () => {
  const [notification, setNotification] = useState({});
  const adminService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  useEffect(() => {
    getDetailOfNotificationById();
  }, []);

  const getDetailOfNotificationById = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-notification/${params.notificationId}`;
      const response = await adminService.getData(endpoint);
      if (response.status === 200) {
        setNotification(response?.data?.data);
        console.log(response?.data?.data);
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
            <h1>Notifications</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/admin/notification">Notification</Link>
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
                            <h5 className="card-title">Notification Details</h5>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Number</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {notification.number}
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Description</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {notification.description}
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Date</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {new Date(
                                  notification.date
                                ).toLocaleDateString()}
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Notification Detail</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {notification.information?.map(
                                  (info, index) => (
                                    <div
                                      key={index}
                                      className="mb-2 p-2 border rounded"
                                    >
                                      <div>
                                        <b>Employee:</b> {info.employeeId.name}
                                      </div>
                                      <div>
                                        <b>Email:</b> {info.employeeId.email}
                                      </div>
                                      <div>
                                        <b>Transferred to Desk:</b>{" "}
                                        {info.deskId.name}
                                      </div>
                                    </div>
                                  )
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

export default NotificationDetail;
