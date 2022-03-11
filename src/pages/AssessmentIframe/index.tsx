import moment from "moment";
import React, { useState } from "react";
import { useQuery } from "react-query";
import AssessmentForm from "./AssessmentForm";
import AssessmentHeader from "./AssessmentHeader/AssessmentHeader";
import AssessmentItem from "./AssessmentItem";
import { getDataRandom } from "services/AssessmentService";
import { Container, SendAssessment } from "./styles";

interface IRouteParams {
  match: {
    params: {
      productId: number;
    };
  };
}

type Assessment = {
  id: string;
  name: string;
  stars: number;
  message: string;
  date: Date;
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

const AssessmentIframe: React.FC<IRouteParams> = ({ match }) => {
  const { productId } = match.params;
  const [average, setAverage] = useState(4.9);
  const [amount, setAmount] = useState(352);

  const [formOpened, setFormOpened] = useState(false);

  const { data, isFetching, refetch } = useQuery<ResponseAssessment>(
    ["ListAssessmentRandom", productId],
    async () => {
      return await getDataRandom(1, productId);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const handleCreateAssessment = () => {
    setFormOpened(false);
  };
  return (
    <Container>
      <AssessmentHeader amountAssessments={amount} average={average} />
      {data?.data.map((item: Assessment) => (
        <AssessmentItem {...item} />
      ))}
      {!formOpened && (
        <SendAssessment onClick={() => setFormOpened(!formOpened)}>
          Enviar Avaliação
        </SendAssessment>
      )}
      {!!formOpened && <AssessmentForm onConfirm={handleCreateAssessment} />}
    </Container>
  );
};

export default AssessmentIframe;
