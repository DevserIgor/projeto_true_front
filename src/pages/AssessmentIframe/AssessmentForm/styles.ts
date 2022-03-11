import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding: 20px 0px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
export const FormGroup = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 5px 0px;
`;

export const MessageArea = styled.textarea`
  display: flex;
  flex: 1;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
  padding: 10px;
`;
export const InputName = styled.input`
  display: flex;
  flex: 1;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
  padding: 10px;
`;

export const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.colors.lineColor};
  padding: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const ButtonConfirm = styled.button`
  align-self: flex-end;
  padding: 15px 25px;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.primary};
  color: white;
`;
export const ErrorMessage = styled.span`
  display: flex;
  flex: 1;
  padding: 15px;
  background: #e30000cc;
  border-radius: 5px;
  color: white;
`;
