import React, { useEffect, useRef, useState } from 'react';

function UseRefEmaple(props) {
    const [name, setname] = useState()

    const ref = useRef(0);

    const nameref = useRef('');

    const handleFocus = (refI) => {
        refI.current.style.backgroundColor= 'red';
    }

    useEffect(() => {
        ref.current = ref.current + 1;
    }, [name])
    return (
        <div>
            <input 
                ref={nameref} 
                type='text'
                onFocus={() => handleFocus(nameref)} 
                onChange={(event) => setname(event.target.value)} />
            <p>Your Name Is: {name}</p>
            <p>no time rerendring{ref.current}</p>
        </div>
    );
}

export default UseRefEmaple;    