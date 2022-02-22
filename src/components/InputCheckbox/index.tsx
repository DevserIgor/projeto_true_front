import React from "react";
import Input from "../Input";

import { Container } from "./styles";

type DataProps = {
  nameLabel?: string;
  active: boolean;
};

const InputCheckbox: React.FC<DataProps> = ({ nameLabel, active }) => (
  <Container>
    {nameLabel}
    <Input
      type="checkbox"
    />
    <span></span>
  </Container>
);

export default InputCheckbox;
