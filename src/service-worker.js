importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '664523256006',
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  const { title, options } = payload.data;

  if (title && options) {
    return self.registration.showNotification(title, JSON.parse(options));
  }
});

self.addEventListener('notificationclick', (event) => {
  const { notification } = event;

  if (notification) {
    const url = handleUrl(notification.data.click_action);

    if (url && url.href && clients && clients.openWindow) {
      clients.openWindow(url.href);
    }

    notification.close();
  }
});

function handleUrl(url) {
  try {
    return new URL(url);
  } catch (err) {
    return null;
  }
}
