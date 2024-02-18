import UserLayout from "../../components/User/UserLayout";

const Dashboard = () => {
  return (
    <>
      <UserLayout>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Dashboard</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </nav>
          </div>

          <section className="section dashboard">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-xxl-4 col-md-4">
                    <div className="card info-card sales-card">
                      <div className="card-body">
                        <h5 className="card-title">
                          Sales <span>| Today</span>
                        </h5>

                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-cart"></i>
                          </div>
                          <div className="ps-3">
                            <h6>145</h6>
                            <span className="text-success small pt-1 fw-bold">
                              12%
                            </span>
                            <span className="text-muted small pt-2 ps-1">
                              increase
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-md-4">
                    <div className="card info-card revenue-card">
                      <div className="card-body">
                        <h5 className="card-title">
                          Revenue <span>| This Month</span>
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-currency-dollar"></i>
                          </div>
                          <div className="ps-3">
                            <h6>$3,264</h6>
                            <span className="text-success small pt-1 fw-bold">
                              8%
                            </span>
                            <span className="text-muted small pt-2 ps-1">
                              increase
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4">
                    <div className="card info-card customers-card">
                      <div className="card-body">
                        <h5 className="card-title">
                          Customers <span>| This Year</span>
                        </h5>

                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-people"></i>
                          </div>
                          <div className="ps-3">
                            <h6>1244</h6>
                            <span className="text-danger small pt-1 fw-bold">
                              12%
                            </span>
                            <span className="text-muted small pt-2 ps-1">
                              decrease
                            </span>
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

export default Dashboard;
