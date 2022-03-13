import React from "react";
import ReactStars from "react-stars";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { CnpjName, Container, ButtonContainer, ButtonItem } from "./styles";
import moment from "moment";
import { useTheme } from "styled-components";
interface IAssessmentListItemProps {
  name: string;
  message: string;
  stars: number;
  date: Date;
  approved: boolean;
  onEdit: Function;
  onTrash: Function;
}

const AssessmentListItem: React.FC<IAssessmentListItemProps> = ({
  name,
  message,
  stars,
  date,
  approved,
  onEdit,
  onTrash,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <div>
        <CnpjName>{message}</CnpjName>
        <small>
          {name} | {moment(date).format("DD/MM/yyyy HH:mm")}
        </small>
        <small>
          <ReactStars
            edit={false}
            count={5}
            value={stars}
            onChange={() => {}}
            size={18}
            color2={theme.colors.green}
            color1={theme.colors.gray}
          />
        </small>
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

export default AssessmentListItem;
