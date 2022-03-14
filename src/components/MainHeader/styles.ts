import styled from "styled-components";

export const Container = styled.div`
  grid-area: MH;

  background-color: ${(props) => props.theme.colors.secondary};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 10px;

  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

export const Profile = styled.div`
  color: ${(props) => props.theme.colors.white};
`;

export const Welcome = styled.h3``;

export const UserName = styled.span`
  margin-right: 10px;
`;

export const Logout = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  border: 2px solid #08f036;
  color: #08f036;
  background: transparent;
`;
