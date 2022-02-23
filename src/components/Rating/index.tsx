import React, { InputHTMLAttributes } from "react";

import { Container, InputContainer, Label } from "./styles";
import ReactStars from "react-stars";

interface ReactStarsProps {
  className?: string | undefined;
  count?: number | undefined;
  value?: number | undefined;
  char?: string | undefined;
  color1?: string | undefined;
  color2?: string | undefined;
  size?: number | undefined;
  edit?: boolean | undefined;
  half?: boolean | undefined;
  onChange?: ((new_rating: number) => void) | undefined;
}

interface RatingProps extends ReactStarsProps {
  leftLabel?: string;
  rightLabel?: string;
}

const Rating: React.FC<RatingProps> = ({ leftLabel, rightLabel, ...rest }) => (
  <Container>
    <Label>{leftLabel}</Label>
    <ReactStars {...rest} />
    <Label>{rightLabel}</Label>
  </Container>
);

export default Rating;
