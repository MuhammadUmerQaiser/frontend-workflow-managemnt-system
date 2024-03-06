import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../../../../components/User/UserLayout";
import Table from "../../../../components/common/table/Table";
import AddModal from "../../../../components/common/modal/AddModal";
import EditModal from "../../../../components/common/modal/EditModal";

const Domain = () => {
  const fields = ["_id", "name", "action"];
  const [domains, setDomains] = useState([{ _id: "1", name: "Domain 1" }]);
  const [editDomainData, setEditDomainData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [editDomainName, setEditDomainName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getAllDomains = async () => {
    try {
      const endpoint = `${
        process.env.REACT_APP_BACKEND_URL
      }/get-all-domains?page=${currentPage}&paginatedData=${true}`;
      const response = await adminService.getData(endpoint);
      if (response.status == 200) {
        setRoles(response?.data?.data);
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


  const deleteDomain = async (id) => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/delete-domain/${id}`;
      const response = await adminService.deleteData(endpoint, id);
      if (response.status === 200) {
        getAllDomains();
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
    console.log("delete");
  };

  const addModalForm = () => {
    return (
      <form className="row g-3" method="POST">
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Active
          </label>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" />
          </div>
        </div>
      </form>
    );
  };

  const editModalForm = () => {
    return (
      <form className="row g-3" method="POST">
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={editDomainName}
            onChange={(e) => setEditDomainName(e.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Active
          </label>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" />
          </div>
        </div>
      </form>
    );
  };

  const createDomain = async (e) => {
    e.preventDefault();
    if (!name) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
        autoHideDuration: 2000,
      });
      setLoading(false);
    console.log("create");
    setLoading(true);
    return;
    }
    try {
      setLoading(true);
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/create-domain`;
      const data = { name: name };
      const response = await adminService.postData(endpoint, data);
      if (response.status == 200) {
        getAllRoles();
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        setName("");
        //close the modal
        const addModalCloseButton = document.getElementById(
          "addModalCloseButton"
        );
        if (addModalCloseButton) {
          addModalCloseButton.click();
        }
      }
      if (response?.response?.status == 500) {
        enqueueSnackbar(response?.response?.data?.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };


  const editDomain = async (e) => {
    e.preventDefault();
    if (!editDomainName) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
        autoHideDuration: 2000,
      });
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/update-domain/${editDomainData._id}`;
      const data = { name: editDomainName };
      const response = await adminService.putData(endpoint, data);
      if (response.status == 200) {
        getAllDomains();
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        setName("");
        //close the modal
        const editModalCloseButton = document.getElementById(
          "editModalCloseButton"
        );
        if (editModalCloseButton) {
          editModalCloseButton.click();
        }
      }
      if (response?.response?.status == 500) {
        enqueueSnackbar(response?.response?.data?.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } finally {
      setLoading(true);
    }
  };

  const handleRowDataOnEditClick = (data) => {
    setEditDomainData(data);
    setEditRoleName(data.name);
  };
  
  useEffect(() => {
    getAllDomains();
  }, [currentPage || domains]);

  return (
    <>
      <UserLayout>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Domains</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/admin/domains">Domains</Link>
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
                          <h5 className="card-title">Domains</h5>
                          <button
                            className="btn btn-primary btn-sm mt-3"
                            data-bs-toggle="modal"
                            data-bs-target="#domainAddModalForm"
                          >
                            Add New Domain
                          </button>
                        </div>
                        <div className="table-reponsive">
                          <Table
                            fields={fields}
                            data={domains}
                            currentPage={currentPage}
                            itemsPerPage={pageSize}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                            deleteData={deleteDomain}
                            editLink={"/admin/employee/edit"}
                            showViewButton={false}
                            editModalButton={true}
                            editModalButtonId={"domainEditModalForm"}
                            handleRowDataOnEditClick={handleRowDataOnEditClick}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <AddModal
            modalId={"domainAddModalForm"}
            createItem={createDomain}
            loading={loading}
          >
            {addModalForm()}
          </AddModal>
          <EditModal
            editModalId={"domainEditModalForm"}
            editItem={editDomain}
            loading={loading}
          >
            {editModalForm()}
          </EditModal>
        </main>
      </UserLayout>
    </>
  );
};


export default Domain;
