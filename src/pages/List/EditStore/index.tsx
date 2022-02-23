import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getBydId, edit } from "services/StoreService";
import Form from "../Form";
import ContentHeader from "components/ContentHeader";

import { Container, Message } from "./styles";
import { useTheme } from "hooks/theme";
import { useHistory } from "react-router-dom";

type Store = {
  id: string;
  cnpj: string;
  name: string;
  domain: string;
  active: boolean;
};

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

const EditStore: React.FC<IRouteParams> = ({ match }) => {
  const { setLoading } = useTheme();
  const history = useHistory();

  const [message, setMessage] = useState("");
  const { id } = match.params;

  const { data, isFetching } = useQuery<ResponseStore>(
    "FormStore",
    async () => {
      return await getBydId(id);
    },
    {
      enabled: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
      retryOnMount: false,
      // keepPreviousData: true,
    }
  );
  // useEffect(() => {
  //   refetch();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    setLoading(isFetching);
  }, [isFetching, setLoading]);

  const handleConfirm = async (formData: ResponseStore) => {
    setLoading(true);
    try {
      setMessage("");
      await edit(id, formData);
      history.goBack();
    } catch (error) {
      setMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <Container>
      <ContentHeader
        title={"Editar Empresa"}
        lineColor={"#08f036"}
      ></ContentHeader>
      {message && <Message>{message}</Message>}
      <Form
        onConfirm={handleConfirm}
        onCancel={() => history.goBack()}
        data={data && data}
      />
    </Container>
  );
};

export default EditStore;
