import React, { ButtonHTMLAttributes } from "react";

import { Container } from "./styles";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "green" | "success" | "info" | "warning" | "white" | "gray";
}

const Button: React.FC<IButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>{children}</Container>
);

export default Button;
