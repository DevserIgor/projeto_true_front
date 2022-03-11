import Rating from "components/Rating";
import React, { useState } from "react";

import {
  Container,
  FormGroup,
  InputName,
  MessageArea,
  Row,
  Title,
  ButtonConfirm,
  ButtonContainer,
  ErrorMessage,
} from "./styles";

interface IData {
  name: string;
  message: string;
  stars: number;
}

interface IFormProps {
  onConfirm(data: IData): any;
}
const AssessmentForm: React.FC<IFormProps> = ({ onConfirm }) => {
  const [name, setName] = useState("");
  const [stars, setStars] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    setError("");
    try {
      if (!name) throw "Digite seu nome";
      if (!stars) throw "Selecione o número de estrelas da avaliação";
      if (!message) throw "Digite a sua opinião";
      onConfirm({ name, stars, message });
    } catch (error) {
      setError(error);
    }
  };
  return (
    <Container>
      <Row>
        <Title>Qual é a sua opinião sobre o produto?</Title>
      </Row>
      <Row>{!!error && <ErrorMessage>{error}</ErrorMessage>}</Row>
      <Row>
        <FormGroup>
          <InputName
            placeholder="Qual é o seu nome?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Rating
            labelColor="#757575"
            leftLabel="Muito Ruim"
            rightLabel="Muito Bom"
            half={false}
            count={5}
            value={stars}
            onChange={setStars}
            size={25}
            color2={"#fecf0e"}
            color1={"#efefef"}
          />
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <MessageArea
            placeholder="Digite sua opinião"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormGroup>
      </Row>
      <ButtonContainer>
        <ButtonConfirm onClick={handleConfirm}>Enviar Avaliação</ButtonConfirm>
      </ButtonContainer>
    </Container>
  );
};

export default AssessmentForm;
