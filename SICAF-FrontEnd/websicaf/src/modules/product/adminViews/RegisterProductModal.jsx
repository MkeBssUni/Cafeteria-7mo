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
  const [imageBase64, setImageBase64] = useState(null);
  const { Formik } = formik;

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setImageBase64(base64String);
        console.log(base64String); // Aquí obtienes la representación base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  
    setValidated(true);
  
    const { values } = event;  // Accede a los valores del formulario a través de Formik
    handleFormSubmit(values);
  };

  const handleFormSubmit = (formData) => {
    console.log("Datos del formulario:", formData);
  };

  const schema = yup.object().shape({
    name: yup.string().required("Nombre es requerido"),
    description: yup.string().required("Campo obligatorio"),
    image: yup.string().required("Campo obligatorio"),
    price: yup.number().required("Campo obligatorio"),
    stock: yup.number().required("Campo obligatorio"),
    category_id: yup.number().required("Campo obligatorio"),
  });

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{
          name: "",
          description: "",
          image: "",
          price: "",
          stock: "",
          category_id: 1,
        }}
      >
        {({ handleSubmit,errors }) => (
          <Form
            noValidate
            validated={validated}
          >
            <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
            >
              <Modal.Header className="productModal" closeButton>
                <Modal.Title className="modalTitle">
                  Registrar producto
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="productModal">
                <Row>
                  <Form.Group as={Col} md="5" controlId="validationCustom01">
                    <Form.Label className="mb">Nombre</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="name"
                      placeholder="Galletas de chocolate..."
                      className="input-modal"
                    />
                    <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.file}
                    </Form.Control.Feedback>
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
                      name="image"
                      onChange={handleImageChange}
                      isInvalid={!!errors.image}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.image}
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
                          name="price"
                          placeholder="150.50"
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
                          name="stock"
                          placeholder="10"
                          className="input-modal"
                        />
                        <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                  </Col>
                  <Col md={7} className="text-center">
                    {imageBase64 && (
                      <Image
                        src={Image1}
                        className="mt-4 image-product-modal"
                        rounded
                      />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-2">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                  </Col>
                </Row>
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
                  type="submit" 
                  onClick={handleSubmit}
                >
                  Registrar
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ProductRegister;
