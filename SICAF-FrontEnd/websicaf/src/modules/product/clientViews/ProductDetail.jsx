import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  Image,
  InputGroup,
} from "react-bootstrap";

import FeatherIcon from "feather-icons-react";
import Alert, {
  confirmMsg,
  confirmTitle,
  errorMsg,
  errorTitle,
  successMsg,
  successTitle,
} from "../../../shared/plugins/Alert";
import Image1 from "../../../assets/Products/pastel1.jpeg";

function ProductDetail({ product, show, onHide, onClose }) {
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    /* const user = JSON.parse(localStorage.getItem("user"));
    setUser(user); */
    console.log("asdadasdasdasdasdd", user)
  }, []);
  

  const updateCart = (product_id,product_name,product_price,product_quantity) => {
  
      let userCart = user;
      setCart(userCart.shopping_cart.cart.product);
      console.log("cart detail", cart);

      const newItem = {
        product_id: product_id,
        name: product_name,
        price: product_price,
        quantity: product_quantity,
        price: product_price,
        pre_totalProduct: product_price * product_quantity,
      };

      const newCart = [...cart, newItem];

      userCart.shopping_cart.cart.product = newCart;
      console.log("newCart", newCart);
      console.log("nuevo user", userCart);
    
  };

  if (!show) {
    return null;
  }
  return (
    <>
      <Modal
        onHide={onHide}
        keyboard={false}
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="productModal" closeButton>
          <Modal.Title className="modalTitle">
            Detalles del producto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="productModal">
          <Row>
            <Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
              <Form.Label className="mb">Nombre</Form.Label>
              <Form.Control placeholder={product.name} disabled />
              <Form.Label className="mb mt-3">Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder={product.description}
                disabled
              />
            </Col>
            <Col xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
              <Image
                src={product.image.length > 20 ? product.image : Image1}
                className=" image-product-modal mt-4"
                rounded
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Form.Label className="mb">Precio</Form.Label>
              <InputGroup className="mb-3">
                <Button variant="primary" disabled>
                  $
                </Button>
                <Form.Control placeholder={product.price} disabled />
              </InputGroup>
            </Col>

            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Form.Label className="mb">Cantidad</Form.Label>
              <InputGroup className="mb-3">
                <Button
                  variant="primary"
                  onClick={() => setCount((count) => count - 1)}
                  disabled={count <= 0}
                >
                  {" "}
                  -
                </Button>
                <Form.Control value={count} disabled />
                <Button
                  variant="primary"
                  onClick={() => setCount((count) => count + 1)}
                  disabled={count >= product.stock}
                >
                  {" "}
                  +{" "}
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="productModal">
          <Button
            className="buttonsModal"
            variant="outline-primary"
            disabled={count <= 0}
            onClick={() => {
              updateCart(product.id, product.name, product.price, count);
            }}
          >
            Agregar al carrito <FeatherIcon icon="shopping-cart" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductDetail;
