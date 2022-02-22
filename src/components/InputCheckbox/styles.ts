import styled from 'styled-components';

export const Container = styled.label`
  display: block;
  position: relative;
  padding-left: 25px;
  /* margin-bottom: 12px; */
  cursor: pointer;
  font-size: 22px;

  &:hover input ~ span {
    background-color: ${(props) => props.theme.colors.gray};
  }

  input {
    /* position: absolute; */
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:hover {
      background-color: ${(props) => props.theme.colors.gray};
    }

    &:checked ~ span {
      background-color: ${(props) => props.theme.colors.green};
    }
    &:checked ~ span:after {
      display: block;
    }
  }
  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: ${(props) => props.theme.colors.black};
    border-radius: 2px;

    &:after {
      content: "";
      position: absolute;
      display: none;
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
`;