import * as React from "react";
import { addDecorator, configure } from "@storybook/react";
import { NotificationProvider } from "../lib/NotificationContext";

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("..", true, /story\.tsx?$/));
}

/*
const CustomNotification = (notification) => {
  return <NotificationProvider>{notification.title}</NotificationProvider>;
};
*/

const settings = {
  despawnTime: 3000,
};

const withWrapper = (cb) => (
  <NotificationProvider settings={settings}>{cb()}</NotificationProvider>
);

addDecorator(withWrapper);
configure(loadStories, module);
