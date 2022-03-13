import React, { useState } from "react";
import { useQuery } from "react-query";
import AssessmentForm from "./AssessmentForm";
import AssessmentHeader from "./AssessmentHeader/AssessmentHeader";
import AssessmentItem from "./AssessmentItem";
import { createRandom, getDataRandom } from "services/AssessmentService";
import { Container, SendAssessment } from "./styles";
import getRandomStarts from "utils/getRandomStarts";

import { BallTriangle } from "react-loader-spinner";

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

// type ResponseAssessment = {
//   from: number;
//   to: number;
//   per_page: number;
//   total: number;
//   current_page: number;
//   prev_page: number;
//   next_page: number;
//   last_page: number;
//   data: Assessment[];
// };
interface IData {
  name: string;
  message: string;
  stars: number;
}
const AssessmentIframe: React.FC<IRouteParams> = ({ match }) => {
  const { productId } = match.params;
  const [average, setAverage] = useState(getRandomStarts());
  const [amount, setAmount] = useState(Math.round(Math.random() * 1000));

  const [formOpened, setFormOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data, isFetching } = useQuery<Assessment[]>(
    ["ListAssessmentRandom", productId],
    async () => {
      return await getDataRandom(1, productId);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const handleCreateAssessment = async ({ name, message, stars }: IData) => {
    setIsLoading(true);
    try {
      await createRandom({
        name,
        date: new Date(),
        message,
        approved: false,
        product_id: productId,
        stars,
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);

    setFormOpened(false);
  };
  return (
    <Container>
      <AssessmentHeader amountAssessments={amount} average={average} />
      {isFetching ? (
        <BallTriangle color="#1d1d1d" height={50} width={50} />
      ) : (
        data?.map((item: Assessment) => <AssessmentItem {...item} />)
      )}
      {!formOpened && (
        <SendAssessment onClick={() => setFormOpened(!formOpened)}>
          Enviar Avaliação
        </SendAssessment>
      )}
      {!!formOpened && (
        <AssessmentForm
          isLoading={isLoading}
          onConfirm={handleCreateAssessment}
        />
      )}
    </Container>
  );
};

export default AssessmentIframe;
