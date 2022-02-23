import React from "react";

import { Container, PageItem } from "./styles";

interface IPaginationProps {
  total: number;
  current: number;
  onChangePage(page: number): void;
}

const Pagination: React.FC<IPaginationProps> = ({
  total,
  current,
  onChangePage,
}) => {
  const first = () => {
    if (onChangePage) onChangePage(1);
  };
  const last = () => {
    if (onChangePage) onChangePage(total);
  };
  const previous = () => {
    if (onChangePage && current > 1) onChangePage(current - 1);
  };
  const next = () => {
    if (onChangePage && current < total) onChangePage(current + 1);
  };

  return (
    <Container>
      <PageItem onClick={first}>{"<<"}</PageItem>
      <PageItem onClick={previous}>{"<"}</PageItem>
      {[...Array(total).keys()].map((item, index) => {
        return (
          <PageItem
            active={index + 1 === current}
            onClick={() => {
              if (onChangePage) onChangePage(index + 1);
            }}
          >
            {index + 1}
          </PageItem>
        );
      })}
      <PageItem onClick={next}>{">"}</PageItem>
      <PageItem onClick={last}>{">>"}</PageItem>
    </Container>
  );
};

export default Pagination;
