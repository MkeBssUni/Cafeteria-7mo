import { useState, useEffect } from 'react'

import { Container, Row, Col, Image, Form, InputGroup, Button, Card } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';


import Image1 from '../../../assets/Products/pastel1.jpeg'
import Image2 from '../../../assets/Products/pastel2.jpeg'
import ImageDefault from '../../../assets/logo-sicaf.png'

import getProducts from '../Functions/GetProduct';
import getByCategory from '../Functions/GetByCategory';
import getCategories from '../../categories/functions/GetAllCategories';
import ProductRegister from '../adminViews/RegisterProductModal'



function ProductDashborad() {
  const [modalShow, setModalShow] = useState(false);
  const [products, setProducts] = useState([])
  const [overlay, setOverlay] = useState(true)
  const [type, setType] = useState("getAll")
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(1)

  const getProductsByType = () => {
    switch (type) {
      case 'getAll':
        getProducts().then((products) => setProducts(products));
        break;
      case 'category':
        console.log('entra aca', category);
        getByCategory(category).then((products) => setProducts(products));
        console.log(products);
        break;
      default:
        getProducts().then((products) => setProducts(products));
    }
  };


  useEffect(() => {
    getProducts().then((products) => setProducts(products));
    getCategories().then((categories) => setCategories(categories)); // Corregir la variable a 'categories'

    setOverlay(false)

  }, [type, category]);


  return (
    <>
      <Container fluid>
        <div className='image-top d-flex justify-content-center align-items-center' style={{ width: '100%', height: '300px', position: "relative", border: 'none' }}>
          <Form.Group as={Col} xs='12' md="5" className='mx-5'>
            <InputGroup>
              <Form.Control type="search" className='input-search text-center' placeholder="Buscar" required />
              <Button className='input-search'>
                <FeatherIcon icon="search" />
              </Button>
            </InputGroup>
          </Form.Group>
          <Form.Select
            value={category}
            onChange={(e) => {
              setType('category');
              setCategory(parseInt(e.target.value, 10));
              console.log(parseInt(e.target.value, 10)); // Convierte el valor a entero
            }}
            aria-label="Categorias"
            className='input-search text-center mx-3'
          >
            <option value='getAll'>Todas las categorias</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </Form.Select>
          <Button as={Col} xs='12' sm='12' md="1" lg='3' xlg='3' className="input-search text-center mx-3" onClick={() => setModalShow(true)}>Registrar <FeatherIcon icon="plus-circle" /></Button>{' '}
        </div>
        <div className='product-list-admin'>
          <Row className=''>
            {products.map((product) => (
              <Col xs={12} sm={2} md={2} lg={3} xl={3} xxl={2} className='mx mt-3' key={product.id}>
                <Card className='productCard shadow'>
                  <Card.Body >
                    <Image className='mx-auto d-block image_product_offers_Admin text-center shadow' src={product.image.length > 20 ? product.image : ImageDefault} roundedCircle />
                    <p className='info_products_offers mt-3'>{product.name.length < 30 ? product.name : product.name.substring(0, 30) + '...'}</p>
                    <p className='info_products_offers_admin'>${product.price}</p>
                    <p className='info_products_offers_admin '>{product.description.length > 45 ? product.description.substring(0, 45) + "..." : product.description}</p>
                    <p className='info_products_offers_admin '>Descuento: No aplica</p>
                    <p className='info_products_offers_admin '>stock: 12</p>
                    <div className='text-center'>
                      <Button className='py-0 productCardButtons' variant="outline-primary" onClick={() => setModalShow(true)}>
                        Editar  <FeatherIcon icon="edit-3" />
                      </Button>
                      <Button className='py-0 px-1 productCardButtons ms-2' variant="outline-success">
                        Activo <FeatherIcon icon="check" />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <ProductRegister show={modalShow}
          onHide={() => setModalShow(false)} categoriesList={categories} />
      </Container>
    </>
  );
}

export default ProductDashborad;
