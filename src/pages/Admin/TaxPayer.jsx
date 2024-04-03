/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../../components/User/UserLayout";
import Table from "../../components/common/table/Table";
import AddModal from "../../components/common/modal/AddModal";
import EditModal from "../../components/common/modal/EditModal";
import { AdminService } from "../../services/admin/admin.service";
import { useSnackbar } from "notistack";

const TaxPayer = () => {
  const fields = ["_id", "name", "category", "subcategory", "action"];
  const [taxPayers, setTaxPayers] = useState([
    {
      _id: "65ce271d1b7023e463c48d2e",
      name: "Tax Payer 1",
      category: "Restaurant",
      subcategory: "Catering Services",
    },
  ]);
  const [editTaxPayerData, setEditTaxPayerData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [editTaxPayerName, setEditTaxPayerName] = useState("");
  const adminService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const getAllTaxPayers = async () => {};

  const deleteTaxPayer = async (id) => {};

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
            Sub Categories
          </label>
          <select className="form-select" name="category">
            <option value="">Select Sub Category</option>
            <option value="Catering Services">Catering Services</option>
          </select>
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
            value={editTaxPayerName}
            onChange={(e) => setEditTaxPayerName(e.target.value)}
          />
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
            Sub Categories
          </label>
          <select className="form-select" name="category">
            <option value="">Select Sub Category</option>
            <option value="Catering Services">Catering Services</option>
          </select>
        </div>
      </form>
    );
  };

  const createTaxPayer = async (e) => {};

  const editTaxPayer = async (e) => {};

  const handleRowDataOnEditClick = (data) => {
    setEditTaxPayerData(data);
    setEditTaxPayerName(data.name);
  };

  useEffect(() => {
    getAllTaxPayers();
  }, [currentPage || taxPayers]);

  return (
    <>
      <UserLayout>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Tax Payer</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/admin/tax-payer">Tax Payers</Link>
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
                          <h5 className="card-title">Tax Payers</h5>
                          <button
                            className="btn btn-primary btn-sm mt-3"
                            data-bs-toggle="modal"
                            data-bs-target="#taxPayerAddModalForm"
                          >
                            Add New Tax Payer
                          </button>
                        </div>
                        <div className="table-reponsive">
                          <Table
                            fields={fields}
                            data={taxPayers}
                            currentPage={currentPage}
                            itemsPerPage={pageSize}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                            deleteData={deleteTaxPayer}
                            editLink={"/admin/employee/edit"}
                            showViewButton={false}
                            editModalButton={true}
                            editModalButtonId={"taxPayerEditModalForm"}
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
            modalId={"taxPayerAddModalForm"}
            createItem={createTaxPayer}
            loading={loading}
          >
            {addModalForm()}
          </AddModal>
          <EditModal
            editModalId={"taxPayerEditModalForm"}
            editItem={editTaxPayer}
            loading={loading}
          >
            {editModalForm()}
          </EditModal>
        </main>
      </UserLayout>
    </>
  );
};

export default TaxPayer;
