import React, { useEffect, useMemo, useState } from "react";
import "../../../styles/task/task.css";
import { useSnackbar } from "notistack";
import { AdminService } from "../../../services/admin/admin.service";
import { isAuthenticated } from "../../../helpers/helpers";

const TaskResponseLayout = ({
  taskAssignment,
  reciever,
  allowResponseMessage = true,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [responseHistory, setResponseHistory] = useState([]);
  const user = isAuthenticated();
  const userService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();

  const getTheResponseHistory = async () => {
    try {
      // const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-response-history?reciever=${reciever?._id}&sender=${user.id}`;
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-response-history/${taskAssignment._id}?reciever=${reciever?._id}&sender=${user.id}`;
      const response = await userService.getData(endpoint);
      setResponseHistory(response?.data?.data);
    } catch (error) {
      console.log(error);
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const data = {
      response: newMessage,
      task_assignment: taskAssignment._id,
      sender: user.id,
      reciever: reciever?._id,
    };
    if (!newMessage) {
      return;
    }

    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/initate-the-response-of-task-assignment/${taskAssignment._id}`;
      const response = await userService.postData(endpoint, data);

      if (response.status === 200) {
        setNewMessage("");
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        getTheResponseHistory();
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
    getTheResponseHistory();
  }, [taskAssignment]);

  return (
    <>
      <div
        className="chat-window"
        style={{
          height: "400px",
          overflowY: "scroll",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        {/* {responseHistory?.map((response) => ( */}
        {responseHistory?.map((response) => {
          if (response.type === "message") {
            return (
              <div
                key={response._id}
                className={`message ${
                  response.sender.role === "Admin"
                    ? user.role === "Admin"
                      ? "message-sender"
                      : "message-receiver"
                    : user.role !== "Admin"
                    ? "message-sender"
                    : "message-receiver"
                }`}
              >
                <div className="message-user">{response.sender.name}</div>
                <div className="message-text">{response.response}</div>
              </div>
            );
          } else if (response.type === "transfer") {
            return (
              <div className="task-transfer" key={response._id}>
                {response.response}
              </div>
            );
          }
          return null;
        })}
        {/* ))} */}
      </div>
      {allowResponseMessage && (
        <div className="message-input mt-3">
          <div className="input-group">
            <textarea
              className="form-control"
              placeholder="Type a message..."
              rows="2"
              style={{ resize: "none" }}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskResponseLayout;
