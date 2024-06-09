import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../../styles/task/task.css";
import { useSnackbar } from "notistack";
import { AdminService } from "../../../services/admin/admin.service";
import { isAuthenticated } from "../../../helpers/helpers";
import io from "socket.io-client";

const TaskResponseLayout = ({
  taskAssignment,
  reciever,
  allowResponseMessage = true,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseHistory, setResponseHistory] = useState([]);
  const fileInputRef = useRef(null);
  const user = isAuthenticated();
  const userService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();
  const socket = useMemo(() => io("http://localhost:5000"), []);

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
    // const data = {
    //   response: newMessage,
    //   task_assignment: taskAssignment._id,
    //   sender: user.id,
    //   reciever: reciever?._id,
    // };
    if (!newMessage && !selectedFile) {
      return;
    }

    const data = new FormData();
    data.append("response", newMessage);
    data.append("task_assignment", taskAssignment._id);
    data.append("sender", user.id);
    data.append("reciever", reciever?._id);
    if (selectedFile) {
      data.append("file", selectedFile);
    }

    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/initate-the-response-of-task-assignment/${taskAssignment._id}`;
      const response = await userService.postData(endpoint, data);

      if (response.status === 200) {
        setNewMessage("");
        setSelectedFile(null);
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        getTheResponseHistory();

        socket.emit("send-message", response.data.data);
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

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type.startsWith("image/") || file.type === "application/pdf")
    ) {
      setSelectedFile(file);
    } else {
      enqueueSnackbar("Please select a valid image or PDF file.", {
        variant: "error",
        autoHideDuration: 2000,
      });
      event.target.value = null;
      setSelectedFile(null);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const handleImageClick = (imageUrl) => {
    const newTab = window.open(imageUrl, "_blank");
    if (newTab) {
      newTab.focus();
    } else {
      window.location.href = imageUrl;
    }
  };

  useEffect(() => {
    getTheResponseHistory();
  }, [taskAssignment]);

  useEffect(() => {
    socket.on("receive-message", (message) => {
      getTheResponseHistory();
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

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
        {responseHistory?.map((response) => {
          if (response.type === "message") {
            const hasText =
              response.response && response.response.trim() !== "";
            const hasFileUrl =
              response.file_url && response.file_url.trim() !== "";
            const isImage = response.file_url?.match(/\.(jpeg|jpg|gif|png)$/i);
            const isPdf = response.file_url?.match(/\.(pdf)$/i);

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
                {hasText && (
                  <div className="message-text">{response.response}</div>
                )}
                {hasFileUrl && (
                  <div className="message-file">
                    {isImage && (
                      <img
                        src={response.file_url}
                        alt="Image"
                        onClick={() => handleImageClick(response.file_url)}
                      />
                    )}
                    {isPdf && (
                      <div className="message-file">
                        <a
                          href={response.file_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {`Open PDF: ${response.file}`}
                        </a>
                      </div>
                    )}
                  </div>
                )}
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

        {/* {responseHistory?.map((response) => {
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
        })} */}
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
            <i
              className="bi bi-paperclip"
              onClick={() => fileInputRef.current.click()}
              style={{ cursor: "pointer", fontSize: "24px", margin: "0 10px" }}
            ></i>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
          <div className="file-upload mt-2">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
            {selectedFile && (
              <div className="file-preview mt-2">
                <strong>Selected File:</strong> {selectedFile.name}
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleFileRemove}
                  style={{ marginLeft: "10px" }}
                >
                  <i
                    className="bi bi-x"
                    style={{ color: "red", fontSize: "24px" }}
                  ></i>
                </button>
                {selectedFile.type.startsWith("image/") && (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected file"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      marginTop: "10px",
                    }}
                  />
                )}
                {selectedFile.type === "application/pdf" && (
                  <embed
                    src={URL.createObjectURL(selectedFile)}
                    type="application/pdf"
                    width="100%"
                    height="200px"
                    style={{ marginTop: "10px" }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TaskResponseLayout;
