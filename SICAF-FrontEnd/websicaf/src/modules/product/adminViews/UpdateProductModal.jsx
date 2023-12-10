import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form, Image, InputGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

import getCategories from "../../categories/functions/GetAllCategories";
import updateProduct from "../Functions/UpdateProduct";
import Alert, { confirmMsj,successMsj } from "../../../shared/plugins/alerts";


export const UpdateProduct = ({ show, onHide,changed }) => {
  const [imgs, setimgs] = useState(changed.image)
  const [base64, setbase64] = useState()
  const [count, setCount] = useState(0);
  const [categories, setCategories] = useState([])



  const handleChangeImage = (file) => {
    const data = new FileReader()
    data.addEventListener('load', () => {
      setbase64(data.result)
      setimgs(data.result)
    })
    data.readAsDataURL(file.target.files[0]);
  }

  const form =
    useFormik({
      initialValues: {
        id:changed.id,
        name: changed.name,
        description: changed.description,
        image: changed.image,
        price: changed.price,
        stock: changed.stock,
        category_id: changed.category.category_id,
      },
      validationSchema: yup.object().shape({
        name: yup
          .string()
          .required("Campo obligatorio")
          .min(4, "Mínimo 4 caracteres"),
        description: yup
          .string()
          .required("Campo obligatorio")
          .min(20, "Mínimo 20 caracteres"),
        price: yup
          .number()
          .required("Campo obligatorio")
          .min(2, "Mínimo 2 caracteres"), // Corregido aquí
        stock: yup
          .number()
          .required("Campo obligatorio")
          .min(1, "Ingresa mínimo un caracter"), // Corregido aquí
        category_id: yup.number().required("Campo obligatorio"), // Corregido aquí
      }),
      onSubmit: async (values) => {
        return await Alert.fire({
          title: "¿Estas seguro de guardar el producto?",
          text: confirmMsj,
          icon: "warning",
          confirmButtonColor: "#009574",
          confirmButtonText: "Aceptar",
          cancelButtonColor: "#DD6B55",
          cancelButtonText: "Cancelar",
          reverseButtons: true,
          backdrop: true,
          showCancelButton: true,
          showLoaderOnConfirm: true,
          allowOutsideClick: () => !Alert.isLoading,
          preConfirm: async () => {
            try {
              const productData = { ...values, image: imgs };
              const response = await updateProduct(productData);
              if (response && !response.error) {
                Alert.fire({
                  title: "Registro realizada exitosamente",
                  text: successMsj,
                  icon: "success",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Aceptar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleClose();
                    window.location.reload();
                  }
                });
              } else {
                Alert.fire({
                  title: "Ups!",
                  text: "Ocurrió un error",
                  icon: "error",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Aceptar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleClose();
                    window.location.reload();
                  }
                });
              }
            } catch (error) {
              console.error(error);
              Alert.fire({
                title: "Ups!",
                text: "Ocurrió un error",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleClose();
                  window.location.reload();
                }
              });
            }
          },
        });
      },
    });

  useEffect(() => {
    getCategories().then((categories) => setCategories(categories));


  }, []);

  const handleClose = () => {
    form.resetForm();
    onHide();
  };

  return (
    <>
      <Modal
        
        keyboard={false}
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="productModal" closeButton>
          <Modal.Title className="modalTitle">Registrar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body className="productModal">
          <Form onSubmit={form.handleSubmit}>
            <Row>
              <Form.Group as={Col} md="5">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  className="input-modal"
                  value={form.values.name}
                  onChange={form.handleChange}
                />
                {form.errors.name && (
                  <span className="error-text">{form.errors.name}</span>
                )}
              </Form.Group>
              <Form.Group as={Col} md="7" className="position-relative mb-3">
                <Form.Label className="mb">Foto del producto</Form.Label>
                <Form.Control
                  type="file"
                  className="input-modal"
                  name="image"
                  accept="image/png,image/jpeg"
                  onChange={handleChangeImage}
                />
              </Form.Group>
            </Row>
            <Row>
              <Col md={5}>
                <Row>
                  <Form.Group controlId="validationCustom01">
                    <Form.Label className="mb">Precio</Form.Label>
                    <InputGroup>
                      <Button variant="primary" disabled>$</Button>
                      <Form.Control
                        required
                        type="number"
                        name="price"
                        className="input-modal"
                        value={form.values.price}
                        onChange={form.handleChange}
                      />
                    </InputGroup>
                    {form.errors.price && (
                      <span className="error-text">{form.errors.price}</span>
                    )}
                  </Form.Group>
                </Row>
                <Row className="">
                  <Form.Group controlId="validationCustom01" className="mt-2">
                    <Form.Label className="mb">Disponibilidad</Form.Label>
                    <InputGroup>
                      <Button variant="primary" onClick={() => form.setFieldValue('stock', form.values.stock - 1)} disabled={form.values.stock <= 0}> -</Button>
                      <Form.Control required type="number" name="stock" className="input-modal" value={form.values.stock < 0 ? 0 : form.values.stock} onChange={form.handleChange} />
                      <Button variant="primary" onClick={() => form.setFieldValue('stock', form.values.stock + 1)}> + </Button>
                    </InputGroup>
                    {form.errors.stock && (<span className="error-text">{form.errors.stock}</span>)}
                  </Form.Group>
                </Row>
                <Row className="">
                <Form.Group controlId="validationCustom01" className="mt-2">
                <Form.Label className="mb">Categoria</Form.Label>
                  <Form.Select name="category_id" value={form.values.category_id} aria-label="Categorias" className="input-modal" onChange={form.handleChange}>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                  
                </Row>
              </Col>
              <Col md={7} className="text-center">
                <Image
                  src={imgs}
                  width='200px'
                  height='200px'
                  className="mt-4 image-product-modal"
                  rounded
                />
              </Col>
            </Row>
            <Row>
              <Col className="mt-2">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={3}
                    value={form.values.description}
                    onChange={form.handleChange}
                  />
                  {form.errors.description && (
                    <span className="error-text">
                      {form.errors.description}
                    </span>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group>
                <Button
                  className="me-2"
                  variant="outline-danger"
                  onClick={handleClose}
                >
                  <FeatherIcon icon="x" /> &nbsp;Cerrar
                </Button>
                <Button disabled={!form.isValid}  type="submit" onClick={form.onSubmit} variant="outline-success">
                  <FeatherIcon icon="check" /> &nbsp;Guardar
                </Button>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateProduct;
