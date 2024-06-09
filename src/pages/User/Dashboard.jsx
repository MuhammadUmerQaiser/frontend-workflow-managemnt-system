import { useEffect, useMemo, useState } from "react";
import UserLayout from "../../components/User/UserLayout";
import {
  registerServiceWorker,
  requestPermission,
  fetchToken,
  onMessageListener,
} from "../../firebaseService";
import { AdminService } from "../../services/admin/admin.service";
import { useSnackbar } from "notistack";

const Dashboard = () => {
  const [associatedTaxPayers, setAssociatedTaxPayers] = useState([]);
  const [user, setUser] = useState([]);
  const userService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    registerServiceWorker();
    requestPermission();
    fetchToken();
    onMessageListener();
    getTheListOfTaxPayerAssociatedWithEmployee();
  }, []);

  const getTheListOfTaxPayerAssociatedWithEmployee = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-user-associated-tax-payer`;
      const response = await userService.getData(endpoint);
      if (response.status === 200) {
        setAssociatedTaxPayers(response?.data?.data);
        setUser(response?.data?.user);
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
                  <div className="col-xxl-12 col-md-12">
                    <div className="card">
                      {user?.associated ? (
                        <h5 className="card-header">
                          You are associated with {user?.associated?.name}
                        </h5>
                      ) : (
                        <h5 className="card-header">
                          You are not associated with any desk
                        </h5>
                      )}
                      <div className="card-body">
                        {associatedTaxPayers.length > 0 && (
                          <>
                            <h5 className="card-title">Tax Payer List</h5>
                            <ul className="list-group">
                              {associatedTaxPayers?.map((taxPayer, index) => (
                                <li className="list-group-item" key={index}>
                                  <div className="tax-payer-info">
                                    <div>
                                      <strong>Name:</strong> {taxPayer.name}
                                    </div>
                                    <div>
                                      <strong>Category:</strong>{" "}
                                      {taxPayer?.category?.name}
                                    </div>
                                    <div>
                                      <strong>Sub Category:</strong>{" "}
                                      {taxPayer?.sub_category?.name}
                                    </div>
                                    <div>
                                      <strong>National Tax Number:</strong>{" "}
                                      {taxPayer?.ntn}
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
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

export default Dashboard;
