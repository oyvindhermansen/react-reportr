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
  fadeOut?: boolean;
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

  const internalNotifications = React.useRef(notifications);
  internalNotifications.current = notifications;

  const deswpawnerFn = React.useCallback((id: string) => {
    setNotifications(internalNotifications.current.filter((n) => n.id !== id));
  }, []);

  const queueDespawn = React.useCallback(
    (id: string) => {
      setNotifications(
        internalNotifications.current.map((n) => {
          if (n.id === id) {
            n.fadeOut = true;
          }

          return n;
        })
      );

      window.setTimeout(() => {
        deswpawnerFn(id);
      }, 240);
    },
    [deswpawnerFn]
  );

  const spawn = React.useCallback(
    (opts: SpawnOpts) => {
      const id = opts.id || uuid.v4();
      const newNotification = {
        id,
        title: opts.title,
        subtitle: opts.subtitle,
        variant: opts.variant || "info",
        fadeOut: false,
      };

      if (settings && settings.verticalDirection === "bottom") {
        setNotifications([...notifications, newNotification]);
      } else {
        setNotifications([newNotification, ...notifications]);
      }

      if (!opts.id) {
        window.setTimeout(() => {
          queueDespawn(id);
        }, (settings && settings.despawnTime) || 2400);
      }
    },
    [notifications]
  );

  function despawn(id: string) {
    setNotifications(
      notifications.map((n) => {
        if (n.id === id) {
          n.fadeOut = true;
        }

        return n;
      })
    );

    window.setTimeout(() => {
      deswpawnerFn(id);
    }, 240);
  }

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
