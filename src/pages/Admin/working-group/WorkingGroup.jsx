/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../../../components/User/UserLayout";
import Table from "../../../components/common/table/Table";
import AddModal from "../../../components/common/modal/AddModal";
import EditModal from "../../../components/common/modal/EditModal";
import { AdminService } from "../../../services/admin/admin.service";
import { useSnackbar } from "notistack";
import {
  getCategories,
  getTaxPayersBasedOnMultipleCategoriesAndSubCategories,
  getAllSubCategoriesBasedOnMultipleCategoires,
} from "../../../services/global";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ListModal from "../../../components/common/modal/ListModal";

const WorkingGroup = () => {
  const fields = [
    "_id",
    "name",
    "category-name",
    "sub_category-name",
    "action",
  ];
  const [taxPayers, setTaxPayers] = useState([]);
  const [workingGroupData, setWorkingGroupData] = useState({
    name: "",
    category: [],
    sub_category: [],
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

  const handleMuiSelectChange = async (name, value) => {
    if (name === "category") {
      const categoryIds = value.map((item) => item._id);
      const updatedCategories = workingGroupData.category.filter((categoryId) =>
        categoryIds.includes(categoryId)
      );
      const newCategories = value
        .filter((item) => !workingGroupData.category.includes(item._id))
        .map((item) => item._id);
      setWorkingGroupData((prev) => ({
        ...prev,
        category: [...updatedCategories, ...newCategories],
      }));
      getAllSubCategories(categoryIds);
    } else if (name === "sub_category") {
      const subCategoryIds = value.map((item) => item._id);
      const updatedSubCategories = workingGroupData.sub_category.filter(
        (subCategoryId) => subCategoryIds.includes(subCategoryId)
      );
      const newSubCategories = value
        .filter((item) => !workingGroupData.sub_category.includes(item._id))
        .map((item) => item._id);
      setWorkingGroupData((prev) => ({
        ...prev,
        sub_category: [...updatedSubCategories, ...newSubCategories],
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkingGroupData((prev) => ({
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
      setTaxPayers(
        await getTaxPayersBasedOnMultipleCategoriesAndSubCategories(
          workingGroupData.category,
          workingGroupData.sub_category
        )
      );
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const getAllSubCategories = async (categories) => {
    try {
      setSubCategories(
        await getAllSubCategoriesBasedOnMultipleCategoires(categories)
      );
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
        // getAllTaxPayers();
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
            value={workingGroupData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="domain" className="form-label">
            Categories
          </label>
          <Autocomplete
            multiple
            id="tags-standard"
            options={categories}
            getOptionLabel={(option) => option.name}
            name="category"
            onChange={(event, value) =>
              handleMuiSelectChange("category", value)
            }
            style={{ width: 465 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Category"
                variant="outlined"
              />
            )}
          />
        </div>
        <div className="col-12">
          <label htmlFor="domain" className="form-label">
            Sub Categories
          </label>
          <Autocomplete
            multiple
            id="tags-standard"
            options={subCategories}
            groupBy={(option) => option.category.name}
            getOptionLabel={(option) => option.name}
            style={{ width: 465 }}
            name="sub_category"
            onChange={(event, value) =>
              handleMuiSelectChange("sub_category", value)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Sub Category"
                variant="outlined"
              />
            )}
          />
        </div>
        <div className="col-12">
          <div
            className="btn btn-secondary btn-sm mt-3"
            data-bs-toggle="modal"
            data-bs-target="#addTaxPayerModal"
            onClick={getAllTaxPayers}
          >
            Add Tax Payer
          </div>
        </div>
      </form>
    );
  };

  const taxPayerList = () => {
    return (
      <div className="row g-3 mb-5">
        <div className="col-12">
          <label htmlFor="domain" className="form-label">
            Tax Payer
          </label>
          <Autocomplete
            multiple
            id="tags-standard"
            options={taxPayers}
            groupBy={(option) => option.sub_category.name}
            getOptionLabel={(option) => option.name}
            style={{ width: 465 }}
            name="sub_category"
            onChange={(event, value) =>
              handleMuiSelectChange("sub_category", value)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Sub Category"
                variant="outlined"
              />
            )}
          />
        </div>
      </div>
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
          {/* <select
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
          </select> */}
        </div>
      </form>
    );
  };

  const createTaxPayer = async (e) => {
    e.preventDefault();
    const { name, category, sub_category } = workingGroupData;

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
      const response = await adminService.postData(endpoint, workingGroupData);

      if (response.status === 200) {
        // getAllTaxPayers();
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        setWorkingGroupData({ name: "", category: "", sub_category: "" });
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
        // getAllTaxPayers();
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
    getAllSubCategories(data.category._id);
  };

  const handleTaxPayerModalClosing = () => {
    const addModalOpen = document.getElementById("addModalButton");
    if (addModalOpen) {
      addModalOpen.click();
    }
  };

  useEffect(() => {
    // getAllTaxPayers();
    getAllCategories();
  }, [currentPage || taxPayers]);

  return (
    <>
      <UserLayout>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Working Groups</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/admin/groups">Working Groups</Link>
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
                          <h5 className="card-title">Working Groups</h5>
                          <button
                            className="btn btn-primary btn-sm mt-3"
                            id="addModalButton"
                            data-bs-toggle="modal"
                            data-bs-target="#taxPayerAddModalForm"
                          >
                            Add New Group
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
          <ListModal
            listModalId={"addTaxPayerModal"}
            onRequestClose={handleTaxPayerModalClosing}
          >
            {taxPayerList()}
          </ListModal>
        </main>
      </UserLayout>
    </>
  );
};

export default WorkingGroup;
