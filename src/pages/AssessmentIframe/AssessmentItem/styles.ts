import styled from "styled-components";

export const Container = styled.div`
  padding: 10px 0px;

  display: flex;
  flex: 1;
  width: 100%;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
export const NameContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    max-width: 25%;
  }

  @media (min-width: 1024px) {
    max-width: 15%;
  }
`;

export const NameText = styled.span`
  font-weight: bold;
  color: ${(props) => props.theme.colors.lineColor};
  display: flex;
  flex: 1;
  text-align: center;
`;
export const DateText = styled.span`
  color: ${(props) => props.theme.colors.lineColor};
  font-size: 13px;
`;
export const StarValue = styled.div``;

export const StarContainer = styled.div`
  margin-left: 5px;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 70px;
  height: 70px;
  border: 5px solid pink;
  border-radius: 35px;
  margin: 5px;
`;
export const StarTitle = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.colors.lineColor};
`;

export const StarNote = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.lineColor};
`;

export const MessageContainer = styled.div`
  display: flex;
  flex: 1;
  border: 1px solid #bfbfbf;
  padding: 10px;
  color: #787878;
  border-radius: 0px 15px 15px 15px;
`;
