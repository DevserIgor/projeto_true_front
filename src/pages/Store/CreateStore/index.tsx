import React, { useState } from "react";
import { create } from "services/StoreService";
import Form from "../Form";
import ContentHeader from "components/ContentHeader";

import { Container, Message } from "./styles";
import { useTheme } from "hooks/theme";
import { useHistory } from "react-router-dom";

type ResponseStore = {
  id?: string;
  name: string;
  cnpj: string;
  domain: string;
  active: boolean;
};
interface IRouteParams {
  match: {
    params: {
      id: string;
    };
  };
}

const CreateStore: React.FC<IRouteParams> = ({ match }) => {
  const { setLoading } = useTheme();
  const history = useHistory();

  const [message, setMessage] = useState("");

  const handleConfirm = async (formData: ResponseStore) => {
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
        title={"Criar Empresa"}
        lineColor={"#08f036"}
      ></ContentHeader>
      {message && <Message>{message}</Message>}
      <Form onConfirm={handleConfirm} onCancel={() => history.goBack()} />
    </Container>
  );
};

export default CreateStore;
