import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getBydId, edit } from "services/UserService";
import Form from "../Form";
import ContentHeader from "components/ContentHeader";

import { Container, Message } from "./styles";
import { useTheme } from "hooks/theme";
import { useHistory } from "react-router-dom";

type ResponseUser = {
  id?: string;
  name: string;
  email: string;
  password?: string;
};
interface IRouteParams {
  match: {
    params: {
      id: string;
    };
  };
}

const EditUser: React.FC<IRouteParams> = ({ match }) => {
  const { setLoading } = useTheme();
  const history = useHistory();

  const [message, setMessage] = useState("");
  const { id } = match.params;

  const { data, isFetching } = useQuery<ResponseUser>(
    "FormUser",
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

  const handleConfirm = async (formData: ResponseUser) => {
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
        title={"Editar Usuário"}
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

export default EditUser;
