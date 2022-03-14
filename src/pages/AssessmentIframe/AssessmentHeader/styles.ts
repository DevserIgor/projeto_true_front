import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

export const Title = styled.span`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.colors.lineColor};
  padding: 5px;
`;

export const DashContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
  border: 1px solid #bfbfbf;
  padding: 20px;
`;
export const StarsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const StarsText = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.lineColor};
  display: flex;
  flex: 1;
  text-align: center;
`;
export const Stars = styled.div``;
export const AmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const AmountValue = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.lineColor};
`;
export const AmountLabel = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.lineColor};
`;
