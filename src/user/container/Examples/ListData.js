import React, { useEffect, useState } from 'react';

function ListData({ items }) {

    const [data, setdata] = useState([]);

    useEffect(() => {
        setdata(items(5))
    }, [items])
    return (
        <div>
            <ul>
                {
                    data.map((d, i) => {
                        return (
                            <li key={i}>{d}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default ListData;