import * as React from "react";
import styled, { css } from "styled-components";
import {
  NotificationStackInterface,
  NotificationVariant,
  VerticalDirectionType,
  HorizontalDirectionType,
} from "./NotificationContext";
import {
  FADE_IN_RIGHT,
  FADE_IN_LEFT,
  FADE_OUT_BOTTOM,
} from "./util/animations";

const NotificationWrapper = styled.div<{
  verticalDirection?: VerticalDirectionType;
  horizontalDirection?: HorizontalDirectionType;
}>`
  position: fixed;
  top: 0;
  right: 0;

  ${(props) =>
    props.verticalDirection === "bottom" &&
    css`
      bottom: 0;
      top: initial;
    `};

  ${(props) =>
    props.horizontalDirection === "left" &&
    css`
      left: 0;
      right: initial;
    `};

  z-index: 5;
  display: flex;
  padding: 1rem;
  flex-direction: column;
`;
const StyledNotification = styled.div<{
  variant?: NotificationVariant;
  horizontalDirection?: HorizontalDirectionType;
  despawn?: boolean;
}>`
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  background: #fff;
  padding: 1rem 1rem;
  background-color: blue;
  color: #fff;
  font-family: sans-serif;
  border-radius: 5px;
  width: 20rem;
  display: flex;
  flex-direction: column;
  animation: ${FADE_IN_RIGHT} 0.24s 0.24s ease-out both;

  ${(props) =>
    props.horizontalDirection === "left" &&
    css`
      animation: ${FADE_IN_LEFT} 0.24s 0.24s ease-out both;
    `};

  ${(props) =>
    props.despawn &&
    css`
      animation: ${FADE_OUT_BOTTOM} 0.12s ease-out both;
    `};

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  ${(props) =>
    props.variant === "danger" &&
    css`
      background-color: red;
      color: #fff;
    `};

  ${(props) =>
    props.variant === "warning" &&
    css`
      background-color: orange;
      color: #222;
    `};
  ${(props) =>
    props.variant === "success" &&
    css`
      background-color: green;
      color: #fff;
    `};
`;

const NotificationTitle = styled.p`
  margin: 0;
`;

const NotificationInfo = styled.small`
  margin-top: 0.5rem;
`;

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
    <NotificationWrapper
      verticalDirection={verticalDirection}
      horizontalDirection={horizontalDirection}
    >
      {notifications.map((notification) => {
        console.log(notification);
        if (CustomNotification) {
          return <CustomNotification {...notification} />;
        }

        return (
          <StyledNotification
            variant={notification.variant}
            key={notification.id}
            horizontalDirection={horizontalDirection}
            despawn={notification.fadeOut}
          >
            <NotificationTitle>{notification.title}</NotificationTitle>
            {notification.subtitle && (
              <NotificationInfo>{notification.subtitle}</NotificationInfo>
            )}
          </StyledNotification>
        );
      })}
    </NotificationWrapper>
  );
};

export default NotificationManager;
