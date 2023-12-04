import { useState } from "react";
import { Modal, Button, Row, Col, Form, Image, InputGroup } from "react-bootstrap";

import FeatherIcon from 'feather-icons-react';
import Alert, { confirmMsg, confirmTitle, errorMsg, errorTitle, successMsg, successTitle } from "../../../shared/plugins/Alert";
import Image1 from "../../../assets/Products/pastel1.jpeg";
import CreateProduct from "../Functions/CreateProduct";

function ProductDetail(props) {
    const [count, setCount] = useState(0);


    const form = {
        onSubmit: async () => {
            Alert.fire({
                title: confirmTitle,
                text: confirmMsg,
                icon: 'warning',
                confirmButtonColor: '#009574',
                confirmButtonText: 'Aceptar',
                cancelButtonColor: '#DD6B55',
                cancelButtonText: 'Cancelar',
                reverseButtons: true,
                backdrop: true,
                showCancelButton: true,
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Alert.isLoading,
                preConfirm: async () => {
                    try {
                        const response = CreateProduct({ id: props.product.id, amount: count })
                        if (!response.error) {
                            Alert.fire({
                                title: successTitle,
                                text: successMsg,
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    props.onClose()
                                }
                            })
                        }
                        return response
                    } catch (error) {
                        Alert.fire({
                            title: errorTitle,
                            text: errorMsg,
                            icon: 'error',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Aceptar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                props.onClose()
                            }
                        })
                    }
                }

            })
        }
    }


    return (
        <>
            <Modal 
                
                backdrop='static'
                keyboard={false}
                onHide={props.onClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header className="productModal" closeButton>
                    <Modal.Title className="modalTitle">Detalles del producto</Modal.Title>
                </Modal.Header>
                <Modal.Body className="productModal">
                    <Row>
                        <Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} >
                            <Form.Label className="mb">Nombre</Form.Label>
                            <Form.Control placeholder={props.product.name} disabled />
                            <Form.Label className="mb mt-3">Descripción</Form.Label>
                            <Form.Control as="textarea" rows={4} placeholder={props.product.description} disabled />
                        </Col>
                        <Col xs={12} sm={12} md={7} lg={7} xl={7} xxl={7} >
                            <Image
                                src={props.product.image.length > 20 ? (props.product.image) : (Image1)}
                                className=" card-img-top image-product-moda mt-4"
                                rounded
                            />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} >
                            <Form.Label className="mb">Precio</Form.Label>
                            <InputGroup className="mb-3">
                                <Button variant="primary" disabled>$</Button>
                                <Form.Control aria-label="Amount (to the nearest dollar)" placeholder={props.product.price} disabled />
                            </InputGroup>
                        </Col>

                        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} >
                            <Form.Label className="mb">Cantidad</Form.Label>
                            <InputGroup className="mb-3">
                                <Button variant="primary" onClick={() => setCount((count) => count - 1)} disabled={count <= 0}> -</Button>
                                <Form.Control value={count} disabled />
                                <Button variant="primary" onClick={() => setCount((count) => count + 1)} disabled={count >= props.product.stock}> + </Button>
                            </InputGroup>

                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer className="productModal">
                    <Button
                        className="buttonsModal"
                        variant="outline-primary"
                        disabled={count <= 0}>
                        Agregar al carrito <FeatherIcon icon="shopping-cart" />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProductDetail

