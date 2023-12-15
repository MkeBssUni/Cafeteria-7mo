import { useState } from "react";
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
import CreateProduct from "../Functions/CreateProduct";

function ProductDetail({ show, onHide, product }) {
  const [count, setCount] = useState(0);
  if (!product) return <></>;
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
          >
            Agregar al carrito <FeatherIcon icon="shopping-cart" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductDetail;
