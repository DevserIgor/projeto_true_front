import React from "react";
import { BallTriangle } from "react-loader-spinner";
import { Container } from "./styles";

const Loading: React.FC = () => {
  return (
    <Container>
      <BallTriangle color="#08f036" height={80} width={80} />
    </Container>
  );
};

export default Loading;

