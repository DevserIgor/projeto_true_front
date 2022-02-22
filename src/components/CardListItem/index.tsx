import React from "react";
import CheckBoxSwitch from "../CheckboxSwitch";
import InputCheckbox from "../InputCheckbox";
import Toggle from "../Toggle";

import { CnpjName, Container } from "./styles";

interface ICardListItemProps {
  cnpj: string;
  name: string;
  domain: string;
  active: boolean;
}

const CardListItem: React.FC<ICardListItemProps> = ({
  cnpj,
  name,
  domain,
  active,
}) => (
  <Container>
    <div>
      <CnpjName>
        {cnpj} | {name}
      </CnpjName>
      <small>{domain}</small>
    </div>
    <span>
      <CheckBoxSwitch checked={active} onChange={() => { }} />
    </span>
  </Container>
);

export default CardListItem;
