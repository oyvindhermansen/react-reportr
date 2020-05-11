import * as React from "react";
import {
  NotificationContextInterface,
  NotificationContext,
} from "./NotificationContext";

export default function useNotification(): NotificationContextInterface {
  const { notifications, spawn, despawn } = React.useContext(
    NotificationContext
  );

  return {
    notifications,
    spawn,
    despawn,
  };
}
