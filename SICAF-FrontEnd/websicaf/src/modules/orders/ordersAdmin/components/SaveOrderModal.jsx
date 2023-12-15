import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import GetUser from "../../../users/Functions/GetUser";
import ActiveDiscount from "./../../../offers/functions/ActiveDiscount";
import getByStatus from "../../../product/Functions/GetBystatus";
import Multiselect from "multiselect-react-dropdown";
import { useFormik } from "formik"; // Changed from Formik, useFormik
import * as yup from "yup";
import Alert from "../../../../shared/plugins/Alert";
import SaveOrder from "./../../Functions/SaveOrder";

const SaveOrderModal = ({ isOpen, onClose }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [descuentos, setDescuentos] = useState([]);
  const [productsGet, setProducts] = useState([]);

  const getUsuarios = async () => {
    try {
      const data = await GetUser();
      if (!data.error) {
        setUsuarios(data);
      }
    } catch (error) {
      console.error("Error en el servicio de usuarios");
    }
  };

  const getDescuentos = async () => {
    try {
      const data = await ActiveDiscount();
      if (!data.error) {
        setDescuentos(data.discountsByProduct);
      }
    } catch (error) {
      console.error("Error en el servicio de descuentos");
    }
  };

  useEffect(() => {
    getByStatus(true).then((products) => setProducts(products));
    getUsuarios();
    getDescuentos();
  }, []);

  
  const form = useFormik({
    initialValues: {
      employee_id: 1,
      client_id: 0, //opcional
      payment_method: "", //Efectivo, Tarjeta de credito o Tarjeta de debito
      discount_id: 0, //opcional
      products: [], // Fixed typo from 'products' to 'products_id'
      comments: "",
      send_receipt: true, //opcional en relación al cliente
    },
    validationSchema: yup.object().shape({
      employee_id: yup.number().required("Campo obligatorio"), //opcional
      payment_method: yup.number().required("Campo obligatorio"), //Efectivo, Tarjeta de credito o Tarjeta de debito //opcional
      comments: yup
        .string()
        .max(4, "No se pueden agregar mas de 30 caracteres")
        .min(5, "Extiende le mensaje es muy corto"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      return await Alert.fire({
        title: "¿Estas seguro de guardar el usuario?",
        text: "Seguro de realizar la operación",
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
          return await SaveOrder(values);
        },
      });
    },
  });

  const handleSelect = (selectedList, selectedItem) => {
    // Update the products_id array with quantity property
    const updatedSelectedList = selectedList.map((product) => ({
      ...product,
      quantity: 1, // You can set an initial quantity as needed
    }));
    form.setFieldValue("products", updatedSelectedList);
  };

  const handleRemove = (selectedList, removedItem) => {
    form.setFieldValue("products", selectedList);
  };

  const handleQuantityChange = (productId, quantity) => {
    const updatedProducts = form.values.products.map((product) =>
      product.id === productId ? { ...product, quantity } : product
    );
    form.setFieldValue("products", updatedProducts);
    console.log(updatedProducts);
  };

  return (
    <Modal
      size="lg"
      backdrop="static"
      keyboard={false}
      show={isOpen}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Registrar Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={form.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Cliente</Form.Label>
                <Form.Control
                  as="select"
                  name="client_id"
                  value={form.values.client_id}
                  onChange={form.handleChange}
                >
                  <option>Escoje una opción</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.user_id} value={usuario.user_id}>
                      {usuario.person.name} {usuario.person.lastname}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-2 mt-2">
                <Form.Label>Método de pago</Form.Label>
                <Form.Control
                  as="select"
                  name="payment_method"
                  value={form.values.payment_method}
                  onChange={form.handleChange}
                >
                  <option>Escoje una opción</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta de credito">Tarjeta de credito</option>
                  <option value="Tarjeta de debito">Tarjeta de debito</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-2 mt-2">
                <Form.Label>Tipo de descuento</Form.Label>
                <Form.Control
                  as="select"
                  name="discount_id"
                  value={form.values.discount_id}
                  onChange={form.handleChange}
                >
                  <option>Escoje una opción</option>
                  {Array.isArray(descuentos) &&
                    descuentos.map((descuento) => (
                      <option key={descuento.id} value={descuento.id}>
                        {descuento.type} {descuento.percentage}%
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-2 mt-2">
                <Form.Label>Comentarios</Form.Label>
                <Form.Control
                  as="textarea"
                  name="comments"
                  value={form.values.comments}
                  onChange={form.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Mandar recibo"
                  name="send_receipt"
                  checked={form.values.send_receipt}
                  onChange={form.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2 mt-2">
                <Form.Label>Productos</Form.Label>
                <InputGroup>
                  <Multiselect
                    className="input-modal multiselect"
                    options={productsGet}
                    selectedValues={form.values.products}
                    onSelect={handleSelect}
                    onRemove={handleRemove}
                    displayValue="name"
                    style={{
                      chips: {
                        background: "var(--color-tertiary)",
                      },
                      searchBox: {
                        border: "none",
                        borderRadius: "0px",
                      },
                    }}
                  />
                </InputGroup>
                {form.values.products.map((selectedProduct) => (
                  <div key={selectedProduct.id}>
                    <label htmlFor={`quantity-${selectedProduct.id}`}>
                      Cantidad para {selectedProduct.name}:
                    </label>
                    <input
                      type="number"
                      id={`quantity-${selectedProduct.id}`}
                      value={selectedProduct.quantity}
                      onChange={(e) =>
                        handleQuantityChange(selectedProduct.id, e.target.value)
                      }
                    />
                  </div>
                ))}
              </Form.Group>
          <Form.Group className="mb-2 mt-2">
            <Row>
              <Col className="text-end">
                <Button
                  className="me-2"
                  variant="outline-danger"
                  onClick={onClose}
                >
                  <FeatherIcon icon="x" /> &nbsp;Cerrar
                </Button>
                <Button type="submit" variant="outline-success">
                  <FeatherIcon icon="check" /> &nbsp;Cobrar
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SaveOrderModal;
