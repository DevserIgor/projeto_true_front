import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const InputContainer = styled.input`
  width: 100%;
  margin: 7px 0;
  padding: 10px;
  border-radius: 5px;
`;

export const Label = styled.label`
  color: ${(props) => props.theme.colors.pagination};
`;
