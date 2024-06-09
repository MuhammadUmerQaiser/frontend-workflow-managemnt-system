// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyDwwfySXG5TPz7DHP-TwtGdgIgqGZk-cjE",
    authDomain: "sindh-revenue-board.firebaseapp.com",
    projectId: "sindh-revenue-board",
    storageBucket: "sindh-revenue-board.appspot.com",
    messagingSenderId: "182600282982",
    appId: "1:182600282982:web:813c5c71250a8562994ea7",
    measurementId: "G-P7M9M6SBZD",
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/srb.png' 
    // icon: '/logo192.png' 
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
