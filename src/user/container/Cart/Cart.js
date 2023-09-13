import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decCartQty, deleteToCart, incCartQty } from '../../../redux/slice/cartSlice';
// import { decCartQty, deleteToCart, incCartQty } from '../../../redux/action/cart.action';

function Cart(props) {

    let dispatch = useDispatch()
    let medData = useSelector(state => state.medicines);
    let cartData = useSelector(state => state.cart);

    console.log(medData, cartData);

    let cartitems = cartData.item.map((v) => {
        let medicinceData = medData.medicines.find((m) => m.id === v.pid);

        let fData = { ...medicinceData, ...v };

        return fData
    })


    let totalPrice = cartitems.reduce((acc, value) => acc + value.price * value.qty, 0);

    const handleInc = (id) => {
        console.log(id);
        dispatch(incCartQty(id))
    }

    const handleDec = (id) => {
        console.log(id);
        dispatch(decCartQty(id))
    }

    const handleremove = (id) => {
        console.log(id);
        dispatch(deleteToCart(id))
    }

    return (
        <section id="medicine" className="medicine">
            <div className="container">
                <div className="section-title">
                    <h2>Cart</h2>
                </div>

                {
                    cartitems.map((c) => {
                        return (
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <div className="ms-3">
                                                <h5>{c.name}</h5>
                                                <p className="small mb-0">{c.desc}...</p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <div className="d-flex mx-5" style={{ width: 150 }}>
                                                <button className="btn btn-link px-2" onClick={() => handleDec(c.pid)}>
                                                    <i className="fas fa-minus" />
                                                </button>
                                                <input id="form1" min={1} name="quantity" value={c.qty} type="text" className="form-control form-control-sm" />
                                                <button className="btn btn-link px-2" onClick={() => handleInc(c.pid)}>
                                                    <i className="fas fa-plus" />
                                                </button>
                                            </div>
                                            <div style={{ width: 130 }}>
                                                <h5 className="mb-0">Rs.{c.price * c.qty}</h5>
                                            </div>
                                            <a style={{ color: '#cecece' }}><i className="fas fa-trash-alt" onClick={() => handleremove(c.pid)} /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                <div className=" card-body card mb-3 ms-3 d-flex justify-content-between d-flex flex-row align-items-center">
                    Total Amount Is:-
                    <div style={{ width: 80 }}>
                        <h5 className="mb-0">{totalPrice}</h5>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cart;