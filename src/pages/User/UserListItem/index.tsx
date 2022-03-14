import React from "react";
import ReactStars from "react-stars";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { NameContainer, Container, ButtonContainer, ButtonItem } from "./styles";
import moment from "moment";
import { useTheme } from "styled-components";
interface IUserListItemProps {
  name: string;
  email: string;
  onEdit: Function;
  onTrash: Function;
}

const UserListItem: React.FC<IUserListItemProps> = ({
  name,
  email,
  onEdit,
  onTrash,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <div>
        <NameContainer>{name}</NameContainer>
        <small>{email}</small>
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
};

export default UserListItem;
