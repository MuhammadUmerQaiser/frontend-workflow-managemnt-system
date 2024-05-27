// AddEmployeeForm.js
import React, { useEffect } from "react";
import "../../../styles/task/task.css";

const TaskResponseLayout = ({
  taskAssignment,
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  useEffect(() => {
    console.log('taskAssignment========================', taskAssignment)
  }, [])
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
        {/* Chat messages will be rendered here */}
        <div className="message message-receiver">
          <div className="message-text">Hello, how are you?</div>
        </div>
        <div className="message message-sender">
          <div className="message-text">I'm good, thanks! How about you?</div>
        </div>
        <div className="task-transfer">
          Task is transferred from User1 to User2
        </div>
        <div className="message message-receiver">
          <div className="message-text">Great! I got the task details.</div>
        </div>
        <div className="message message-sender">
          <div className="message-text">
            Let me know if you need any help with it.
          </div>
        </div>
        {/* Add more messages as needed */}
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
