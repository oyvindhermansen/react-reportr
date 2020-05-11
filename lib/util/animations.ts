import { keyframes } from "styled-components";

export const FADE_IN = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const FADE_IN_TOP = keyframes`
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const FADE_IN_LEFT = keyframes`
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const FADE_IN_RIGHT = keyframes`
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const FADE_OUT_BOTTOM = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    transform: translateY(100px);
    opacity: 0;
  }
`;
