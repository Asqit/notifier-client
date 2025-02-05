const API_URL = "http://localhost:8000/subscription";
let userId = null;

// Promise to wait for userId to be set
let userIdPromiseResolve;
const userIdPromise = new Promise((resolve) => {
  userIdPromiseResolve = resolve;
});

/**
 * Converts a Base64 URL string to a Uint8Array.
 * @param {string} base64String - The Base64 URL string.
 * @returns {Uint8Array} The Uint8Array representation of the string.
 */
const urlB64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from(rawData, (char) => char.charCodeAt(0));
};

/**
 * Sends a subscription object to the server.
 * @param {PushSubscription} subscription - The subscription object to save.
 * @returns {Promise<Object>} The server's response.
 * @throws Will throw an error if the request fails.
 */
const saveSubscription = async (subscription) => {
  const endpoint = `${API_URL}/subscribe`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subscription, userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to save subscription.");
  }

  return response.json();
};

/**
 * Fetches the application server's public key.
 * @returns {Promise<string>} The public key as a Base64 URL string.
 * @throws Will throw an error if the request fails.
 */
const getApplicationServerKey = async () => {
  const response = await fetch(`${API_URL}/key`);

  if (!response.ok) {
    throw new Error("Failed to fetch the application server key.");
  }

  const { public_key } = await response.json();
  return public_key;
};

/**
 * Displays a local notification.
 * @param {string} title - The title of the notification.
 * @param {string} body - The body content of the notification.
 * @param {ServiceWorkerRegistration} swRegistration - The service worker registration.
 */
const showLocalNotification = (title, body, swRegistration) => {
  const options = { body };
  swRegistration.showNotification(title, options);
};

self.addEventListener("activate", async () => {
  console.log("Service worker activated.");

  try {
    // Wait for userId to be set
    await userIdPromise;

    if (!userId) {
      console.warn("User ID not set. Skipping subscription.");
      return;
    }

    const publicKey = await getApplicationServerKey();
    console.log(publicKey);
    const applicationServerKey = urlB64ToUint8Array(publicKey);

    const subscription = await self.registration.pushManager.subscribe({
      applicationServerKey,
      userVisibleOnly: true,
    });

    const response = await saveSubscription(subscription);
    console.log("Subscription saved:", response);
  } catch (error) {
    console.error("Error during activation:", error);
  }
});

self.addEventListener("push", (event) => {
  if (event.data) {
    console.log("Received push event:", event.data.text());
    showLocalNotification("Notification", event.data.text(), self.registration);
  } else {
    console.warn("Push event received with no data.");
  }
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SET_USER_ID") {
    userId = event.data.userId;
    console.log("User ID set to:", userId);
    userIdPromiseResolve(); // Resolve the promise when userId is set
  }
});
