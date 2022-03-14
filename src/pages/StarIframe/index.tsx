import Rating from "components/Rating";
import React from "react";
import getRandomStarts from "utils/getRandomStarts";

import { Container, StarNote } from "./styles";

const StarIframe: React.FC = () => {
  const stars = getRandomStarts();
  return (
    <Container>
      <Rating
        labelColor="#222"
        rightLabel={stars.toString()}
        edit={false}
        count={5}
        value={stars}
        size={20}
        color2={"#fecf0e"}
        color1={"#efefef"}
      />
    </Container>
  );
};

export default StarIframe;
