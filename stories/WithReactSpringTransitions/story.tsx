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
import { useTransition, animated } from "react-spring";

const StyledCustom = styled(animated.div)<{ variant?: NotificationVariant }>`
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
  despawning,
}) => {
  /**
   For more info on react-spring transitions, see:
   https://www.react-spring.io/docs/hooks/use-transition
   */

  const transitions = useTransition(!despawning, null, {
    from: { transform: "translate3d(0,-100px,0)", opacity: 0.2 },
    enter: { transform: "translate3d(0,0px,0)", opacity: 1 },
    leave: { transform: "translate3d(0,-100px,0)", opacity: 0 },
  });

  return (
    <>
      {transitions.map(({ item, key, props }) => {
        return (
          item && (
            <StyledCustom style={props} key={key} variant={variant}>
              <p>👋 {title}</p>
              {subtitle && <small>{subtitle}</small>}
            </StyledCustom>
          )
        );
      })}
    </>
  );
};

export const NotificationStory = () => {
  const { spawn } = useNotification();

  return (
    <Wrapper>
      <Field>
        <Button onClick={() => spawn(randomizeNotification())}>
          Spawn notification
        </Button>
      </Field>
    </Wrapper>
  );
};

const App: React.FC = ({ children }) => {
  return (
    <NotificationProvider
      settings={{ customNotification: CustomNotificationComponent }}
    >
      {children}
    </NotificationProvider>
  );
};

storiesOf("Component/Notification", module).add(
  "WithReactSpringTransitions",
  () => (
    <App>
      <NotificationStory />
    </App>
  )
);
