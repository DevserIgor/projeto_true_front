import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getProfile, updateProfile } from "services/UserService";
import Form from "./Form";
import ContentHeader from "components/ContentHeader";

import { Container, Message } from "./styles";
import { useTheme } from "hooks/theme";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

type ResponseUser = {
  id?: string;
  name: string;
  email: string;
  oldPassword?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
};
interface IRouteParams {
  match: {
    params: {
      id: string;
    };
  };
}

const UserProfile: React.FC<IRouteParams> = ({ match }) => {
  const { setLoading } = useTheme();
  const history = useHistory();

  const [message, setMessage] = useState("");

  const { data, isFetching } = useQuery<ResponseUser>(
    "FormUser",
    async () => {
      return await getProfile();
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

  useEffect(() => {
    setLoading(isFetching);
  }, [isFetching, setLoading]);

  const handleConfirm = async (formData: ResponseUser) => {
    setLoading(true);
    try {
      setMessage("");
      await updateProfile(formData);
      setLoading(false);

      const result = await Swal.fire({
        title: "Sucesso",
        text: "Perfil alterado com sucesso",
        icon: "success",
      });
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

export default UserProfile;
