import { useState, useEffect } from "react";
import {
    Modal,
    Button,
    Row,
    Col,
    Form,
    Image,
} from "react-bootstrap";

import { getOneProduct } from "../productsFunctions";

import Image1 from "../../../assets/Products/pastel1.jpeg";

function ProductDetail(props) {
    const [Product, setProduct] = useState()
    console.log(props);


    useEffect(() => {
        getOneProduct(props.idProduct).then((product) => setProduct(product))
    }, []);

    return (
        <>
            <Modal  {...props} size="lg" centered>
                <Modal.Header className="productModal" closeButton>
                    <Modal.Title className="modalTitle">Detalles del producto</Modal.Title>
                </Modal.Header>
                <Modal.Body className="productModal">
                    <Row>
                        <Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} >
                            <Form.Label className="mb">Nombre</Form.Label>
                            <Form.Control placeholder={Product.name} disabled />
                            <Form.Label className="mb">Descripción</Form.Label>
                            <Form.Control placeholder={Product.description} disabled />
                        </Col>
                        <Col xs={12} sm={12} md={7} lg={7} xl={7} xxl={7} >
                            <Image
                                src={Product.image.length > 20 ? (Product.image) : (Image1)}
                                className="mt-4 image-product-modal text-center"
                                rounded
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} >
                            <Form.Label className="mb">Precio</Form.Label>
                            <Form.Control placeholder={Product.price} disabled />
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} >
                            <Form.Label className="mb">Precio</Form.Label>
                            <Form.Control placeholder={Product.price} disabled />
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer className="productModal">
                    <Button
                        className="buttonsModal"
                        variant="outline-primary"
                    >Agregar al carrito
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProductDetail

