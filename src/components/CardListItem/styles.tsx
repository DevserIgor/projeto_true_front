import styled from 'styled-components';


export const Container = styled.li`
  background-color: ${(props) => props.theme.colors.green30perc};
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;


export const CnpjName = styled.h2`
  font-weight: bold;
  font-size: 15px;
`