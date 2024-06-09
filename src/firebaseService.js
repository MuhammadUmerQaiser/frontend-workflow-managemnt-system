// src/firebaseService.js
import { messaging, getToken, onMessage } from "./firebase";
import { AdminService } from "./services/admin/admin.service";

const userService = new AdminService();

export const registerServiceWorker = async () => {
  try {
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );
    console.log("Service Worker registered successfully:", registration);
  } catch (error) {
    console.error("Service Worker registration failed:", error);
  }
};

export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission denied");
    }
  } catch (error) {
    console.error("Permission request error:", error);
  }
};

export const fetchToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BDcM1iOr5bitqgXtFGKUdL3jhFR6-LP88jIu2ABR1IR4BsnHEwqgrUGdo6zYFOWQq89oZTkhtzdg5sMc4fWDisM",
    });
    if (currentToken) {
      console.log("Token:", currentToken);
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/save-user-web-token-for-notification`;
      const response = await userService.postData(endpoint, {
        token: currentToken,
      });
    } else {
      console.log("No registration token available.");
    }
  } catch (error) {
    console.error("Token retrieval error:", error);
  }
};

export const onMessageListener = () => {
  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    if (Notification.permission === "granted") {
      const { title, body } = payload.notification;
      new Notification(title, { body });
    }
  });
};
