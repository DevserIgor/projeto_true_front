import React from "react";

import { Container  } from "./styles";

interface IContentBtnController {
  title: string;
}

const BtnController: React.FC<IContentBtnController> = ({
  title
}) => {
  return (
    <Container>
      <button>{title}</button>
    </Container>
  );
};

export default BtnController;
