import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decCartQty, deleteToCart, incCartQty } from '../../../redux/action/cart.action';

function Cart(props) {

    let dispatch = useDispatch()
    let medData = useSelector(state => state.medicine);
    let cartData = useSelector(state => state.cart);


    let cartitems = cartData.item.map((v) => {
        let medicinceData = medData.medicine.find((m) => m.id === v.pid);

        let fData = { ...medicinceData, ...v };

        return fData
    })


    let totalPrice = cartitems.reduce((acc, value) => acc + value.price * value.qty, 0);

    const handleInc = (id) => {
        dispatch(incCartQty(id))
    }

    const handleDec = (id) => {
        dispatch(decCartQty(id))
    }

    const handleremove = (id) => {
        console.log("remove", id);
        dispatch(deleteToCart(id))
    }

    return (

        <section id="medicines" className="medicines">
            <div className="container">
                <div className="section-title">
                    <h2>cart</h2>

                </div>
            </div>
            <div className="container">
                <div className="card mb-3">
                    {
                        cartitems.map((v) => {
                            return (

                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">

                                            <div className="ms-3">
                                                <h5>{v.name}</h5>
                                                <p className="small mb-0">{v.desc.substring(0, 20)}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <div style={{ width: 50 }}>
                                                <button onClick={() => handleDec(v.pid)}>-</button>
                                                <h5 className="fw-normal mb-0">{v.qty}</h5>
                                                <button onClick={() => handleInc(v.pid)}>+</button>
                                            </div>
                                            <div style={{ width: 80 }}>
                                                <h5 className="mb-0">{v.qty * v.price}</h5>
                                            </div>
                                            <a href="#!" style={{ color: '#cecece' }} onClick={() => handleremove(v.pid)}><i className="fas fa-trash-alt" /></a>
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className=" card-body card mb-3 ms-3 d-flex justify-content-between d-flex flex-row align-items-center">
                        Total
                        <div style={{ width: 80 }}>
                            <h5 className="mb-0">{totalPrice}</h5>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Cart;