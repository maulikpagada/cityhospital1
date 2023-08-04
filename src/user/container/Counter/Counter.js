import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../../redux/slice/counterSlice';
import Heading from '../Ul/Heading/Heading';

function Counter(props) {
    const dispatch = useDispatch()
    const couterData = useSelector(state => state.counter)

    const handleInc = () => {
        dispatch(increment())
    }

    const handleDec = () => {
        dispatch(decrement())
    }

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

                </div>
            </section>
        </>
    );
}

export default Counter;
