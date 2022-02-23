import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getData, trash } from "services/StoreService";
import ContentHeader from "components/ContentHeader";

import { useHistory } from "react-router-dom";
import { Container, Content } from "./styles";
import BtnController from "components/BtnController";
import CardListItem from "components/CardListItem";
import Pagination from "components/Pagination";

import Swal from "sweetalert2";
import { useTheme } from "hooks/theme";
import Button from "components/Button";

type Store = {
  id: string;
  cnpj: string;
  name: string;
  domain: string;
  active: boolean;
};

type ResponseStore = {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number;
  next_page: number;
  last_page: number;
  data: Store[];
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

const Store: React.FC<IRouteParams> = ({ match }) => {
  const history = useHistory();
  const { setLoading } = useTheme();

  const [page, setPage] = useState(1);

  const { data, isFetching, refetch } = useQuery<ResponseStore>(
    ["ListStores", page],
    async () => {
      return await getData(page);
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
      <ContentHeader title={"Empresas"} lineColor={"#08f036"}>
        <Button onClick={() => history.push("/store/create")}>Inserir</Button>
      </ContentHeader>
      <Content>
        {data?.data.map((store, index) => {
          return (
            <CardListItem
              key={store.id}
              cnpj={store.cnpj}
              name={store.name}
              domain={store.domain}
              active={store.active}
              onEdit={() => {
                history.push(`/store/${store.id}`);
              }}
              onTrash={() => {
                handleDelete(store.id, index);
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

export default Store;
