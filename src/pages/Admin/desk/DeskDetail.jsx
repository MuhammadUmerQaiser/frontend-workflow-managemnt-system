import React, { useState, useEffect, useMemo } from "react";
import UserLayout from "../../../components/User/UserLayout";
import { useSnackbar } from "notistack";
import { Link, useParams } from "react-router-dom";
import { AdminService } from "../../../services/admin/admin.service";

const DeskDetail = () => {
  const [deskDetail, setDeskDetail] = useState({});
  const adminService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  useEffect(() => {
    getDeskDetailByid();
  }, []);

  const getDeskDetailByid = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-desk/${params.deskId}`;
      const response = await adminService.getData(endpoint);
      if (response.status === 200) {
        setDeskDetail(response?.data?.data);
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
            <h1>Desks</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/admin/desk">Desks</Link>
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
                            <h5 className="card-title">Desk Details</h5>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Name</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {deskDetail.name}
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Groups</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                These are the groups associated with this desk{" "}
                                <br />
                                {deskDetail.working_group?.map(
                                  (group, index) => (
                                    <div
                                      key={index}
                                      className="badge bg-secondary me-2"
                                    >
                                      {group.name}
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

export default DeskDetail;
