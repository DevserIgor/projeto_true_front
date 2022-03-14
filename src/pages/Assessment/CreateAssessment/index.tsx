import React, { useState } from "react";
import { create } from "services/AssessmentService";
import Form from "../Form";
import ContentHeader from "components/ContentHeader";

import { Container, Message } from "./styles";
import { useTheme } from "hooks/theme";
import { useHistory } from "react-router-dom";
type ResponseAssessment = {
  id?: string;
  name: string;
  message: string;
  date: Date;
  stars: number;
};
interface IRouteParams {
  match: {
    params: {
      id: string;
    };
  };
}

const CreateAssessment: React.FC<IRouteParams> = ({ match }) => {
  const { setLoading } = useTheme();
  const history = useHistory();

  const [message, setMessage] = useState("");

  const handleConfirm = async (formData: ResponseAssessment) => {
    setLoading(true);
    try {
      setMessage("");
      await create(formData);
      history.goBack();
    } catch (error) {
      setMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <Container>
      <ContentHeader
        title={"Criar Avaliação"}
        lineColor={"#08f036"}
      ></ContentHeader>
      {message && <Message>{message}</Message>}
      <Form onConfirm={handleConfirm} onCancel={() => history.goBack()} />
    </Container>
  );
};

export default CreateAssessment;
