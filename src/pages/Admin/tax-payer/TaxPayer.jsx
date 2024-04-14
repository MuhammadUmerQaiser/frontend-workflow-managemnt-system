/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../../../components/User/UserLayout";
import Table from "../../../components/common/table/Table";
import AddModal from "../../../components/common/modal/AddModal";
import EditModal from "../../../components/common/modal/EditModal";
import { AdminService } from "../../../services/admin/admin.service";
import { useSnackbar } from "notistack";
import { getCategories, getSubCategories } from "../../../services/global";

const TaxPayer = () => {
  const fields = [
    "_id",
    "name",
    "category-name",
    "sub_category-name",
    "action",
  ];
  const [taxPayers, setTaxPayers] = useState([]);
  const [taxPayerData, setTaxPayerData] = useState({
    name: "",
    category: "",
    sub_category: "",
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [editTaxPayerData, setEditTaxPayerData] = useState({});
  const [editTaxPayerFormData, setEditTaxPayerFormData] = useState({
    name: "",
    category: "",
    sub_category: "",
  });
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
    const { name, value } = e.target;
    if (name == "category") {
      getAllSubCategories(value);
    }
    setTaxPayerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name == "category") {
      getAllSubCategories(value);
    }
    setEditTaxPayerFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getAllTaxPayers = async () => {
    try {
      const endpoint = `${
        process.env.REACT_APP_BACKEND_URL
      }/get-all-tax-payers?page=${currentPage}&paginatedData=${true}`;
      const response = await adminService.getData(endpoint);
      if (response.status === 200) {
        setTaxPayers(response?.data?.data);
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

  const getAllSubCategories = async (categoryId) => {
    try {
      setSubCategories(await getSubCategories(categoryId));
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

  const deleteTaxPayer = async (id) => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/delete-tax-payer/${id}`;
      const response = await adminService.deleteData(endpoint, id);
      if (response.status === 200) {
        getAllTaxPayers();
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
            value={taxPayerData.name}
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
            value={taxPayerData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories?.map((category, index) => {
              return (
                <option value={category._id} key={index}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="domain" className="form-label">
            Sub Categories
          </label>
          <select
            className="form-select"
            name="sub_category"
            value={taxPayerData.sub_category}
            onChange={handleChange}
          >
            <option value="">Select Sub Category</option>
            {subCategories?.map((subCategory, index) => {
              return (
                <option value={subCategory._id} key={index}>
                  {subCategory.name}
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
            value={editTaxPayerFormData.name}
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
            value={editTaxPayerFormData.category}
            onChange={handleEditChange}
          >
            <option value="">Select Category</option>
            {categories?.map((category, index) => {
              return (
                <option value={category._id} key={index}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="domain" className="form-label">
            Sub Categories
          </label>
          <select
            className="form-select"
            name="sub_category"
            value={editTaxPayerFormData.sub_category}
            onChange={handleEditChange}
          >
            <option value="">Select Sub Category</option>
            {subCategories?.map((subCategory, index) => {
              return (
                <option value={subCategory._id} key={index}>
                  {subCategory.name}
                </option>
              );
            })}
          </select>
        </div>
      </form>
    );
  };

  const createTaxPayer = async (e) => {
    e.preventDefault();
    const { name, category, sub_category } = taxPayerData;

    if (!name || !category || !sub_category) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/create-tax-payer`;
      const response = await adminService.postData(endpoint, taxPayerData);

      if (response.status === 200) {
        getAllTaxPayers();
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        setTaxPayerData({ name: "", category: "", sub_category: "" });
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

  const editTaxPayer = async (e) => {
    e.preventDefault();
    const { name, category, sub_category } = editTaxPayerFormData;

    if (!name || !category || !sub_category) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
      });
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/update-tax-payer/${editTaxPayerData._id}`;
      const response = await adminService.putData(
        endpoint,
        editTaxPayerFormData
      );
      if (response.status === 200) {
        getAllTaxPayers();
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
    setEditTaxPayerData(data);
    setEditTaxPayerFormData({
      name: data.name,
      category: data.category._id,
      sub_category: data.sub_category._id,
    });
    getAllSubCategories(data.category._id)
  };

  useEffect(() => {
    getAllTaxPayers();
    getAllCategories();
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
