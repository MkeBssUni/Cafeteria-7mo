import React, { useEffect, useState } from "react";

import {
  Modal,
  Row,
  Col,
  Image,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { useFormik } from "formik";
import * as yup from "yup";
import Multiselect from "multiselect-react-dropdown";

import Alert, { confirmMsj } from "../../../shared/plugins/alerts";
import SaveDiscount from "../functions/SaveDiscount";
import getByStatus from "../../product/Functions/GetBystatus";

const NewDiscountByNumberOfProducs = ({ show, onHide }) => {
  const [imgs, setimgs] = useState();
  const [products, setProducts] = useState([]);

  const handleChangeImage = (file) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setimgs(data.result);
      form.setFieldValue("image", data.result);
    });
    data.readAsDataURL(file.target.files[0]);
  };

  const handleClose = () => {
    form.resetForm();
    onHide();
  };

  const form = useFormik({
    initialValues: {
      type: "Descuento por cantidad de productos",
      description: "",
      percentage: 0,
      image: "",
      products_number: 0,
      products_id: [],
    },
    validationSchema: yup.object().shape({
      description: yup
        .string()
        .min(20, "Mínimo 20 caracteres")
        .required("Campo obligatorio"),
      percentage: yup
        .number()
        .min(1, "Mínimo 1 caracter")
        .required("Campo obligatorio"),
      image: yup.string().nullable().min(1, "Mínimo 1 caracter img"),
      products_number: yup.number().required("Campo obligatorio"),
      products_id: yup
        .array()
        .of(yup.number().min(1, "Mínimo 1 caracter prods"))
        .required("Campo obligatorio"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      await SaveDiscount(values);
      console.log(values, "values");
    },
  });

  const handleSelect = (selectedList, selectedItem) => {
    const selectedIds = selectedList.map((item) => item.id);
    console.log(selectedIds, "lista de IDS");
    form.setFieldValue("products_id", selectedIds);
  };

  useEffect(() => {
    getByStatus(true).then((products) => setProducts(products));
  }, []);

  return (
    <>
      <Form
        onSubmit={form.handleSubmit}
        name="discountCategoryForm"
        id="discountCategoryForm"
      >
        <Modal
          backdrop="static"
          keyboard={false}
          show={show}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="productModal" closeButton>
            <Modal.Title className="modalTitle">
              Registrar descuento por cantidad de productos
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="productModal">
            <Row>
              <Col>
                <Form.Group controlId="exampleForm.ControlTextarea1">
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
                <Form.Group>
                  <Form.Label>Porcentaje</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      name="percentage"
                      className="input-modal"
                      value={form.values.percentage}
                      onChange={form.handleChange}
                    />
                    <Button variant="primary" disabled>
                      %
                    </Button>
                  </InputGroup>
                  {form.errors.percentage && (
                    <span className="error-text">{form.errors.percentage}</span>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Cantidad de productos</Form.Label>
                  <InputGroup>
                    <Button
                      variant="primary"
                      onClick={() =>
                        form.setFieldValue(
                          "products_number",
                          form.values.products_number - 1
                        )
                      }
                      disabled={form.values.products_number <= 0}
                    >
                      {" "}
                      -{" "}
                    </Button>
                    <Form.Control
                      required
                      type="number"
                      name="stock"
                      className="input-modal"
                      value={
                        form.values.products_number < 0
                          ? 0
                          : form.values.products_number
                      }
                      onChange={form.handleChange}
                    />
                    <Button
                      variant="primary"
                      onClick={() =>
                        form.setFieldValue(
                          "products_number",
                          form.values.products_number + 1
                        )
                      }
                    >
                      {" "}
                      +{" "}
                    </Button>
                  </InputGroup>
                  {form.errors.products_number && (
                    <span className="error-text">
                      {form.errors.products_number}
                    </span>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="position-relative">
                  <Form.Label className="mb">Foto del producto</Form.Label>
                  <Form.Control
                    type="file"
                    className="input-modal"
                    name="image"
                    accept="image/png,image/jpeg"
                    onChange={handleChangeImage}
                  />
                  {form.errors.description && (
                    <span className="error-text">{form.errors.image}</span>
                  )}
                </Form.Group>
                <Image
                  src={imgs}
                  width="200px"
                  height="200px"
                  className="mt-2 image-product-modal"
                  rounded
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Productos</Form.Label>
                  <InputGroup>
                    <Multiselect
                      className="input-modal multiselect"
                      options={products}
                      onSelect={(selectedList, selectedItem) => {
                        const updatedList = [...selectedList];
                        handleSelect(updatedList);
                      }}
                      onRemove={(selectedList, removedItem) => {
                        const updatedList = selectedList.filter(
                          (item) => item.id !== removedItem.id
                        );
                        handleSelect(updatedList);
                      }}
                      displayValue="name"
                      style={{
                        chips: {
                          background: "var(--color-tertiary)",
                          color: "var(--color-text)",
                        },
                        searchBox: {
                          border: "none",
                          borderRadius: "0px",
                        },
                      }}
                    />
                  </InputGroup>
                  {form.errors.products_id && (
                    <span className="error-text">
                      {form.errors.products_id}
                    </span>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="productModal">
            <Form.Group>
              <Button
                className="me-2"
                type="button"
                variant="outline-danger"
                onClick={handleClose}
              >
                <FeatherIcon icon="x" /> &nbsp;Cerrar
              </Button>
              <button
                type="submit"
                form="discountCategoryForm"
                disabled={!form.isValid}
                className={"btn btn-outline-success"}
                onClick={form.handleSubmit}
              >
                <FeatherIcon icon="check" /> &nbsp;Guardar
              </button>
            </Form.Group>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
};

export default NewDiscountByNumberOfProducs;
