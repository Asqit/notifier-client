import { useEffect, useState } from "react";
import {
  supportCheck,
  registerServiceWorker,
  requestNotificationPermission,
} from "../_utils/sw";

export function useRegisterWorker(
  url: string,
): [ServiceWorkerRegistration, string] {
  const [permission, setPermission] = useState<string>();
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>();

  useEffect(() => {
    (async () => {
      try {
        supportCheck();
      } catch {
        console.error("not supported");
      }

      try {
        const permission = await requestNotificationPermission();
        setPermission(permission);
      } catch (err) {
        console.error(err);
      }

      try {
        const registration = await registerServiceWorker(url);

        setRegistration(registration);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [url]);

  return [registration, permission];
}
