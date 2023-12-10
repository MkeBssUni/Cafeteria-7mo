import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Form, InputGroup, Button, Tooltip, Card } from 'react-bootstrap';
import FeatherIcon from "feather-icons-react";

import RegisterDiscount from './RegisterDiscount';
import Alert, { confirmTitle, changeStatusFalse, changeStatusTrue, } from "../../../shared/plugins/Alert";
import fondo from '../../../assets/fondo.jpg';

const OffersDashborard = () => {
    const [modalShow, setModalShow] = useState(false);
    const [products, setProducts] = useState([]);
    const [overlay, setOverlay] = useState(true);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("Todos");
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [originalList, setOriginalList] = useState([])

    const getDiscountByType = async () => {
        switch (category) {
            case "Todos":
                break;
            case "Descueto por rol":
            case "Descuento por categoria":
            case "Descuento por total de compra":
            case "Descuento por cantidad de productos":
            case "Descuento por producto":
                console.log('por tipo');
                break;
            default:
                console.log("todos los descuentos");

        }
    }

    const changeStatus = async (id, status) => {
        Alert.fire({
            title: confirmTitle,
            text: status ? changeStatusFalse : changeStatusTrue,
            icon: "warning",
            confirmButtonColor: "#009574",
            confirmButtonText: "Aceptar",
            cancelButtonColor: "#DD6B55",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            backdrop: true,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            /* preConfirm: async () => {
              const response = await enableOrDisableProduct(id);
              if (!response.error) {
                getProducts().then((products) => setProducts(products));
              }
            }, */
        });
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-top" {...props}>
            {props.status
                ? "El producto es visible para los usuarios"
                : "El producto no es visible para los usuarios"}
        </Tooltip>
    );

    useEffect(() => {

    }, []);


    return (<>
        <body>
            <RegisterDiscount show={modalShow} onHide={() => setModalShow(false)} />
            <Container fluid>
                <div
                    className="image-top d-flex justify-content-center align-items-center border"
                    style={{
                        width: "100%",
                        height: "40vh",
                        margin: 0,
                    }}
                >
                    <Form.Group as={Col} xs="12" md="5" className="mx-5">
                        <InputGroup>
                            <Form.Control
                                type="search"
                                className="input-search text-center"
                                placeholder="Buscar"
                                value={searchTerm}
                                onChange={({ target }) => {
                                    setSearchTerm(target.value);
                                    setCategory(target.value.length === 0 ? 7 : 0);
                                }}
                            />
                            <Button className="input-search">
                                <FeatherIcon icon="search" />
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <Form.Select className="input-search text-center mx-4">
                        <option value='Todos'>Todos los descuentos</option>
                        <option value='Descueto por rol'>Descueto por rol</option>
                        <option value='Descuento por total de compra'>Descuento por total de compra</option>
                        <option value='Descuento por categoria'>Descuento por categoria</option>
                        <option value='Descuento por cantidad de productos'>Descuento por cantidad de productos</option>
                        <option value='Descuento por producto'>Descuento por producto</option>
                    </Form.Select>
                    <Button
                        as={Col}
                        xs="12"
                        sm="12"
                        md="1"
                        lg="3"
                        xlg="3"
                        className="input-search text-center mx-3"
                        onClick={() => setModalShow(true)}
                    >
                        Registrar <FeatherIcon icon="plus-circle" />
                    </Button>
                </div>
                <div className='product-list-admin'>
                    <Row>
                        <Col className='my-2' xs={12} sm={12} md={6} lg={4} xl={4} xxl={4}>
                            <Card className='productCard shadow'>
                                <Card.Body>This is some text within a card body.</Card.Body>
                            </Card>
                        </Col>
                        <Col className='my-2' xs={12} sm={12} md={6} lg={4} xl={4} xxl={4}>
                            <Card className='productCard shadow'>
                                <Card.Body>This is some text within a card body.</Card.Body>
                            </Card>
                        </Col>
                        <Col className='my-2' xs={12} sm={12} md={6} lg={4} xl={4} xxl={4}>
                            <Card className='productCard shadow'>
                                <Card.Body>This is some text within a card body.</Card.Body>
                            </Card>
                        </Col>
                    </Row>

                </div>

            </Container>
        </body>
    </>)
}

export default OffersDashborard;