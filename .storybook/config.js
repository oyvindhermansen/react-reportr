import * as React from "react";
import { addDecorator, configure } from "@storybook/react";
import { StoryProvider } from "../stories/story-utils/StoryContext";

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("..", true, /story\.tsx?$/));
}

const withWrapper = (cb) => <StoryProvider>{cb()}</StoryProvider>;

addDecorator(withWrapper);
configure(loadStories, module);
