/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../../components/User/UserLayout";
import Table from "../../components/common/table/Table";
import AddModal from "../../components/common/modal/AddModal";
import EditModal from "../../components/common/modal/EditModal";
import { AdminService } from "../../services/admin/admin.service";
import { useSnackbar } from "notistack";

const SubCategory = () => {
  const fields = ["_id", "name", "category", "action"];
  const [subCategories, setSubCategories] = useState([
    {
      _id: "65ce271d1b7023e463c48d2e",
      name: "Catering Services",
      category: "Restaurant",
    },
  ]);
  const [editSubCategoryData, setEditSubCategoryData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [editSubCategoryName, setEditSubCategoryName] = useState("");
  const adminService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const getAllSubCategories = async () => {};

  const deleteSubCategory = async (id) => {};

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
            value={editSubCategoryName}
            onChange={(e) => setEditSubCategoryName(e.target.value)}
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
      </form>
    );
  };

  const createSubCategory = async (e) => {};

  const editSubCategory = async (e) => {};

  const handleRowDataOnEditClick = (data) => {
    setEditSubCategoryData(data);
    setEditSubCategoryName(data.name);
  };

  useEffect(() => {
    getAllSubCategories();
  }, [currentPage || subCategories]);

  return (
    <>
      <UserLayout>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Categories</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/admin/sub-categories">Sub Categories</Link>
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
                          <h5 className="card-title">Sub Categories</h5>
                          <button
                            className="btn btn-primary btn-sm mt-3"
                            data-bs-toggle="modal"
                            data-bs-target="#subCategoryAddModalForm"
                          >
                            Add New Sub Category
                          </button>
                        </div>
                        <div className="table-reponsive">
                          <Table
                            fields={fields}
                            data={subCategories}
                            currentPage={currentPage}
                            itemsPerPage={pageSize}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                            deleteData={deleteSubCategory}
                            editLink={"/admin/employee/edit"}
                            showViewButton={false}
                            editModalButton={true}
                            editModalButtonId={"subCategoryEditModalForm"}
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
            modalId={"subCategoryAddModalForm"}
            createItem={createSubCategory}
            loading={loading}
          >
            {addModalForm()}
          </AddModal>
          <EditModal
            editModalId={"subCategoryEditModalForm"}
            editItem={editSubCategory}
            loading={loading}
          >
            {editModalForm()}
          </EditModal>
        </main>
      </UserLayout>
    </>
  );
};

export default SubCategory;
