import { useState } from "react";
import { Modal, Button, Row, Col, Form, InputGroup } from "react-bootstrap";

import * as formik from 'formik';
import * as yup from 'yup';

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
    terms: yup.bool().required().oneOf([true], 'terms must be accepted'),
  });

  return (
    <>
      
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered >
        <Modal.Header className="productModal" closeButton>
          <Modal.Title className="modalTitle">
            Editar product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="productModal">
          <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
              firstName: 'chocochips',
              lastName: 'galletas de chispas de chocolate',
              username: '',
              city: '',
              state: '',
              zip: '',
              file: null,
              terms: false,
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Form.Group as={Col} md="4" controlId="validationCustom01" >
                    <Form.Label className="mb-0">Nombre</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      className="input-modal"
                    />
                    <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label className="mb-0">Foto del producto</Form.Label>
                    <Form.Control
                      required
                      name="lastName"
                      type="text"
                      placeholder="..."
                      disabled
                      className="input-modal"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="4" className="position-relative mb-3">
                  <Form.Label className="mb-0"> </Form.Label>
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
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer className="productModal">
          <Button className="buttonsModal" variant="outline-danger" onClick={props.onHide}>Cancelar</Button>
          <Button className="buttonsModal" variant="outline-success" onClick={props.onHide}>Registrar</Button>
        </Modal.Footer>
      </Modal >
    </>
  );
}

export default ProductRegister;
