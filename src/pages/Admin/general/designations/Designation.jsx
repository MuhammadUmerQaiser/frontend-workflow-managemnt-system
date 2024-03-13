/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../../../../components/User/UserLayout";
import Table from "../../../../components/common/table/Table";
import AddModal from "../../../../components/common/modal/AddModal";
import EditModal from "../../../../components/common/modal/EditModal";
import { AdminService } from "../../../../services/admin/admin.service";
import { useSnackbar } from "notistack";

const Designation = () => {
  const fields = ["_id", "name", "active", "action"];
  const [designations, setDesignations] = useState([
    { _id: "1", name: "Designation 1" },
  ]);
  const [editDesignationData, setEditDesignationData] = useState({
    name: "",
    isActive: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [designationData, setDesignationData] = useState({
    name: "",
    isActive: false,
  });
  const adminService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChange = (e) => {
    setDesignationData({
      ...designationData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  const handleEditChange = (e) => {
    setEditDesignationData({
      ...editDesignationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxEditChange = (e) => {
    setEditDesignationData({
      ...editDesignationData,
      [e.target.name]: e.target.checked,
    });
  };
  const getAllDesignations = async () => {
    try {
      const endpoint = `${
        process.env.REACT_APP_BACKEND_URL
      }/get-all-designations?page=${currentPage}&paginatedData=${true}`;
      const response = await adminService.getData(endpoint);
      if (response.status === 200) {
        setDesignations(response?.data?.data);
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

  const deleteDesignation = async (id) => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/delete-designation/${id}`;
      const response = await adminService.deleteData(endpoint, id);
      if (response.status === 200) {
        getAllDesignations();
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
            value={designationData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Active
          </label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={designationData.isActive}
              name="isActive"
              onChange={handleChange}
            />
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
            required
            value={editDesignationData.name}
            onChange={handleEditChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Active
          </label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={editDesignationData.isActive}
              onChange={handleCheckboxEditChange}
              name="isActive"
            />
          </div>
        </div>
      </form>
    );
  };

  const createDesignation = async (e) => {
    e.preventDefault();
    if (!designationData.name) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
        autoHideDuration: 2000,
      });
      setLoading(false);
      console.log("create", designationData);
      setLoading(true);
      return;
    }
    try {
      setLoading(true);
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/create-designation`;
      // const data = { name: name };
      const response = await adminService.postData(endpoint, designationData);
      if (response.status === 200) {
        getAllDesignations();
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        setDesignationData({
          name: "",
          isActive: false,
        });
        //close the modal
        const addModalCloseButton = document.getElementById(
          "addModalCloseButton"
        );
        if (addModalCloseButton) {
          addModalCloseButton.click();
        }
      }
      if (response?.response?.status === 500) {
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

  const editDesignation = async (e) => {
    e.preventDefault();
    if (!editDesignationData.name) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
        autoHideDuration: 2000,
      });
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/update-designation/${editDesignationData._id}`;
      // const data = { name: editDomainName };
      const response = await adminService.putData(
        endpoint,
        editDesignationData
      );
      if (response.status === 200) {
        getAllDesignations();
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        setEditDesignationData({
          name: "",
          isActive: false,
        });
        //close the modal
        const editModalCloseButton = document.getElementById(
          "editModalCloseButton"
        );
        if (editModalCloseButton) {
          editModalCloseButton.click();
        }
      }
      if (response?.response?.status === 500) {
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

  const handleRowDataOnEditClick = (data) => {
    setEditDesignationData(data);
  };

  useEffect(() => {
    getAllDesignations();
  }, [currentPage || designations]);
  return (
    <>
      <UserLayout>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Designations</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/admin/designations">Designations</Link>
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
                          <h5 className="card-title">Designations</h5>
                          <button
                            className="btn btn-primary btn-sm mt-3"
                            data-bs-toggle="modal"
                            data-bs-target="#designationAddModalForm"
                          >
                            Add New Designation
                          </button>
                        </div>
                        <div className="table-reponsive">
                          <Table
                            fields={fields}
                            data={designations}
                            currentPage={currentPage}
                            itemsPerPage={pageSize}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                            deleteData={deleteDesignation}
                            editLink={"/admin/employee/edit"}
                            showViewButton={false}
                            editModalButton={true}
                            editModalButtonId={"designationEditModalForm"}
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
            modalId={"designationAddModalForm"}
            createItem={createDesignation}
            loading={loading}
          >
            {addModalForm()}
          </AddModal>
          <EditModal
            editModalId={"designationEditModalForm"}
            editItem={editDesignation}
            loading={loading}
          >
            {editModalForm()}
          </EditModal>
        </main>
      </UserLayout>
    </>
  );
};

export default Designation;
