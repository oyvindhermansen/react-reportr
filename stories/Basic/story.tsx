import * as React from "react";
import styled, { css } from "styled-components";
import { storiesOf } from "@storybook/react";
import randomizeNotification from "../story-utils/randomizeNotification";
import { Wrapper, Button, Field } from "../story-utils/CommonComponents";
import {
  NotificationProvider,
  useNotification,
  NotificationStackInterface,
  NotificationVariant,
} from "../../lib";
import { StoryContext } from "../story-utils/StoryContext";

const StyledCustom = styled.div<{ variant?: NotificationVariant }>`
  box-sizing: border-box;
  background-color: #fff;
  min-width: 200px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;

  &:not(:last-child)  {
    margin-bottom: 0.5rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 0.4rem;
  }

  ${(props) =>
    props.variant === "info" &&
    css`
      color: blue;
    `};

  ${(props) =>
    props.variant === "success" &&
    css`
      color: green;
    `};

  ${(props) =>
    props.variant === "warning" &&
    css`
      color: orange;
    `};

  ${(props) =>
    props.variant === "danger" &&
    css`
      color: red;
    `};
`;

const CustomNotificationComponent: React.FC<NotificationStackInterface> = ({
  title,
  variant,
  subtitle,
}) => {
  return (
    <StyledCustom variant={variant}>
      <p>👋 {title}</p>
      {subtitle && <small>{subtitle}</small>}
    </StyledCustom>
  );
};

export const NotificationStory = () => {
  const { spawn } = useNotification();
  const { state, setState } = React.useContext(StoryContext);

  return (
    <Wrapper>
      <Field>
        <Button onClick={() => spawn(randomizeNotification())}>
          Spawn notification
        </Button>
      </Field>

      <Field>
        <label>
          Vertical direction
          <select
            onChange={(e) =>
              setState({ ...state, verticalDirection: e.target.value })
            }
          >
            <option value="" disabled selected>
              Choose
            </option>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
          </select>
        </label>
      </Field>
      <Field>
        <label>
          Horizontal direction
          <select
            onChange={(e) =>
              setState({ ...state, horizontalDirection: e.target.value })
            }
          >
            <option value="" disabled selected>
              Choose
            </option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </label>
      </Field>
      <Field>
        <label>
          Toggle usage of custom component for notification
          <input
            type="checkbox"
            onChange={(e) =>
              setState({
                ...state,
                customNotification: e.target.checked
                  ? CustomNotificationComponent
                  : undefined,
              })
            }
          />
        </label>
      </Field>
      <Field>
        <label>
          Despawn timer (ms)
          <input
            type="number"
            onChange={(e) =>
              setState({
                ...state,
                despawnTime: e.target.value === "" ? undefined : e.target.value,
              })
            }
          />
        </label>
      </Field>
    </Wrapper>
  );
};

const App: React.FC = ({ children }) => {
  const { state } = React.useContext(StoryContext);

  return (
    <NotificationProvider settings={state}>{children}</NotificationProvider>
  );
};

storiesOf("Component/Notification", module).add("Basic", () => (
  <App>
    <NotificationStory />
  </App>
));
