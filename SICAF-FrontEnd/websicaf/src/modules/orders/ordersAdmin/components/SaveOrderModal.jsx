import React, { useEffect, useState, useContext } from "react";
import { Modal, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import GetUser from "../../../users/Functions/GetUser";
import ActiveDiscount from "./../../../offers/functions/ActiveDiscount";
import getByStatus from "../../../product/Functions/GetBystatus";
import Multiselect from "multiselect-react-dropdown";
import { useFormik } from "formik"; // Changed from Formik, useFormiks
import Alert from "../../../../shared/plugins/Alert";
import SaveOrder from "./../../Functions/SaveOrder";
import { AuthContext } from "../../../auth/authContext";

const SaveOrderModal = ({ isOpen, onClose }) => {
  const { user } = useContext(AuthContext);
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

  
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelect = (selectedList, selectedItem) => {
    // Update the selectedProducts array with quantity property
    const updatedSelectedList = selectedList.map((product) => ({
      id: product.id,
      quantity: 1, // You can set an initial quantity as needed
    }));
    setSelectedProducts(updatedSelectedList);
  };

  const handleRemove = (selectedList, removedItem) => {
    setSelectedProducts(selectedList);
  };

  const handleQuantityChange = (productId, quantity) => {
    const updatedSelectedProducts = selectedProducts.map((product) =>
      product.id === productId ? { ...product, quantity } : product
    );
    setSelectedProducts(updatedSelectedProducts);
    console.log(updatedSelectedProducts);
  };

  const form = useFormik({
    initialValues: {
      employee_id: user.id,
      client_id: 0,
      payment_method: "",
      discount_id: 0,
      comments: "",
      send_receipt: false,
    },
    onSubmit: async (values) => {
      console.log({ ...values, products: selectedProducts });
      return await Alert.fire({
        title: "¿Estas seguro de guardar el pedido??",
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
          await SaveOrder({ ...values, products: selectedProducts });
          handleClose();
          return 
        },
      });
    },
  });
   const handleClose =()=>{
    form.resetForm();
    onClose();
   }

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
                selectedValues={selectedProducts}
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
            {selectedProducts.map((selectedProduct) => (
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