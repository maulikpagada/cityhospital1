import React from 'react';
import styled from 'styled-components';

function Custombutton({ val }) {
    const Btn = styled.button`
    background: #FF6337;
    border: 0;
    color: #fff;
    transition: 0.4s;
    border-radius: 50px;
    margin: 10px;
    padding: 10px 35px;

    &:hover {
        background: #1c84e3;
    }
    `
    return (
        <Btn>   
            {val}
        </Btn>
    );
}

export default Custombutton;