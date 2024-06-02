import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserLayout from "../../../components/User/UserLayout";
import TaskResponsesLayout from "../../../components/User/task/TaskResponsesLayout";
import { AdminService } from "../../../services/admin/admin.service";
import { useSnackbar } from "notistack";
import AddModal from "../../../components/common/modal/AddModal";

const AdminTaskResponse = () => {
  const { taskId } = useParams();
  const [taskAssignments, setTaskAssignments] = useState([]);
  const [allowResponseMessage, setAllowResponseMessage] = useState(true);
  const [selectedTab, setSelectedTab] = useState(null);
  const [reason, setReason] = useState(null);
  const [reciever, setReciever] = useState(null);
  const [loading, setLoading] = useState(false);
  const userService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();

  const getListOfTaskAssignmentOnBasisOfTask = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-task-assignment-by-task/${taskId}`;
      const response = await userService.getData(endpoint);
      if (response.status === 200) {
        const assignments = response?.data?.data;
        setTaskAssignments(assignments);
        if (assignments.length === 1) {
          setSelectedTab(0);
          setReciever(response?.data?.data[0].assigned_to);
          if (response?.data?.data[0].close_assignment_request == "accepted") {
            setAllowResponseMessage(false);
          } else {
            setAllowResponseMessage(true);
          }
        }
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleSelectedTab = (index, assignment) => {
    console.log(assignment);
    setSelectedTab(index);
    setReciever(assignment.assigned_to);
    if (assignment?.close_assignment_request == "accepted") {
      setAllowResponseMessage(false);
    } else {
      setAllowResponseMessage(true);
    }
  };

  const rejectionRequestModalForm = () => {
    return (
      <form className="row g-3" method="POST">
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Reason
          </label>
          <input
            type="text"
            className="form-control"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            name="name"
            required
          />
        </div>
      </form>
    );
  };

  const handleTaskCloseRequest = async (e, status = "rejected") => {
    e.preventDefault();
    const data = {
      task_close_request_status: status,
      reason: reason,
    };
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/update-the-request-status-for-close-task/${taskAssignments[selectedTab]?._id}`;
      const response = await userService.postData(endpoint, data);

      if (response.status === 200) {
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        getListOfTaskAssignmentOnBasisOfTask();
        setReason(null);
        const addModalCloseButton = document.getElementById(
          "addModalCloseButton"
        );
        if (addModalCloseButton && status == "rejected") {
          addModalCloseButton.click();
        }
      }
      if (
        response?.response?.status === 500 ||
        response?.response?.status === 400
      ) {
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
    }
  };

  useEffect(() => {
    getListOfTaskAssignmentOnBasisOfTask();
  }, [taskId]);

  return (
    <UserLayout>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Task</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/user">Home</Link>
              </li>
              <li className="breadcrumb-item active">Task Id: {taskId}</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-12">
              <div className="container mt-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      Task Room
                      {/* {taskAssignments.length > 0 && selectedTab !== null && (
                        <span className="card-title">
                          Assigned By:{" "}
                          {
                            taskAssignments[selectedTab]?.assignment_reference
                              ?.name
                          }{" "}
                          (Role:{" "}
                          {
                            taskAssignments[selectedTab]?.assignment_reference
                              ?.role
                          }
                          )
                        </span>
                      )} */}
                    </h5>
                    {selectedTab !== null &&
                    taskAssignments[selectedTab] &&
                    taskAssignments[selectedTab]?.close_assignment_request ===
                      "pending" ? (
                      <div className="mb-3">
                        <button
                          className="btn btn-success btn-sm"
                          style={{ marginRight: "10px" }}
                          onClick={(e) => handleTaskCloseRequest(e, "accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#rejectionModalForCloseTaskAssignment"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      taskAssignments[selectedTab]?.close_assignment_request ===
                        "accepted" && (
                        <div className="mb-3">
                          <span className="text-success">
                            Task has been closed.
                          </span>
                        </div>
                      )
                    )}

                    <ul className="nav nav-tabs">
                      {taskAssignments.map((assignment, index) => (
                        <li className="nav-item" key={index}>
                          <button
                            className={`nav-link ${
                              index === selectedTab ? "active" : ""
                            }`}
                            onClick={() => handleSelectedTab(index, assignment)}
                          >
                            {assignment.assigned_to.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                    {selectedTab !== null && taskAssignments[selectedTab] && (
                      <TaskResponsesLayout
                        taskAssignment={taskAssignments[selectedTab]}
                        reciever={reciever}
                        allowResponseMessage={allowResponseMessage}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <AddModal
          modalId={"rejectionModalForCloseTaskAssignment"}
          createItem={handleTaskCloseRequest}
          loading={loading}
          heading={"Reject Request"}
        >
          {rejectionRequestModalForm()}
        </AddModal>
      </main>
    </UserLayout>
  );
};

export default AdminTaskResponse;
