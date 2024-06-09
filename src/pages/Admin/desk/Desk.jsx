/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../../../components/User/UserLayout";
import Table from "../../../components/common/table/Table";
import AddModal from "../../../components/common/modal/AddModal";
import { AdminService } from "../../../services/admin/admin.service";
import { useSnackbar } from "notistack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Desk = () => {
  const fields = ["_id", "name", "action"];
  const [desks, setDesks] = useState([]);
  const [deskData, setDeskData] = useState({
    name: "",
    working_group: [],
  });
  const [employees, setEmployees] = useState([]);
  const [workingGroups, setWorkingGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const adminService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMuiSelectChange = async (name, value) => {
    const workingGroupIds = value.map((item) => item._id);
    const updatedGroups = deskData.working_group.filter((workingGroupId) =>
      workingGroupIds.includes(workingGroupId)
    );
    const newGroups = value
      .filter((item) => !deskData.working_group.includes(item._id))
      .map((item) => item._id);
    setDeskData((prev) => ({
      ...prev,
      working_group: [...updatedGroups, ...newGroups],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getAllDesks = async () => {
    try {
      const endpoint = `${
        process.env.REACT_APP_BACKEND_URL
      }/get-all-desks?page=${currentPage}&paginatedData=${true}`;
      const response = await adminService.getData(endpoint);
      if (response.status === 200) {
        setDesks(response?.data?.data);
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

  const getAllWorkingGroups = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-all-unassoicated-working-groups`;
      const response = await adminService.getData(endpoint);
      if (response.status === 200) {
        setWorkingGroups(response?.data?.data);
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
            value={deskData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="domain" className="form-label">
            Groups
          </label>
          <Autocomplete
            multiple
            id="tags-standard"
            options={workingGroups}
            getOptionLabel={(option) => option.name}
            style={{ width: 465 }}
            name="working_group"
            onChange={(event, value) =>
              handleMuiSelectChange("working_group", value)
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Group" variant="outlined" />
            )}
          />
        </div>
      </form>
    );
  };

  const createDesk = async (e) => {
    e.preventDefault();
    const { name, working_group } = deskData;

    if (!name || !working_group) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/create-desk`;
      const response = await adminService.postData(endpoint, deskData);

      if (response.status === 200) {
        getAllDesks();
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        setDeskData({
          name: "",
          working_group: [],
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

  useEffect(() => {
    getAllDesks();
    getAllWorkingGroups();
  }, [currentPage || workingGroups]);

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
                  <Link to="/admin/desk">Desks</Link>
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
                            id="addModalButton"
                            data-bs-toggle="modal"
                            data-bs-target="#taxPayerAddModalForm"
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
                            deleteModalButton={false}
                            editLink={"/admin/employee/edit"}
                            detailLink={"/admin/desk/detail"}
                            showViewButton={true}
                            editModalButton={false}
                            editButtonLink={false}
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
            createItem={createDesk}
            loading={loading}
          >
            {addModalForm()}
          </AddModal>
        </main>
      </UserLayout>
    </>
  );
};

export default Desk;
