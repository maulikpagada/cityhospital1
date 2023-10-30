// import styled from "styled-components";

// const Basebutton = styled.button`
//     border: 0;
//     transition: 0.4s;
//     border-radius: 50px;
//     padding: 10px 35px;

//     &:hover {
//         background: #1c84e3;
//     }
// `
// export const primarybutton = styled(Basebutton)`
//     background: ${props => props.disabled ? 'gray' : '#FF6337'} 
//     color: #fff;

//     &:hover{
//         background: ${props => props.disabled ? 'gray' : '#FFF111'} 
// }
// `


// export const secondarybutton = styled(Basebutton)`
//     background: #000;
//     color: #fff;

//     &:hover{
//         background: #blue;
// }
// `


// export const outlinedbutton = styled(Basebutton)`
//     background: none;
//     color: #000;
//     border: 2px solid red;

//     &:hover{
//         background: orange;
// }
// `

import styled from "styled-components";

const BaseButton = styled.button`
    // // background: #000;
     
     border: 0;
     padding: 10px 35px;

     transition: 0.4s;
     border-radius: 50px;
     margin: 10px;
    
    
     `;

export const primarybutton = styled(BaseButton)`
     background: #FF6337;
     color: #fff;

     &:hover {
        background: #1c84e3;
    }
     `;

export const secondarybutton = styled(BaseButton)`
     background: ${props => props.disabled ? 'gray' : '#ff2552'};
     color: #fdd454;

     &:hover {
        background: ${props => props.disabled ? 'gray' : "#fff111"};
    }
     `;

export const outlinedbutton = styled(BaseButton)`
    //  background: ;
     color: #000;
     border: 2px solid  #000;

     &:hover {
        background: #000;
        color: #fff;
    }
     `;