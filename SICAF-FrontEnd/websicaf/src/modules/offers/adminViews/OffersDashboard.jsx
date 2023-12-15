import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Form, InputGroup, Button, Tooltip, Card, OverlayTrigger, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import FeatherIcon from "feather-icons-react";

import RegisterDiscountForRol from './NewDiscountForRol';
import NewDiscountByCategory from './NewDiscountByCategory';
import RegisterDiscountByOrderTotal from './NewDiscountByTotalOrder'
import NewDiscountByNumberOfProducs from './NewDiscountbyNumberOfProducts';
import NewDiscountByProduct from './NewDiscountByProduct';

import RegisterDiscount from './RegisterDiscount';
import EnableOrDisableDiscount from '../functions/EnableOrDisableDiscount'
import GetAllDiscount from '../functions/GetAllDiscount';

import NotRegisters from "../../../shared/components/Error/NotRegisters";
import logo from '../../../assets/logo-sicaf.png'

import Alert, { confirmTitle, changeStatusFalse, changeStatusTrue, } from "../../../shared/plugins/Alert";

const OffersDashborard = () => {
    const [modalShow, setModalShow] = useState(false);
    const [byOrderTotal, setByordertotal] = useState(false)
    const [numberProouct, setNumberProouct] = useState(false);
    const [byProduct, setbyProduct] = useState(false);
    const [byCategory, setbyCategory] = useState(false);
    const [discounts, setDiscounts] = useState([]);
    const [category, setCategory] = useState("Todos");
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [originalList, setOriginalList] = useState([])


    const getDiscountByType = async () => {
        var gets = await GetAllDiscount();
        var byRol = gets.discountsByRol || [];
        var byCategory = gets.discountsByCategory || [];
        var byTotal = gets.discountsByOrderTotal || [];
        var byCantByProducts = gets.discountsByProductsNumber || [];
        var byProduct = gets.discountsByProduct || [];
        switch (category) {
            case "Todos":
                var descuentos = [...byRol, ...byCategory, ...byTotal, ...byCantByProducts, ...byProduct];
                setDiscounts(descuentos)
                setOriginalList(descuentos)
                break;
            case "Descuento por rol":
                setDiscounts(byRol)
                break;
            case "Descuento por categoria":
                setDiscounts(byCategory)
                break;
            case "Descuento por total de compra":
                setDiscounts(byTotal)
                break
            case "Descuento por cantidad de productos":
                setDiscounts(byCantByProducts)
                break
            case "Descuento por producto":
                setDiscounts(byProduct)
                break;
            case "busqueda":
                const filteredDiscounts = originalList.filter(discount =>
                    discount.description.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setDiscounts(filteredDiscounts);
                break;
            default:
                gets = await GetAllDiscount();
                byRol = gets.discountsByRol || [];
                byCategory = gets.discountsByCategory || [];
                byTotal = gets.discountsByOrderTotal || [];
                byCantByProducts = gets.discountsByProductsNumber || [];
                byProduct = gets.discountsByProduct || [];
                descuentos = [...byRol, ...byCategory, ...byTotal, ...byCantByProducts, ...byProduct];
                setDiscounts(descuentos)
                setOriginalList(descuentos)
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
            preConfirm: async () => {
                const response = await EnableOrDisableDiscount(id);
                if (!response.error) {
                    const disc = await GetAllDiscount();
                    const arraydisCounts = [];
                    Object.values(disc).forEach((discountArray) => {
                        arraydisCounts.push(...discountArray);
                    });
                    setDiscounts(arraydisCounts);
                }
            },
        });
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-top" {...props}>
            {props.status
                ? "El Descuento es visible para los usuarios"
                : "El Descuento no es visible para los usuarios"}
        </Tooltip>
    );

    useEffect(() => {
        getDiscountByType();
    }, [searchTerm, category]);


    return (<>
        <body>
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
                                    setCategory(target.value.length > 0 ? 'busqueda' : "Todos");
                                }}
                            />
                            <Button className="input-search">
                                <FeatherIcon icon="search" />
                            </Button>
                        </InputGroup>
                    </Form.Group>

                    <Form.Select className="input-search text-center mx-4" onChange={({ target }) => {
                        setCategory(target.value);
                    }}>
                        <option value='Todos'>Todos los descuentos</option>
                        <option value='Descuento por rol'>Descuento por rol</option>
                        <option value='Descuento por total de compra'>Descuento por total de compra</option>
                        <option value='Descuento por categoria'>Descuento por categoria</option>
                        <option value='Descuento por cantidad de productos'>Descuento por cantidad de productos</option>
                        <option value='Descuento por producto'>Descuento por producto</option>
                    </Form.Select>

                    <Col
                        xs="12"
                        sm="12"
                        md="1"
                        lg="3"
                        xlg="3">
                        <Dropdown >
                            <Dropdown.Toggle className='input-search'>Registrar <FeatherIcon icon="plus-circle" /></Dropdown.Toggle>
                            <Dropdown.Menu className='input-search'>
                                <Dropdown.Item as={Button} eventKey="1" onClick={() => setModalShow(true)}>Descuento por rol</Dropdown.Item>
                                <Dropdown.Item as={Button} eventKey="2" onClick={() => setByordertotal(true)}>Descuento por total de compra</Dropdown.Item>
                                <Dropdown.Item as={Button} eventKey="3" onClick={() => setNumberProouct(true)}>Descuento cantidad de producto</Dropdown.Item>
                                <Dropdown.Item as={Button} eventKey="4" onClick={() => setbyProduct(true)}>Descuento por producto</Dropdown.Item>
                                <Dropdown.Item as={Button} eventKey="5" onClick={() => setbyCategory(true)}>Descuento por categoria</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </div>
            {/* <RegisterDiscount show={modalShow} onHide={() => setModalShow(false)} /> */}
            <RegisterDiscountForRol show={modalShow} onHide={() => setModalShow(false)} />
            <RegisterDiscountByOrderTotal show={byOrderTotal} onHide={() => setByordertotal(false)} />
            <NewDiscountByCategory show={byCategory} onHide={() => setbyCategory(false)} />
            <NewDiscountByNumberOfProducs show={numberProouct} onHide={() => setNumberProouct(false)} />
            <NewDiscountByProduct show={byProduct} onHide={() => setbyProduct(false)} />
            <Container fluid>
                
                {discounts.length > 0 ? (
                    <div className='product-list-admin'><Row>
                        {discounts.map((discount) => (
                            <Col className='my-2' xs={12} sm={12} md={6} lg={4} xl={4} xxl={4} key={discount.id} >
                                <Card className='productCard shadow'>
                                    <Card.Body>
                                        <Row>
                                            <Col xs={12} md={3}>
                                                <div className="imagewithoffer mt-2">
                                                    <Image className='image_product_offers my-2 shadow' src={discount.image ? (discount.image) : logo} roundedCircle />
                                                    <div className="notification-icon shadow">-{discount.percentage}%</div>
                                                </div>
                                            </Col>
                                            <Col xs={12} md={8} className='mx-2 my-2'>
                                                <div>
                                                    <p className='info_products_offers mt-2 ms-4'>{discount.description}</p>
                                                </div>
                                                <div>
                                                    <Row>
                                                        <Col className="text-center">
                                                            <Button
                                                                className="py-0"
                                                                variant="outline-primary"
                                                                onClick={() => setSelectedProductId(discount.id)}
                                                            >
                                                                Editar<FeatherIcon icon="edit-3" size={17} />
                                                            </Button>
                                                        </Col>
                                                        <Col>
                                                            <OverlayTrigger
                                                                placement="top"
                                                                delay={{ show: 250, hide: 150 }}
                                                                overlay={(props) =>
                                                                    renderTooltip({ ...props, status: discount.status })
                                                                }
                                                            >
                                                                <Button
                                                                    className="py-0 px-1 ms-2"
                                                                    variant={
                                                                        discount.status
                                                                            ? "outline-success"
                                                                            : "outline-danger"
                                                                    }
                                                                    onClick={() => changeStatus(discount.id, discount.status)}
                                                                >
                                                                    {discount.status ? (
                                                                        <>
                                                                            Activo <FeatherIcon icon="check" size={17} />
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            Inactivo <FeatherIcon icon="x" size={17} />
                                                                        </>
                                                                    )}
                                                                </Button>
                                                            </OverlayTrigger>
                                                            {/*  <UpdateProduct changed={product}
                                                            show={selectedProductId === product.id}
                                                            onHide={() => setSelectedProductId(null)} /> */}
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}</Row>
                    </div>
                ) : (
                    <NotRegisters />
                )}

            </Container>
        </body>
    </>)
}

export default OffersDashborard;