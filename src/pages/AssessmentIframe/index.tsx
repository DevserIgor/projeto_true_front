import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import AssessmentForm from "./AssessmentForm";
import AssessmentHeader from "./AssessmentHeader/AssessmentHeader";
import AssessmentItem from "./AssessmentItem";
import { createRandom, getDataRandom } from "services/AssessmentService";
import { Container, SendAssessment, ContentPagination } from "./styles";
import getRandomStarts from "utils/getRandomStarts";

import { BallTriangle } from "react-loader-spinner";
import Pagination from "components/Pagination";
import moment from "moment";

interface IRouteParams {
  match: {
    params: {
      productId: number;
      page: number;
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

interface ITotalRating {
  total: number;
  date: Date;
}

const initialTotalRating: ITotalRating = {
  total: Math.round(Math.random() * 1000),
  date: new Date(),
};

const AssessmentIframe: React.FC<IRouteParams> = ({ match }) => {
  const STORAGE_KEY = "@TRUE_COMMERCE_AVALIACOES";
  const { productId } = match.params;

  const [totalRating, setTotalRating] = useState<ITotalRating>(() => {
    const totalRatingString = localStorage.getItem(
      `${STORAGE_KEY}:dateRating_${productId}`
    );
    return totalRatingString
      ? JSON.parse(totalRatingString || "")
      : initialTotalRating;
  });

  const [average, setAverage] = useState(getRandomStarts());
  const [amount, setAmount] = useState(totalRating.total);
  const [page, setPage] = useState(1);

  const [formOpened, setFormOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data, isFetching, refetch } = useQuery<Assessment[]>(
    ["ListAssessmentRandom", productId, page],
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

    // setTotalRating({
    //   total: 1,
    //   date: moment(new Date()),
    // });
  };

  useEffect(() => {
    localStorage.setItem(
      `${STORAGE_KEY}:dateRating_${productId}`,
      JSON.stringify(totalRating)
    );
  }, [productId, totalRating]);

  return (
    <>
      <Container>
        <AssessmentHeader amountAssessments={amount} average={average} />
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
        {isFetching ? (
          <BallTriangle color="#1d1d1d" height={50} width={50} />
        ) : (
          data?.map((item: Assessment) => <AssessmentItem {...item} />)
        )}
        <ContentPagination>
          <Pagination
            // showPageNumbers={false}
            total={Math.round(totalRating.total / 15) || 0}
            current={page}
            onChangePage={(page: number) => {
              setPage(page);
            }}
          />
        </ContentPagination>
      </Container>
    </>
  );
};

export default AssessmentIframe;
