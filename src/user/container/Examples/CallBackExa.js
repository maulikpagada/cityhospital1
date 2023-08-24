import React, { useCallback, useState } from 'react';
import ListData from './ListData';

function CallBackExa(props) {


    const [theme, settheme] = useState(false)
    const [number, setnumber] = useState(1);

    const themestyle = {
        backgroundColor: theme ? 'blue' : '#fff',
        color: theme ? '#fff' : 'blue'
    }

    const getItem = useCallback((n) => {
        return [number, number + n, number + n + 1];
    }, [number])

    return (
        <>
            <div style={themestyle}>
                <h2>CallBack Examples</h2>
                <button onClick={() => settheme(!theme)}>Change</button>    

            </div>

            <div>
                <input type='text' onChange={(event) => setnumber(parseInt(event.target.value))} />

                <ListData items={getItem} />
            </div>
        </>
    );
}

export default CallBackExa;