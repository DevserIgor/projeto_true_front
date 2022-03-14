import React, { TextareaHTMLAttributes } from "react";

import { Container, InputContainer, Label } from "./styles";

type IInputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

const Input: React.FC<IInputProps> = ({ ...rest }) => (
  <Container>
    <Label>{rest.label}</Label>
    <InputContainer {...rest} />
  </Container>
);

export default Input;
