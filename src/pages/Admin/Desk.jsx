/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../../components/User/UserLayout";
import Table from "../../components/common/table/Table";
import AddModal from "../../components/common/modal/AddModal";
import EditModal from "../../components/common/modal/EditModal";
import { AdminService } from "../../services/admin/admin.service";
import { useSnackbar } from "notistack";

const Desk = () => {
  const fields = ["_id", "name", "group", "groupname", "taxpayer", "action"];
  const [desks, setDesks] = useState([
    {
      _id: "65ce271d1b7023e463c48d2e",
      name: "IT",
      group: "Category",
      groupname: "Restaurant",
      taxpayer: "100",
    },
  ]);
  const [editDeskData, setEditDeskData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [editDeskName, setEditDeskName] = useState("");
  const adminService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const getAllDesks = async () => {};

  const deleteDesk = async (id) => {};

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
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Group By</label>
          <div className="form-check d-flex" style={{ gap: "40px" }}>
            <div>
              <input
                className="form-check-input"
                type="radio"
                name="member"
                value="individual"
              />
              <label className="form-check-label">Category</label>
            </div>
            <div>
              <input
                className="form-check-input"
                type="radio"
                name="member"
                value="group"
              />
              <label className="form-check-label">Sub Category</label>
            </div>
            <div>
              <input
                className="form-check-input"
                type="radio"
                name="member"
                value="group"
              />
              <label className="form-check-label">Group</label>
            </div>
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="domain" className="form-label">
            Categories
          </label>
          <select className="form-select" name="category">
            <option value="">Select Category</option>
            <option value="Restaurant">Restaurant</option>
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="domain" className="form-label">
            Tax Payer
          </label>
          <input type="number" className="form-control" name="name" required />
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
            value={editDeskName}
            onChange={(e) => setEditDeskName(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Group By</label>
          <div className="form-check d-flex" style={{ gap: "40px" }}>
            <div>
              <input
                className="form-check-input"
                type="radio"
                name="member"
                value="individual"
              />
              <label className="form-check-label">Category</label>
            </div>
            <div>
              <input
                className="form-check-input"
                type="radio"
                name="member"
                value="group"
              />
              <label className="form-check-label">Sub Category</label>
            </div>
            <div>
              <input
                className="form-check-input"
                type="radio"
                name="member"
                value="group"
              />
              <label className="form-check-label">Group</label>
            </div>
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="domain" className="form-label">
            Categories
          </label>
          <select className="form-select" name="category">
            <option value="">Select Category</option>
            <option value="Restaurant">Restaurant</option>
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="domain" className="form-label">
            Tax Payer
          </label>
          <input type="number" className="form-control" name="name" required />
        </div>
      </form>
    );
  };

  const createDesk = async (e) => {};

  const editDesk = async (e) => {};

  const handleRowDataOnEditClick = (data) => {
    setEditDeskData(data);
    setEditDeskName(data.name);
  };

  useEffect(() => {
    getAllDesks();
  }, [currentPage || desks]);

  return (
    <>
      <UserLayout>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Desk</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/admin/tax-payer">Desks</Link>
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
                          <h5 className="card-title">Desks</h5>
                          <button
                            className="btn btn-primary btn-sm mt-3"
                            data-bs-toggle="modal"
                            data-bs-target="#deskAddModalForm"
                          >
                            Add New Desk
                          </button>
                        </div>
                        <div className="table-reponsive">
                          <Table
                            fields={fields}
                            data={desks}
                            currentPage={currentPage}
                            itemsPerPage={pageSize}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                            deleteData={deleteDesk}
                            editLink={"/admin/employee/edit"}
                            showViewButton={false}
                            editModalButton={true}
                            editModalButtonId={"deskEditModalForm"}
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
            modalId={"deskAddModalForm"}
            createItem={createDesk}
            loading={loading}
          >
            {addModalForm()}
          </AddModal>
          <EditModal
            editModalId={"deskEditModalForm"}
            editItem={editDesk}
            loading={loading}
          >
            {editModalForm()}
          </EditModal>
        </main>
      </UserLayout>
    </>
  );
};

export default Desk;
