import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserLayout from "../../../components/User/UserLayout";
import TaskResponsesLayout from "../../../components/User/task/TaskResponsesLayout";
import { AdminService } from "../../../services/admin/admin.service";
import { useSnackbar } from "notistack";

const AdminTaskResponse = () => {
  const { taskId } = useParams();
  const [taskAssignments, setTaskAssignments] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const [reciever, setReciever] = useState(null);
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
    setSelectedTab(index);
    setReciever(assignment.assigned_to)
  }

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
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </UserLayout>
  );
};

export default AdminTaskResponse;
