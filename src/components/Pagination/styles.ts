import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

interface PageItemProps {
  active?: boolean;
}
interface IPageItemProps {
  active?: boolean;
}

export const PageItem = styled.button<IPageItemProps>`
  padding: 8px 15px;
  background: transparent;

  font-size: 18px;
  color: ${(props) => props.theme.colors.pagination};

  text-decoration: ${(props) => (props.active ? "underline" : "none")};

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
