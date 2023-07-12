import React from 'react';
import { CardData } from './Card.style';

function Card({ children }) {
    return (
        <>
            <CardData>
                {children}
            </CardData>
        </>
    );
}

export default Card;