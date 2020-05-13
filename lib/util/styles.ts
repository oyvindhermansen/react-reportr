import { CSSProperties } from "react";
import {
  VerticalDirectionType,
  HorizontalDirectionType,
  NotificationVariant,
} from "../NotificationContext";

interface INotificationWrapper {
  verticalDirection?: VerticalDirectionType;
  horizontalDirection?: HorizontalDirectionType;
}

export const notificationWrapperStyles = ({
  verticalDirection,
  horizontalDirection,
}: INotificationWrapper): CSSProperties => {
  const verticalPositioner =
    verticalDirection === "bottom"
      ? { top: "initial", bottom: "0" }
      : { bottom: "initial", top: "0" };
  const horizontalPositioner =
    horizontalDirection === "left"
      ? { left: "0", right: "initial" }
      : { left: "initial", right: "0" };

  return {
    position: "fixed",
    zIndex: 999,
    display: "flex",
    padding: "1rem",
    flexDirection: "column",
    ...verticalPositioner,
    ...horizontalPositioner,
  };
};

interface INotificationElement {
  variant?: NotificationVariant;
}

const calculateVariant = (
  variant?: NotificationVariant
): { backgroundColor: string; color: string } => {
  const variantStyles = {
    backgroundColor: "blue",
    color: "#fff",
  };

  switch (variant) {
    case "success":
      variantStyles.backgroundColor = "green";
      variantStyles.color = "#fff";
      break;
    case "warning":
      variantStyles.backgroundColor = "orange";
      variantStyles.color = "#222";
      break;
    case "danger":
      variantStyles.backgroundColor = "red";
      variantStyles.color = "#fff";
      break;
  }

  return variantStyles;
};

export const notificationElementStyles = ({
  variant,
}: INotificationElement): CSSProperties => {
  const colorVariants = calculateVariant(variant);

  return {
    boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",
    background: "#fff",
    padding: "1rem",
    fontFamily: "sans-serif",
    borderRadius: "5px",
    width: "20rem",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.1s ease-in-out",
    marginBottom: "0.5rem",
    ...colorVariants,
  };
};

export const notificationTitleStyles = (): CSSProperties => {
  return {
    margin: 0,
    fontSize: "1.2rem",
  };
};

export const notificationSubtitleStyles = (): CSSProperties => {
  return {
    marginTop: "0.5rem",
  };
};
