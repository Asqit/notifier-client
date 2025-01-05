import { useEffect, useState } from "react";
import {
  supportCheck,
  registerServiceWorker,
  requestNotificationPermission,
} from "../_utils/sw";

// i am drunk and I dont even know what am i thinking rn
// i just need to register the focking worker
export function useRegisterWorker(url: string) {
  const [permission, setPermission] = useState<string>();

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
        await registerServiceWorker(url);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [url]);

  return permission;
}
