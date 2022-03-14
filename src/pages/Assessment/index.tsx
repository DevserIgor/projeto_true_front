import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { approveAssessment, getData, trash } from "services/AssessmentService";
import ContentHeader from "components/ContentHeader";

import { useHistory } from "react-router-dom";
import {
  Container,
  ContainerInputWithHorizontalMargin,
  ContainerInputWithMarginLeft,
  ContainerInputWithMarginRight,
  Content,
  FormGroup,
} from "./styles";
import AssessmentListItem from "./AssessmentListItem";
import Pagination from "components/Pagination";

import Swal from "sweetalert2";
import { useTheme } from "hooks/theme";
import Button from "components/Button";
import Input from "components/Input";
import moment from "moment";
import Select from "components/Select";

type Assessment = {
  id: string;
  name: string;
  stars: number;
  message: string;
  date: string;
  approved: boolean;
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

  const [stars, setStars] = useState<number | undefined>();
  const [avaliador, setAvaliador] = useState("");
  const [from, setFrom] = useState<Date | undefined>();
  const [to, setTo] = useState<Date | undefined>();
  const [status, setStatus] = useState<number>(0);

  const { data, isFetching, refetch } = useQuery<ResponseAssessment>(
    ["ListAssessment", page, avaliador, from, to, stars, status],
    async () => {
      let approved = undefined;
      if (status === 1) approved = false;
      if (status === 2) approved = true;
      return await getData(page, {
        name: avaliador,
        dateStart: from && moment(from).format("yyyy-MM-DD"),
        dateEnd: to && moment(to).format("yyyy-MM-DD"),
        stars: stars && stars > 0 ? stars : undefined,
        approved,
      });
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    setLoading(isFetching);
  }, [isFetching, setLoading]);

  const handleStars = (param: string) => {
    const value = Number(param || "0");
    if (!value || value <= 0) {
      setStars(undefined);
    }

    if (value <= 5) {
      setStars(value);
    }
  };

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
  const handleCheck = async (id: string, index: number) => {
    const result = await Swal.fire({
      title: "Confirmar",
      text: "Confirmar aprovação da avaliação?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, confirmar!",
      cancelButtonText: "Não, cancelar!",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await approveAssessment(id, true);
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
        <FormGroup>
          <ContainerInputWithMarginRight>
            <Input
              label="Avaliador"
              value={avaliador}
              onChange={(e) => setAvaliador(e.target.value)}
              placeholder="Pesquisar por avaliador..."
            />
          </ContainerInputWithMarginRight>
          <ContainerInputWithHorizontalMargin>
            <Input
              label="Nota"
              value={stars}
              type="number"
              onChange={(e) => handleStars(e.target.value)}
              placeholder="Pesquisar por nota..."
            />
          </ContainerInputWithHorizontalMargin>
          <ContainerInputWithHorizontalMargin>
            <Input
              style={{ padding: "8px" }}
              label="De"
              value={from ? moment(from).format("yyyy-MM-DD") : ""}
              type="date"
              onChange={(e) => setFrom(moment(e.target.value).toDate())}
            />
          </ContainerInputWithHorizontalMargin>
          <ContainerInputWithMarginLeft>
            <Input
              style={{ padding: "8px" }}
              label="Até"
              value={to ? moment(to).format("yyyy-MM-DD") : ""}
              type="date"
              onChange={(e) => setTo(moment(e.target.value).toDate())}
            />
          </ContainerInputWithMarginLeft>
          <ContainerInputWithMarginLeft>
            <Select
              style={{ padding: "8px" }}
              label="Status"
              value={status}
              // onChange={(e) => console.log(e)}
              onChange={(e) => {
                setStatus(parseInt(e.target.value));
              }}
              data={[
                { description: "Todos", value: 0 },
                { description: "Pendentes de Aprovação", value: 1 },
                { description: "Aprovados", value: 2 },
              ]}
            />
          </ContainerInputWithMarginLeft>
        </FormGroup>
        {data?.data.map((assessment, index) => {
          return (
            <AssessmentListItem
              key={assessment.id}
              name={assessment.name}
              message={assessment.message}
              date={new Date(assessment.date)}
              stars={assessment.stars}
              approved={assessment.approved}
              onEdit={() => {
                history.push(`/assessment/${assessment.id}`);
              }}
              onTrash={() => {
                handleDelete(assessment.id, index);
              }}
              onCheck={() => {
                handleCheck(assessment.id, index);
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
