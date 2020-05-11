import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Button = styled.button`
  font-family: sans-serif;
  font-size: 1.25rem;
  font-weight: bold;
  border-radius: 3px;
  background-color: salmon;
  color: #fff;
  padding: 1.5rem 2.5rem;
  box-sizing: border-box;
  border: 0;
  cursor: pointer;
`;

export const Field = styled.div`
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;
