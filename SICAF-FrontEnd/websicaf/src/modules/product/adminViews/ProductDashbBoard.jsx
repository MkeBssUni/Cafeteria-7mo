import {useState} from 'react'

import { Container, Row, Col, Image, Form, InputGroup, Button, Card } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';

import ProductRegister from '../adminViews/RegisterProductModal'
import Image1 from '../../../assets/Products/pastel1.jpeg'
import Image2 from '../../../assets/Products/pastel2.jpeg'


function ProductDashborad() {
  const [modalShow, setModalShow] = useState(false);


  return (
    <>
      <Container fluid>
        <div className='image-top d-flex justify-content-center align-items-center' style={{ width: '100%', height: '300px' }}>
          <Form.Group as={Col} xs='12' md="5" className='mx-5'>
            <InputGroup>
              <Form.Control type="search" className='input-search text-center' placeholder="Buscar" required />
              <Button className='input-search'>
                <FeatherIcon icon="search" />
              </Button>
            </InputGroup>
          </Form.Group>
          <Form.Select as={Col} xs='12' md="1" aria-label="ategorias" className='input-search text-center mx-3'>
            <option>Categorias</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <Button as={Col} xs='12' sm='12' md="1" lg='3' xlg='3' className="input-search text-center mx-3" onClick={() => setModalShow(true)}>Registrar <FeatherIcon icon="plus-circle" /></Button>{' '}
        </div>
        <div className='product-list-admin'>
          <Row className=''>
            <Col xs={12} sm={8} md={4} lg={4} xl={4} xxl={2} className='mx-2 mt-5'>
              <Card className='productCard shadow'>
                <Card.Body >
                  <Image className='mx-auto d-block image_product_offers_Admin text-center shadow' src={Image2} roundedCircle />
                  <p className='info_products_offers mt-2'>Chocochips    175$</p>
                  <p className='info_products_offers_admin '>Galletas de chispas de chocolate</p>
                  <p className='info_products_offers_admin '>Descuento: No aplica</p>
                  <p className='info_products_offers_admin '>stock: 12</p>
                  <div style={{ marginTop: -19 }} className='text-center'>
                    <Button className='py-0 productCardButtons' variant="outline-primary" onClick={() => setModalShow(true)}>
                      Editar <FeatherIcon icon="trash-2" />
                    </Button>
                    <Button className='py-0 px-1 productCardButtons ms-2' variant="outline-primary">
                      Eliminar <FeatherIcon icon="edit-3" />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
          </Row>
        </div>
        <ProductRegister show={modalShow}
        onHide={() => setModalShow(false)}/>
      </Container>
    </>
  );
}

export default ProductDashborad;
