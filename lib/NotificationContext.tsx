import * as React from "react";
import * as uuid from "uuid";
import NotificationManager from "./NotificationManager";

export type NotificationVariant = "info" | "success" | "warning" | "danger";

export interface SpawnOpts {
  id?: string;
  title: string;
  subtitle?: string;
  variant?: NotificationVariant;
}

export interface NotificationStackInterface {
  id: string;
  title: string;
  subtitle?: string;
  variant?: NotificationVariant;
}

export interface NotificationContextInterface {
  notifications: NotificationStackInterface[];
  spawn: (opts: SpawnOpts) => void;
  despawn: (id: string) => void;
}

const NotificationContext = React.createContext<NotificationContextInterface>({
  notifications: [],
  spawn: (opts: SpawnOpts) => {},
  despawn: (id: string) => {},
});

export type VerticalDirectionType = "top" | "bottom";
export type HorizontalDirectionType = "left" | "right";

export interface ProviderSettings {
  despawnTime?: number;
  customNotification?: React.FC<NotificationStackInterface>;
  verticalDirection?: VerticalDirectionType;
  horizontalDirection?: HorizontalDirectionType;
}

export interface ProviderProps {
  settings?: ProviderSettings;
}

const NotificationProvider: React.FC<ProviderProps> = ({
  settings,
  children,
}) => {
  const [notifications, setNotifications] = React.useState<
    NotificationStackInterface[]
  >([]);

  const activeNotificationIds = notifications.map((n) => n.id).join(",");

  React.useEffect(() => {
    if (activeNotificationIds.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(notifications.slice(0, notifications.length - 1));
      }, (settings && settings.despawnTime) || 2400);
      return () => clearTimeout(timer);
    }

    return () => {};
  }, [activeNotificationIds, notifications]);

  const spawn = React.useCallback(
    (opts: SpawnOpts) => {
      if (settings && settings.verticalDirection === "bottom") {
        setNotifications([
          ...notifications,
          {
            id: opts.id || uuid.v4(),
            title: opts.title,
            subtitle: opts.subtitle,
            variant: opts.variant || "info",
          },
        ]);
      } else {
        setNotifications([
          {
            id: opts.id || uuid.v4(),
            title: opts.title,
            subtitle: opts.subtitle,
            variant: opts.variant || "info",
          },
          ...notifications,
        ]);
      }
    },
    [notifications]
  );

  const despawn = React.useCallback(
    (id: string) => {
      setNotifications(notifications.filter((n) => n.id !== id));
    },
    [notifications]
  );

  const providerValue = React.useMemo(() => {
    return {
      notifications,
      spawn,
      despawn,
    };
  }, [notifications, spawn, despawn]);

  return (
    <NotificationContext.Provider value={providerValue}>
      <NotificationManager
        notifications={notifications}
        CustomNotification={settings && settings.customNotification}
        verticalDirection={settings && settings.verticalDirection}
        horizontalDirection={settings && settings.horizontalDirection}
      />
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
