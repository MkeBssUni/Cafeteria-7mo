import React, { useEffect, useState, useContext } from "react";
import { Modal, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import Alert from "../../../../shared/plugins/Alert";
import { AuthContext } from "../../../auth/authContext";
import { useFormik } from "formik";
import saveOnlineOrder from "./../Functions/saveOnlineOrder";

const SaveOnlineOrders = ({ isOpen, onClose, carritoCompras }) => {
  const { user } = useContext(AuthContext);

  const form = useFormik({
    initialValues: {
      client_id: user.id,
      payment_method: "", //Tarjeta de credito o Tarjeta de debito
      discount_id: 26, //opcional
      products: [],
    },
    onSubmit: async (values) => {
      console.log({ ...values, products: selectedProducts });
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
          handleClose();
          return await saveOnlineOrder({
            ...values,
            products: carritoCompras.cart.product,
          });
        },
      });
    },
  });

  const handleClose = () => {
    form.resetForm();
    onClose();
  };

  return (
    <Modal
      size="lg"
      backdrop="static"
      keyboard={false}
      show={isOpen}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Registrar Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={form.handleSubmit}>
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
                  <FeatherIcon icon="check" /> &nbsp;Confirmar Compra
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SaveOnlineOrders;
