import styled from "styled-components";

export const Container = styled.div`
    > button {
        padding: 7px 10px;
        color: ${(props) => props.theme.colors.primary};
        border-radius: 5px;
        background-color: ${(props) => props.theme.colors.white};

        transition: opacity 0.3s;

        &:hover {
            opacity: 0.7;
        }
    }
`;