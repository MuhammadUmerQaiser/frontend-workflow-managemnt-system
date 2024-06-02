import React, { useState, useEffect, useMemo } from "react";
import UserLayout from "../../../components/User/UserLayout";
import { useSnackbar } from "notistack";
import { Link, useParams } from "react-router-dom";
import { AdminService } from "../../../services/admin/admin.service";

const WorkingGroupDetail = () => {
  const [workingGroup, setWorkingGroup] = useState({});
  const adminService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  useEffect(() => {
    getWorkingGroupDetailById();
  }, []);

  const getWorkingGroupDetailById = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-working-group/${params.workingGroupId}`;
      const response = await adminService.getData(endpoint);
      if (response.status === 200) {
        setWorkingGroup(response?.data?.data);
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
            <h1>Groups</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/admin/groups">Groups</Link>
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
                            <h5 className="card-title">Group Details</h5>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Name</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {workingGroup.name}
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Categories</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {workingGroup.category?.map(
                                  (category, index) => (
                                    <div
                                      key={index}
                                      className="badge bg-secondary me-2"
                                    >
                                      {category.name}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Sub Categories</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {workingGroup.sub_category?.map(
                                  (sub_category, index) => (
                                    <div
                                      key={index}
                                      className="badge bg-secondary me-2"
                                    >
                                      {sub_category.name}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Tax Payer</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {workingGroup.tax_payer?.map(
                                  (tax_payer, index) => (
                                    <div
                                      key={index}
                                      className="badge bg-secondary me-2"
                                    >
                                      {tax_payer.name}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col-lg-3 col-md-4 label">
                                <b>Associated</b>
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {workingGroup.associated
                                  ? `Group is associated with desk: ${workingGroup.associated.name}`
                                  : "Group is not associated with any desk"}
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

export default WorkingGroupDetail;
