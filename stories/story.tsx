import * as React from "react";
import { storiesOf } from "@storybook/react";
import useNotification from "../lib/useNotification";

function randomizeContent(): any {
  const selections = [
    {
      title: "Info",
      subtitle: "This is some more info",
      variant: "info",
    },
    {
      title: "Success",
      subtitle: "This is some more info",
      variant: "success",
    },
    {
      title: "Warning",
      subtitle: "This is some more info",
      variant: "warning",
    },
    {
      title: "Danger",
      subtitle: "This is some more info",
      variant: "danger",
    },
  ];

  const randomIndex = Math.floor(Math.random() * selections.length);

  return selections[randomIndex];
}

export const NotificationStory = () => {
  const { spawn } = useNotification();

  return (
    <div>
      <button onClick={() => spawn(randomizeContent())}>
        Spawn notification
      </button>
    </div>
  );
};

storiesOf("Component/Notification", module).add("Basic usage", () => (
  <NotificationStory />
));
