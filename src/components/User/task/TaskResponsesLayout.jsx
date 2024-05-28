import React, { useEffect, useMemo, useState } from "react";
import "../../../styles/task/task.css";
import { useSnackbar } from "notistack";
import { AdminService } from "../../../services/admin/admin.service";
import { isAuthenticated } from "../../../helpers/helpers";

const TaskResponseLayout = ({ taskAssignment, reciever }) => {
  const [newMessage, setNewMessage] = useState("");
  const [responseHistory, setResponseHistory] = useState([]);
  const user = isAuthenticated();
  const userService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();

  const getTheResponseHistory = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-response-history?reciever=${reciever?._id}&sender=${user.id}`;
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
  }, []);

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
        {responseHistory?.map((response) => (
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
            <div className="message-text">{response.response}</div>
          </div>
        ))}
      </div>
      {taskAssignment?.is_task_response && (
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

// // AddEmployeeForm.js
// import React, { useEffect, useMemo, useState } from "react";
// import "../../../styles/task/task.css";
// import { useSnackbar } from "notistack";
// import { AdminService } from "../../../services/admin/admin.service";
// import { isAuthenticated } from "../../../helpers/helpers";

// const TaskResponseLayout = ({ taskAssignment, reciever }) => {
//   const [newMessage, setNewMessage] = useState("");
//   const [responseHistory, setResponseHistory] = useState([]);
//   const user = isAuthenticated();
//   const userService = useMemo(() => new AdminService(), []);
//   const { enqueueSnackbar } = useSnackbar();

//   const getTheResponseHistory = async () => {
//     try {
//       const endpoint = `${process.env.REACT_APP_BACKEND_URL}/get-response-history?reciever=${reciever._id}&sender=${user.id}`;
//       const response = await userService.getData(endpoint);
//       console.log(response?.data?.data);
//       setResponseHistory(response?.data?.data)
//     } catch (error) {
//       enqueueSnackbar("An error occurred", {
//         variant: "error",
//         autoHideDuration: 2000,
//       });
//     }
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     console.log(user);
//     const data = {
//       response: newMessage,
//       task_assignment: taskAssignment._id,
//       sender: user.id,
//       reciever: reciever._id,
//     };
//     if (!newMessage) {
//       return;
//     }

//     try {
//       const endpoint = `${process.env.REACT_APP_BACKEND_URL}/initate-the-response-of-task-assignment/${taskAssignment._id}`;
//       const response = await userService.postData(endpoint, data);

//       if (response.status === 200) {
//         setNewMessage("");
//         enqueueSnackbar(response?.data?.message, {
//           variant: "success",
//           autoHideDuration: 2000,
//         });
//       }
//       if (
//         response?.response?.status === 500 ||
//         response?.response?.status === 400
//       ) {
//         enqueueSnackbar(response?.response?.data?.message, {
//           variant: "error",
//           autoHideDuration: 2000,
//         });
//       }
//     } catch (error) {
//       enqueueSnackbar("An error occurred", {
//         variant: "error",
//         autoHideDuration: 2000,
//       });
//     }
//   };

//   useEffect(() => {
//     console.log("taskAssignment========================", taskAssignment);
//     getTheResponseHistory();
//   }, []);
//   return (
//     <>
//       <div
//         className="chat-window"
//         style={{
//           height: "400px",
//           overflowY: "scroll",
//           padding: "10px",
//           border: "1px solid #ddd",
//           borderRadius: "5px",
//         }}
//       >
//         <div className="message message-receiver">
//           <div className="message-text">Hello, how are you?</div>
//         </div>
//         <div className="message message-sender">
//           <div className="message-text">I'm good, thanks! How about you?</div>
//         </div>
//         {/* <div className="task-transfer">
//           Task is transferred from User1 to User2
//         </div> */}
//         <div className="message message-receiver">
//           <div className="message-text">Great! I got the task details.</div>
//         </div>
//         <div className="message message-sender">
//           <div className="message-text">
//             Let me know if you need any help with it.
//           </div>
//         </div>
//       </div>
//       {taskAssignment?.is_task_response && (
//         <div className="message-input mt-3">
//           <div className="input-group">
//             <textarea
//               className="form-control"
//               placeholder="Type a message..."
//               rows="2"
//               style={{ resize: "none" }}
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             ></textarea>
//             <button
//               className="btn btn-primary"
//               type="button"
//               onClick={handleSendMessage}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TaskResponseLayout;
