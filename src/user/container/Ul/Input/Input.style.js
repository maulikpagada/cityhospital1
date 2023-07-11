import styled from "styled-components";

export const Baseinput = styled.input`
    border: ${props => props.errorText !== '' ? '1px solid red' : '1px solid grey'};
`;

export const Inputerror = styled.span`
    display: ${props => props.errorText !== '' ? 'inline-block' : 'none'};
    color: red;
`;