import styled from "styled-components";

interface FormGroupProps {
  width?: number;
}

export const Container = styled.div``;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
export const FormGroup = styled.div<FormGroupProps>`
  display: flex;
  flex: 1;
  padding: 5px 10px;
  align-items: center;
`;
export const ButtonGroup = styled.div`
  display: flex;
  flex: 1;
  padding: 5px 10px;
  justify-content: center;
`;
export const ButtonItem = styled.div`
  padding: 0px 15px;
`;
