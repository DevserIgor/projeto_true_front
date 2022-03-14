import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { CnpjName, Container, ButtonContainer, ButtonItem } from "./styles";

interface ICardListItemProps {
  cnpj: string;
  name: string;
  domain: string;
  active: boolean;
  onEdit: Function;
  onTrash: Function;
}

const CardListItem: React.FC<ICardListItemProps> = ({
  cnpj,
  name,
  domain,
  active,
  onEdit,
  onTrash,
}) => (
  <Container>
    <div>
      <CnpjName>
        {cnpj} | {name}
      </CnpjName>
      <small>{domain}</small>
    </div>
    <ButtonContainer>
      <ButtonItem
        onClick={() => {
          if (onEdit) onEdit();
        }}
      >
        <FiEdit2 size={20} />
      </ButtonItem>
      <ButtonItem
        onClick={() => {
          if (onTrash) onTrash();
        }}
      >
        <FiTrash2 size={20} />
      </ButtonItem>
    </ButtonContainer>
  </Container>
);

export default CardListItem;
