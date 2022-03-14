import React, { SelectHTMLAttributes } from "react";

import { Container, InputContainer, Label } from "./styles";

type Option = {
  value: any;
  description: any;
};
type IInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  data: Option[];
};

const Select: React.FC<IInputProps> = ({ ...rest }) => (
  <Container>
    <Label>{rest.label}</Label>
    <InputContainer {...rest}>
      {rest.data.map((item) => (
        <option key={item.value} value={item.value}>
          {item.description}
        </option>
      ))}
    </InputContainer>
  </Container>
);

export default Select;
