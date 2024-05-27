import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserLayout from "../../../components/User/UserLayout";
import TaskResponsesLayout from "../../../components/User/task/TaskResponsesLayout";
import { AdminService } from "../../../services/admin/admin.service";
import { useSnackbar } from "notistack";

const UserTaskResponse = () => {
  const { taskAssignmentId } = useParams();
  const [taskAssignment, setTaskAssignment] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const userService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();

  const getTaskDetailById = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-task-assignment/${taskAssignmentId}`;
      const response = await userService.getData(endpoint);
      if (response.status === 200) {
        setTaskAssignment(response?.data?.data);
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleSendMessage = async () => {
    console.log(newMessage);
  };

  useEffect(() => {
    getTaskDetailById();
  }, [taskAssignmentId]);
  return (
    <>
      <UserLayout>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Task</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/user">Home</Link>
                </li>
                <li className="breadcrumb-item active">
                  Task Id: {taskAssignment?.task?._id}
                </li>
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
                        Task Room{" "}
                        <span className="card-title">
                          Assigned By:{" "}
                          {taskAssignment?.assignment_reference?.name} (Role:{" "}
                          {taskAssignment?.assignment_reference?.role})
                        </span>
                      </h5>
                      <TaskResponsesLayout
                        taskAssignment={taskAssignment}
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        handleSendMessage={handleSendMessage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </UserLayout>
    </>
  );
};

export default UserTaskResponse;
