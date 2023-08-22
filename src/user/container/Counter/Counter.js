import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../../redux/slice/counterSlice';
import Heading from '../Ul/Heading/Heading';

function Counter(props) {
    const dispatch = useDispatch()
    const couterData = useSelector(state => state.counter)
    const [number, setnumber] = useState(0);

    const handleInc = () => {
        dispatch(increment())
    }

    const handleDec = () => {
        dispatch(decrement())
    }



    const handlefact = () => {
        let fact = 1;

        for (let i = number; i >= 1; i--) {
            fact = fact * i;
        }

        return fact
    }

    const rest = useMemo(() => {
        console.log("cdsdc ");
        return handlefact()
    }, [number])

    return (

        <>
            <section id="Counter" className="Counter">
                <div className="container">
                    <div className="section-title">
                        <Heading type='h2'>Counter</Heading>
                        <div>
                            <button onClick={() => handleInc()}>+</button>
                            <span>{couterData.count}</span>
                            <button onClick={() => handleDec()}>-</button>
                        </div>
                    </div>
                    <div>
                        <input type='text' onChange={(e) => setnumber(parseInt(e.target.value))} />
                        <span>Fact is: {rest}</span>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Counter;
