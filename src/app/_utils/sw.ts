export function supportCheck() {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No service worker API!");
  }

  if (!("PushManager" in window)) {
    throw new Error("No push API!");
  }
}

export async function registerServiceWorker(url: string) {
  const worker = await navigator.serviceWorker.register(url);
  return worker;
}

export async function requestNotificationPermission() {
  const permission = await window.Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("permission is not granted");
  }

  return permission;
}
