import * as React from "react";
import {
  NotificationStackInterface,
  VerticalDirectionType,
  HorizontalDirectionType,
} from "./NotificationContext";

import {
  notificationWrapperStyles,
  notificationElementStyles,
  notificationTitleStyles,
  notificationSubtitleStyles,
} from "./util/styles";

interface Props {
  notifications: NotificationStackInterface[];
  CustomNotification?: React.FC<NotificationStackInterface>;
  verticalDirection?: VerticalDirectionType;
  horizontalDirection?: HorizontalDirectionType;
}

const NotificationManager: React.FC<Props> = ({
  notifications,
  CustomNotification,
  verticalDirection,
  horizontalDirection,
}) => {
  if (notifications.length === 0) return null;

  return (
    <div
      style={notificationWrapperStyles({
        verticalDirection,
        horizontalDirection,
      })}
    >
      {notifications.map((notification) => {
        if (CustomNotification) {
          return <CustomNotification key={notification.id} {...notification} />;
        }

        return (
          <div
            key={notification.id}
            role="alert"
            style={notificationElementStyles({
              variant: notification.variant,
            })}
          >
            <h2 style={notificationTitleStyles()}>{notification.title}</h2>
            {notification.subtitle && (
              <small style={notificationSubtitleStyles()}>
                {notification.subtitle}
              </small>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NotificationManager;
