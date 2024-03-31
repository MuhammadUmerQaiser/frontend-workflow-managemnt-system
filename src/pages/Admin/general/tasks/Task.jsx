import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../../../../components/User/UserLayout";
import Table from "../../../../components/common/table/Table";
import AddModal from "../../../../components/common/modal/AddModal";
import EditModal from "../../../../components/common/modal/EditModal";
import { AdminService } from "../../../../services/admin/admin.service";
import { useSnackbar } from "notistack";

const Task = () => {
  const fields = ["_id", "name", "action"];
  const [tasks, setTasks] = useState([]);
  const [editTaskData, setEditTaskData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editTaskName, setEditTaskName] = useState("");
  const [name, setName] = useState("");
  const adminService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const getAllTasks = async () => {
    try {
      const endpoint = `${
        process.env.REACT_APP_BACKEND_URL
      }/get-all-tasks?page=${currentPage}&paginatedData=${true}`;
      const response = await adminService.getData(endpoint);
      if (response.status === 200) {
        setTasks(response?.data?.data);
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

  const deleteTask = async (id) => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/delete-task/${id}`;
      const response = await adminService.deleteData(endpoint, id);
      if (response.status === 200) {
        getAllTasks();
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
            Task
          </label>
          <textarea
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    );
  };

  const editModalForm = () => {
    return (
      <form className="row g-3" method="POST">
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Task
          </label>
          <textarea
            className="form-control"
            id="name"
            name="name"
            value={editTaskName}
            onChange={(e) => setEditTaskName(e.target.value)}
          ></textarea>
        </div>
      </form>
    );
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!name) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
        autoHideDuration: 2000,
      });
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/create-task`;
      const data = { name: name };
      const response = await adminService.postData(endpoint, data);
      if (response.status === 200) {
        getAllTasks();
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

  const editTask = async (e) => {
    e.preventDefault();
    if (!editTaskName) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
        autoHideDuration: 2000,
      });
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/update-task/${editTaskData._id}`;
      const data = { name: editTaskName };
      const response = await adminService.putData(endpoint, data);
      if (response.status === 200) {
        getAllTasks();
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
    setEditTaskData(data);
    setEditTaskName(data.name);
  };

  useEffect(() => {
    getAllTasks();
  }, [currentPage || tasks]);

  return (
    <>
      <UserLayout>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Tasks</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/admin/tasks">Tasks</Link>
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
                          <h5 className="card-title">Tasks</h5>
                          <button
                            className="btn btn-primary btn-sm mt-3"
                            data-bs-toggle="modal"
                            data-bs-target="#taskAddModalForm"
                          >
                            Add New Task
                          </button>
                        </div>
                        <div className="table-reponsive">
                          <Table
                            fields={fields}
                            data={tasks}
                            currentPage={currentPage}
                            itemsPerPage={pageSize}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                            deleteData={deleteTask}
                            editLink={"/admin/employee/edit"}
                            showViewButton={false}
                            editModalButton={true}
                            editModalButtonId={"taskEditModalForm"}
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
            modalId={"taskAddModalForm"}
            createItem={createTask}
            loading={loading}
          >
            {addModalForm()}
          </AddModal>
          <EditModal
            editModalId={"taskEditModalForm"}
            editItem={editTask}
            loading={loading}
          >
            {editModalForm()}
          </EditModal>
        </main>
      </UserLayout>
    </>
  );
};

export default Task;
