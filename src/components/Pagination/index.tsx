import React, { useState } from "react";

import { Container, PageItem } from "./styles";

interface IPaginationProps {
  total: number;
  current: number;
  showPageNumbers?: boolean;
  onChangePage(page: number): void;
}

const Pagination: React.FC<IPaginationProps> = ({
  total,
  current,
  showPageNumbers = true,
  onChangePage,
}) => {
  const [firstPage, setFirstPage] = useState(1);

  const first = () => {
    setFirstPage(1);
    if (onChangePage) onChangePage(1);
  };
  const last = () => {
    setFirstPage(total - 14);
    if (onChangePage) onChangePage(total);
  };
  const previous = () => {
    const newCurrent = current - 1;
    if (newCurrent < firstPage && newCurrent >= 1) {
      setFirstPage(firstPage - 1);
    }
    if (onChangePage && newCurrent >= 1) onChangePage(newCurrent);
  };
  const next = () => {
    const newCurrent = current + 1;
    if (newCurrent > firstPage + 14) {
      setFirstPage(newCurrent - 14);
    }
    if (onChangePage && newCurrent <= total) onChangePage(newCurrent);
  };

  return (
    <Container>
      <PageItem onClick={first}>{"<<"}</PageItem>
      <PageItem onClick={previous}>{"<"}</PageItem>
      {showPageNumbers &&
        [...Array(total).keys()]
          .slice(firstPage - 1, firstPage + 14)
          .map((item, index) => {
            return (
              <PageItem
                key={item}
                active={item + 1 === current}
                onClick={() => {
                  if (onChangePage) onChangePage(item + 1);
                }}
              >
                {item + 1}
              </PageItem>
            );
          })}
      {total > 15 && firstPage + 14 < total && (
        <PageItem onClick={() => {}}>{"..."}</PageItem>
      )}
      <PageItem onClick={next}>{">"}</PageItem>
      <PageItem onClick={last}>{">>"}</PageItem>
    </Container>
  );
};

export default Pagination;
