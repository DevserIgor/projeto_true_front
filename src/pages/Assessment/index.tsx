import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getData, trash } from "services/AssessmentService";
import ContentHeader from "components/ContentHeader";

import { useHistory } from "react-router-dom";
import { Container, Content } from "./styles";
import AssessmentListItem from "./AssessmentListItem";
import Pagination from "components/Pagination";

import Swal from "sweetalert2";
import { useTheme } from "hooks/theme";
import Button from "components/Button";

type Assessment = {
  id: string;
  name: string;
  stars: number;
  message: string;
  date: string;
};

type ResponseAssessment = {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number;
  next_page: number;
  last_page: number;
  data: Assessment[];
};
interface IRouteParams {
  match: {
    params: {
      type: string;
    };
  };
}

const Assessment: React.FC<IRouteParams> = ({ match }) => {
  const history = useHistory();
  const { setLoading } = useTheme();

  const [page, setPage] = useState(1);

  const { data, isFetching, refetch } = useQuery<ResponseAssessment>(
    ["ListAssessment", page],
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
      <ContentHeader title={"Avaliações"} lineColor={"#08f036"}>
        <Button onClick={() => history.push("/assessment/create")}>
          Inserir
        </Button>
      </ContentHeader>
      <Content>
        {data?.data.map((assessment, index) => {
          return (
            <AssessmentListItem
              key={assessment.id}
              name={assessment.name}
              message={assessment.message}
              date={new Date(assessment.date)}
              stars={assessment.stars}
              onEdit={() => {
                history.push(`/assessment/${assessment.id}`);
              }}
              onTrash={() => {
                handleDelete(assessment.id, index);
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

export default Assessment;
