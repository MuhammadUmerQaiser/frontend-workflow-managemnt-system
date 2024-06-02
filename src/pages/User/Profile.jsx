import React from "react";
import UserLayout from "../../components/User/UserLayout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../helpers/helpers";

const Profile = () => {
  const user = isAuthenticated();
  return (
    <>
      <UserLayout>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Profile</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={`/${user.role == 'Admin' ? 'admin' : 'user'}`}>Home</Link>
                </li>
                <li className="breadcrumb-item active">Profile</li>
              </ol>
            </nav>
          </div>
          <section className="section profile">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body pt-3">
                    <ul className="nav nav-tabs nav-tabs-bordered">
                      <li className="nav-item">
                        <button
                          className="nav-link active"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-overview"
                        >
                          Overview
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content pt-2">
                      <div
                        className="tab-pane fade show active profile-overview"
                        id="profile-overview"
                      >
                        <h5 className="card-title">Profile Details</h5>

                        <div className="row">
                          <div className="col-lg-3 col-md-4 label ">
                            Full Name
                          </div>
                          <div className="col-lg-9 col-md-8">{user.name}</div>
                        </div>

                        <div className="row">
                          <div className="col-lg-3 col-md-4 label">Role</div>
                          <div className="col-lg-9 col-md-8">{user.role}</div>
                        </div>

                        <div className="row">
                          <div className="col-lg-3 col-md-4 label">Email</div>
                          <div className="col-lg-9 col-md-8">{user.email}</div>
                        </div>

                        {user.role != "Admin" && (
                          <>
                            <div className="row">
                              <div className="col-lg-3 col-md-4 label">
                                Domain
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {user.domain}
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-lg-3 col-md-4 label">
                                Designation
                              </div>
                              <div className="col-lg-9 col-md-8">
                                {user.designation}
                              </div>
                            </div>
                          </>
                        )}
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

export default Profile;
