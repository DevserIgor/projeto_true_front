import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.main``;

export const Filters = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  margin-bottom: 30px;

  .tag-filter {
    font-size: 18px;
    font-weight: 500;

    background: none;
    color: ${(props) => props.theme.colors.white};

    margin: 0 10px;

    opacity: 0.4;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }

  .tag-filter-recurrent::after {
    content: "";
    display: block;
    width: 55px;
    margin: 0 auto;
    border-bottom: 10px solid ${(props) => props.theme.colors.success};
  }

  .tag-filter-eventual::after {
    content: "";
    display: block;
    width: 55px;
    margin: 0 auto;
    border-bottom: 10px solid ${(props) => props.theme.colors.warning};
  }

  .tag-actived {
    opacity: 1;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex: 1;
  padding: 5px 0px;
`;

export const ContainerInputWithMarginRight = styled.div`
  display: flex;
  flex: 1;
  margin-right: 5px;
`;
export const ContainerInputWithHorizontalMargin = styled.div`
  display: flex;
  flex: 1;
  margin-left: 5px;
  margin-right: 5px;
`;
export const ContainerInputWithMarginLeft = styled.div`
  display: flex;
  flex: 1;
  margin-left: 5px;
  justify-content: center;
`;
