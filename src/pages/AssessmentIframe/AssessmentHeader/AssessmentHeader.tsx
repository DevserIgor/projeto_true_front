import Rating from "components/Rating";
import React from "react";

import {
  AmountContainer,
  AmountLabel,
  AmountValue,
  Container,
  DashContainer,
  Stars,
  StarsContainer,
  StarsText,
  Title,
} from "./styles";

interface IAssessmentHeader {
  average: number;
  amountAssessments: number;
}
const AssessmentHeader: React.FC<IAssessmentHeader> = ({
  average,
  amountAssessments,
}) => {
  return (
    <Container>
      <Title>Avaliações</Title>
      <DashContainer>
        <StarsContainer>
          <StarsText>Média de Avaliação:{average}</StarsText>
          <Stars>
            {" "}
            <Rating
              edit={false}
              count={5}
              value={average}
              size={20}
              color2={"#fecf0e"}
              color1={"#efefef"}
            />
          </Stars>
        </StarsContainer>
        <AmountContainer>
          <AmountValue>{amountAssessments}</AmountValue>
          <AmountLabel>avaliações</AmountLabel>
        </AmountContainer>
      </DashContainer>
    </Container>
  );
};

export default AssessmentHeader;
