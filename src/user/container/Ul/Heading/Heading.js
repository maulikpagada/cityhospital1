import React from 'react';
import { HeadingH1, HeadingH2, HeadingH3, HeadingH4, HeadingH5, HeadingH6, Paragraph } from './Heading.style';

function Heading({ children, type }) {

    const checktype = () => {
        switch (type) {
            case 'h1':
                return HeadingH1;
            case 'h2':
                return HeadingH2;
            case 'h3':
                return HeadingH3;
            case 'h4':
                return HeadingH4;
            case 'h5':
                return HeadingH5;
            case 'h6':
                return HeadingH6;
            case 'p':
                return Paragraph;
            default:
                return Paragraph;
        }
    }

    const Headingtype = checktype();


    return (
        <>
            <Headingtype>{children}</Headingtype>

        </>
    );
}

export default Heading;