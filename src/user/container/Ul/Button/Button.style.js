import styled from "styled-components";

const Basebutton = styled.button`
    border: 0;
    transition: 0.4s;
    border-radius: 50px;
    padding: 10px 35px;

    &:hover {
        background: #1c84e3;
    }
`
export const primarybutton = styled(Basebutton)`
    background: ${props => props.disabled ? 'gray' : '#FF6337'} 
    color: #fff;

    &:hover{
        background: ${props => props.disabled ? 'gray' : '#FFF111'} 
}
`


export const secondarybutton = styled(Basebutton)`
    background: #000;
    color: #fff;

    &:hover{
        background: #blue;
}
`


export const outlinedbutton = styled(Basebutton)`
    background: none;
    color: #000;
    border: 2px solid red;

    &:hover{
        background: orange;
}
`