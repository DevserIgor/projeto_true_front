import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getData, trash } from "services/UserService";
import ContentHeader from "components/ContentHeader";

import { useHistory } from "react-router-dom";
import { Container, Content } from "./styles";
import Pagination from "components/Pagination";

import Swal from "sweetalert2";
import { useTheme } from "hooks/theme";
import Button from "components/Button";
import UserListItem from "./UserListItem";
import Input from "components/Input";

type User = {
  id: string;
  name: string;
  email: string;
};

type ResponseUser = {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number;
  next_page: number;
  last_page: number;
  data: User[];
};
interface IRouteParams {
  match: {
    params: {
      type: string;
    };
  };
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const User: React.FC<IRouteParams> = ({ match }) => {
  const history = useHistory();
  const { setLoading } = useTheme();

  const [page, setPage] = useState(1);
  const [name, setName] = useState("");

  const { data, isFetching, refetch } = useQuery<ResponseUser>(
    ["ListUser", page, name],
    async () => {
      return await getData(page, name);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    setLoading(isFetching);
  }, [isFetching, setLoading]);

  const handleDelete = async (id: string, index: number) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Tem certeza que deseja excluir este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir registro!",
      cancelButtonText: "Não, cancelar!",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await trash(id);
        await refetch();
      } catch (error) {}
      setLoading(false);
    }
  };

  return (
    <Container>
      <ContentHeader title={"Usuários"} lineColor={"#08f036"}>
        <div style={{ display: "flex" }}>
          <Button onClick={() => history.push("/user/create")}>Inserir</Button>
        </div>
      </ContentHeader>
      <Content>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Pesquisar por nome..."
        />

        {data?.data.map((user, index) => {
          return (
            <UserListItem
              key={user.id}
              name={user.name}
              email={user.email}
              onEdit={() => {
                history.push(`/user/${user.id}`);
              }}
              onTrash={() => {
                handleDelete(user.id, index);
              }}
            />
          );
        })}
      </Content>
      <Pagination
        total={data?.last_page || 0}
        current={page}
        onChangePage={(page: number) => setPage(page)}
      />
    </Container>
  );
};

export default User;
