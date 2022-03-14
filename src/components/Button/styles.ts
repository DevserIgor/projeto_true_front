import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "green" | "success" | "info" | "warning" | "white" | "gray";
}
export const Container = styled.button<IButtonProps>`
  width: 100%;

  margin: 7px 0;
  padding: 10px;

  border-radius: 5px;

  font-weight: bold;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.green};

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;
