import React, { InputHTMLAttributes } from "react";

import { Container, InputContainer, Label } from "./styles";

type IInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input: React.FC<IInputProps> = ({ ...rest }) => (
  <Container>
    <Label>{rest.label}</Label>
    <InputContainer {...rest} />
  </Container>
);

export default Input;
