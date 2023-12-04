import React from 'react'
import caja from '../../assets/caja.png'
import usuario from '../../assets/usuario.png'
import taza from '../../assets/taza.png'
import Navbarsicaf from '../../shared/components/Navbar'

const OrdersScreens = () => {
    return (
        <div className="container">
            <Navbarsicaf/>
            <div className="row my-5">
                <div className="col-sm-6 mb-3">
                    <div className="card border-0 mt-4" style={{ backgroundColor: "var(--color-ordes)" }}>
                        <div className="card-body border-0 mt-4" style={{ backgroundColor: "var(--color-ordes)" }}>
                            <div className="card-group">
                                <div className="card border-0 " style={{ backgroundColor: 'var(--color-ordes)' }}>
                                    <div className="card-body d-flex flex-column align-items-center">
                                        <img
                                            src={taza}
                                            className="card-img-top"
                                            style={{ width: '80px' }}
                                            alt="Taza"
                                        />
                                        <p className="text-center mt-2" style={{ color: 'var(--color-title)', fontSize: '12px' }}>Tu pedido está en preparación</p>
                                    </div>
                                </div>
                                <div className="card border-0 " style={{ backgroundColor: 'var(--color-ordes)' }}>
                                    <div className="card-body d-flex flex-column align-items-center">
                                        <img
                                            src={caja}
                                            className="card-img-top"
                                            style={{ width: '80px' }}
                                            alt="Caja"
                                        />
                                        <p className="text-center mt-2" style={{ color: 'var(--color-title)', fontSize: '12px' }}>Tu pedido ya ha sido empaquetado, por favor dirígete a las instalaciones</p>
                                    </div>
                                </div>
                                <div className="card border-0 " style={{ backgroundColor: 'var(--color-ordes)' }}>
                                    <div className="card-body d-flex flex-column align-items-center">
                                        <img
                                            src={usuario}
                                            className="card-img-top"
                                            style={{ width: '80px' }}
                                            alt="Usuario"
                                        />
                                        <p className="text-center mt-2" style={{ color: 'var(--color-title)', fontSize: '12px' }}>El pedido ha sido recogido, muchas gracias y buen provecho</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column align-items-center mt-5">
                        <div className="d-flex justify-content-end ">
                            <button className="btn  mr-1 " style={{ backgroundColor: "var(--color-BotonV)" }}><b>Estado del pedido: </b>En espera</button>
                            <button className="btn " style={{ marginLeft: '20px', backgroundColor: "var(--color-BotonR)" }}>Cancelar</button>
                        </div>
                        <h5 className="text-center mt-4" style={{ color: 'var(--color-title)' }}><b>Recibe: </b> Lisseth Georgina Fuentes Figueroa</h5>
                    </div>
                </div>
                <div className="col-sm-6 mb-3">
                    <div className="card border-0 mt-4 " style={{ backgroundColor: "var(--color-ordes)" }}>
                        <div className="card-body">
                            <h4 className="text-center mt-4" style={{ color: "var(--color-title)" }}><b>DETALLES DEL PEDIDO</b></h4>
                            <div className="mt-4" style={{ marginLeft: '50px', color: 'var(--color-title)' }}>
                                <span >
                                    Cupcake: Cupcake de chocolate <br />
                                    Cantidad:  2 pz<br />
                                    Precio: $35.00<br />
                                    <strong>Subtotal: $70.00</strong> <br />
                                </span>
                                <hr style={{ marginTop: '10px', marginBottom: '10px', borderColor: 'var(--color-title)', borderWidth: '3px', maxWidth: '93%' }} />
                            </div>
                            <div div className="mt-4" style={{ marginLeft: '50px', color: 'var(--color-title)' }}>
                                <span >
                                    Pastel: Matilda <br />
                                    Cantidad:  1 pz <br />
                                    Precio: $350.00<br />
                                </span>
                                <span style={{ marginLeft: '57px', color: 'var(--color-textR)' }}>
                                    - 20% ($70.00)<br />
                                </span>
                                <span style={{ marginLeft: '100px', color: 'var(--color-title)' }}>
                                    $280.00<br />
                                </span>
                                <span style={{ color: 'var(--color-title)' }}>
                                    <strong>Subtotal: $280.00</strong> <br />
                                </span>
                                <hr style={{ marginTop: '10px', marginBottom: '10px', borderColor: 'var(--color-title)', borderWidth: '3px', maxWidth: '93%' }} />
                                <h5 className="text-center mt-4" style={{ color: "var(--color-title)" }}><b>TOTAL: $350.00</b></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersScreens