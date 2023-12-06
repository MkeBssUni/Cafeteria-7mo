import { useState } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  InputGroup,
  Image,
} from "react-bootstrap";

import * as formik from "formik";
import * as yup from "yup";

import Image1 from "../../../assets/Products/pastel1.jpeg";

function ProductRegister(props) {
  const [validated, setValidated] = useState(false);
  const { Formik } = formik;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    file: yup.mixed().required(),
    terms: yup.bool().required().oneOf([true], "terms must be accepted"),
  });

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="productModal" closeButton>
          <Modal.Title className="modalTitle">Editar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body className="productModal">
          <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
              firstName: "chocochips",
              lastName: "galletas de chispas de chocolate",
              username: "",
              city: "",
              state: "",
              zip: "",
              file: null,
              terms: false,
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Form.Group as={Col} md="5" controlId="validationCustom01">
                    <Form.Label className="mb">Nombre</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      className="input-modal"
                    />
                    <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="7"
                    className="position-relative mb-3"
                  >
                    <Form.Label className="mb">Foto del producto</Form.Label>
                    <Form.Control
                      type="file"
                      required
                      className="input-modal"
                      name="file"
                      onChange={handleChange}
                      isInvalid={!!errors.file}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.file}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Col md={5}>
                    <Row>
                      <Form.Group controlId="validationCustom01">
                        <Form.Label className="mb">Precio</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          name="firstName"
                          placeholder="First name"
                          className="input-modal"
                        />
                        <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mt-3">
                      <Form.Group controlId="validationCustom01">
                        <Form.Label className="mb">Disponibilidad</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          name="firstName"
                          placeholder="First name"
                          className="input-modal"
                        />
                        <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                  </Col>
                  <Col md={7} className="text-center">
                    <Image
                      src={Image1}
                      className="mt-4 image-product-modal"
                      rounded
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer className="productModal">
          <Button
            className="buttonsModal"
            variant="outline-danger"
            onClick={props.onHide}
          >
            Cancelar
          </Button>
          <Button
            className="buttonsModal"
            variant="outline-success"
            onClick={props.onHide}
          >
            Registrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductRegister;
