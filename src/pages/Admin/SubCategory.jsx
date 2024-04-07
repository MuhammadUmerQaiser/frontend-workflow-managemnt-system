/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../../components/User/UserLayout";
import Table from "../../components/common/table/Table";
import AddModal from "../../components/common/modal/AddModal";
import EditModal from "../../components/common/modal/EditModal";
import { AdminService } from "../../services/admin/admin.service";
import { useSnackbar } from "notistack";
import { getCategories } from "../../services/global";

const SubCategory = () => {
  const fields = ["_id", "name", "category-name", "action"];
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [editSubCategoryData, setEditSubCategoryData] = useState({});
  const [editSubCategoryFormData, setEditSubCategoryFormData] = useState({
    name: "",
    category: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const adminService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChange = (e) => {
    setSubCategoryData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditChange = (e) => {
    setEditSubCategoryFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getAllSubCategories = async () => {
    try {
      const endpoint = `${
        process.env.REACT_APP_BACKEND_URL
      }/get-all-sub-categories?page=${currentPage}&paginatedData=${true}`;
      const response = await adminService.getData(endpoint);
      if (response.status === 200) {
        setSubCategories(response?.data?.data);
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

  const getAllCategories = async () => {
    try {
      setCategories(await getCategories());
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const deleteSubCategory = async (id) => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/delete-sub-category/${id}`;
      const response = await adminService.deleteData(endpoint, id);
      if (response.status === 200) {
        getAllSubCategories();
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
            name="name"
            value={subCategoryData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="domain" className="form-label">
            Categories
          </label>
          <select
            className="form-select"
            name="category"
            value={subCategoryData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => {
              return (
                <option value={category._id} key={index}>
                  {category.name}
                </option>
              );
            })}
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
            value={editSubCategoryFormData.name}
            onChange={handleEditChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="domain" className="form-label">
            Categories
          </label>
          <select
            className="form-select"
            name="category"
            value={editSubCategoryFormData.category}
            onChange={handleEditChange}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => {
              return (
                <option value={category._id} key={index}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
      </form>
    );
  };

  const createSubCategory = async (e) => {
    e.preventDefault();
    const { name, category } = subCategoryData;

    if (!name || !category) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/create-sub-category`;
      const response = await adminService.postData(endpoint, subCategoryData);

      if (response.status === 200) {
        getAllSubCategories();
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        setSubCategoryData({ name: "", category: "" });
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

  const editSubCategory = async (e) => {
    e.preventDefault();
    const { name, category } = editSubCategoryFormData;

    if (!name || !category) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
      });
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/update-sub-category/${editSubCategoryData._id}`;
      const response = await adminService.putData(
        endpoint,
        editSubCategoryFormData
      );
      if (response.status === 200) {
        getAllSubCategories();
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
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
    setEditSubCategoryData(data);
    setEditSubCategoryFormData({
      name: data.name,
      category: data.category._id,
    });
  };

  useEffect(() => {
    getAllSubCategories();
    getAllCategories();
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
