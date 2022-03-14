import styled from "styled-components";
// import { withProps } from "../../utils/withProps";
export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.colors.primary};
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 30px;

  > h2 {
    color: ${(props) => props.theme.colors.white};
    margin-left: 7px;
  }

  > img {
    width: 40px;
    height: 40px;
  }
`;

export const Form = styled.form`
  width: 300px;
  height: 325px;

  padding: 30px;

  border-radius: 10px;

  background-color: ${(props) => props.theme.colors.secondary};
`;

export const FormTitle = styled.h1`
  margin-bottom: 40px;

  color: ${(props) => props.theme.colors.white};

  &:after {
    content: "";
    display: block;
    width: 55px;
    border-bottom: 10px solid ${(props) => props.theme.colors.green};
  }
`;

export const Message = styled.div`
  background-color: #e30000;
  /* border: solid 1px #e3000; */
  color: white;
  border-radius: 5px;
  padding: 8px;
  text-align: center;
  margin-bottom: 5px;
  margin-top: 5px;
`;
