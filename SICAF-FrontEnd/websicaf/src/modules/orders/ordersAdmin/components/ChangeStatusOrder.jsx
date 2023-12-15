import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useFormik } from "formik";
import Alert from "../../../../shared/plugins/Alert";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import ChangeStatusOrderNew from "../../Functions/ChangeStatusOrder"

const ChangeStatusOrder = ({ orderInfo, isOpen, onClose }) => {
  const form = useFormik({
    initialValues: {
      id: 0,
      status: "",
    },
    onSubmit: async (values) => {
      try {
        const confirmed = await showConfirmationDialog({ ...values, id: orderInfo.id });
        if (confirmed) {
          await ChangeStatusOrderNew({ ...values, id: orderInfo.id });
          handleClose();
        }
      } catch (error) {
        console.error("Error handling status change:", error);
      }
    },
  });

  const showConfirmationDialog = async (values) => {
    return Alert.fire({
      title: "¿Estás seguro de cambiar el estado?",
      text: "¿Seguro de realizar la operación?",
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
        console.log(values);
        return true;
      },
    });
  };

  const handleClose = () => {
    form.resetForm();
    onClose();
  };

  return (
    <>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        show={isOpen}
        onHide={handleClose}
      >
        <Modal.Header>Cambiar Estado de la Orden</Modal.Header>
        <Modal.Body>
          <Form onSubmit={form.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={form.values.status}
                onChange={form.handleChange}
              >
                <option>Escoje una opción</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En preparacion">En preparacion</option>
                <option value="Completada">Completada</option>
                <option value="Cancelada">Cancelada</option>
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
                    <FeatherIcon icon="check" /> &nbsp;Aceptar
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChangeStatusOrder;
