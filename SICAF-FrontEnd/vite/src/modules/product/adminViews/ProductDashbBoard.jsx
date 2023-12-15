import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Image, Form, InputGroup, Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";

import ProductRegister from '../adminViews/RegisterProductModal'
import UpdateProduct from './UpdateProductModal';

import NoRegisters from '../../../shared/components/Error/NotRegisters';
import ImageDefault from '../../../assets/logo-sicaf.png'
import getProducts from '../Functions/GetProduct';
import Alert, { confirmTitle, changeStatusFalse, changeStatusTrue, } from "../../../shared/plugins/Alert";
import getByCategory from '../Functions/GetByCategory';
import getCategories from '../../categories/functions/GetAllCategories';
import enableOrDisableProduct from '../Functions/ChangeStatus';


function ProductDashborad() {
  const [modalShow, setModalShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [overlay, setOverlay] = useState(true);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(7);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalList, setOriginalList] = useState([])

  const getProductsByType = async () => {
    switch (category) {
      case 0:
        const filteredProducts = originalList.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(filteredProducts);
        break;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        const response = await getByCategory(category)
        setProducts(response)
        break;
      default:
        getProducts().then((products) => setProducts(products));
        getProducts().then((products) => setOriginalList(products));
    }
  };

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
        const response = await enableOrDisableProduct(id);
        if (!response.error) {
          getProducts().then((products) => setProducts(products));
          getProducts().then((products) => setOriginalList(products));
        }
      },
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
    getCategories().then((categories) => setCategories(categories));
    getProductsByType()
  }, [category, searchTerm, originalList]);

  return (
    <>
      <ProductRegister show={modalShow} onHide={() => setModalShow(false)} />
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
          
          <Form.Select
            value={category}
            onChange={(e) => {
              setCategory(parseInt(e.target.value, 10));
            }}
            aria-label="Categorias"
            className="input-search text-center mx-3"
          >
            <option value={0}>Todas las categorias</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
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

        {products.length > 0 ? (<div className="product-list-admin">
          <Row className="">
            {products.map((product) => (
              <Col
                xs={12}
                sm={6}
                md={2}
                lg={3}
                xl={3}
                xxl={2}
                className="mx mt-3"
                key={product.id}
              >
                <Card className="productCard shadow" style={{ maxHeight: '450px', overflow: 'hidden' }}>
                  <Card.Body>
                    <Image
                      className="mx-auto d-block image_product_offers_Admin text-center shadow"
                      src={
                        product.image.length > 20 ? product.image : ImageDefault
                      }
                      roundedCircle
                    />
                    <b><p className="info_products_offers_admin mt-3">
                      {product.name.length < 30
                        ? product.name
                        : product.name.substring(0, 30) + "..."}
                    </p></b>
                    <p className="info_products_offers_admin">
                      ${product.price}
                    </p>
                    <p className="info_products_offers_admin ">
                      {product.description.length > 22
                        ? product.description.substring(0, 22) + "..."
                        : product.description}
                    </p>
                    {product.discount_id ? (<p className="info_products_offers_admin ">En descuento</p>) : (<p className="info_products_offers_admin error-text">Sin descuento</p>)}

                    <p className="info_products_offers_admin ">stock: {product.stock}</p>
                    <Row>
                      <Col className="text-center">
                        <Button
                          className="py-0 productCardButtons"
                          variant="outline-primary"
                          onClick={() => setSelectedProductId(product.id)}
                        >
                          Editar<FeatherIcon icon="edit-3" size={17} />
                        </Button>
                      </Col>
                      <Col>
                        <OverlayTrigger
                          placement="top"
                          delay={{ show: 250, hide: 150 }}
                          overlay={(props) =>
                            renderTooltip({ ...props, status: product.status })
                          }
                        >
                          <Button
                            className="py-0 px-1 productCardButtons ms-2"
                            variant={
                              product.status
                                ? "outline-success"
                                : "outline-danger"
                            }
                            onClick={() => changeStatus(product.id, product.status)}
                          >
                            {product.status ? (
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
                        <UpdateProduct changed={product}
                          show={selectedProductId === product.id}
                          onHide={() => setSelectedProductId(null)} />
                      </Col>
                    </Row>

                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>) : (<NoRegisters />)}

      </Container>
    </>
  );
}

export default ProductDashborad;
