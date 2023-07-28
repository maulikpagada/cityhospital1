import React from 'react';

function Cart1(props) {
    let cartdata = localdata.map((v) => {
        let medata = medicineData.find((m) => m.id === v.pid)

        let Fdata = { ...medata, ...v }

        return Fdata

    })

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
                        cartdata.map((v) => {
                            return (

                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">

                                            <div className="ms-3">
                                                <h5>{v.name}</h5>
                                                <p className="small mb-0">{v.desc}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <div style={{ width: 50 }}>
                                                <button onClick={() => handleDec(v.pid)}>-</button>
                                                <h5 className="fw-normal mb-0">{v.Qty}</h5>
                                                <button onClick={() => handleInc(v.pid)}>+</button>
                                            </div>
                                            <div style={{ width: 80 }}>
                                                <h5 className="mb-0">{v.Qty * v.price}</h5>
                                            </div>
                                            <a href="#" style={{ color: '#cecece' }} onClick={() => handleRemove(v.pid)}><i className="fas fa-trash-alt" /></a>
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

export default Cart1;