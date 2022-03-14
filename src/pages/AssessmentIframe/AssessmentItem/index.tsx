import Rating from "components/Rating";
import moment from "moment";
import React from "react";

import {
  Container,
  NameContainer,
  StarContainer,
  MessageContainer,
  NameText,
  StarValue,
  DateText,
  StarNote,
  StarTitle,
} from "./styles";

interface IAssessmentItem {
  id: string;
  name: string;
  stars: number;
  message: string;
  date: Date;
  created_at?: Date;
  updated_at?: Date;
}

const AssessmentItem: React.FC<IAssessmentItem> = ({
  id,
  name,
  stars,
  message,
  date,
}) => {
  return (
    <Container>
      <NameContainer>
        <NameText>{name}</NameText>
        <DateText>{moment(date).format("DD/MM/yyyy")}</DateText>
        <StarValue>
          <Rating
            edit={false}
            count={5}
            value={stars}
            size={20}
            color2={"#fecf0e"}
            color1={"#efefef"}
          />
        </StarValue>
      </NameContainer>
      <StarContainer>
        <StarTitle>Nota</StarTitle>
        <StarNote>{stars}</StarNote>
      </StarContainer>
      <MessageContainer>{message}</MessageContainer>
    </Container>
  );
};

export default AssessmentItem;
