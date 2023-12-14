import React, { useEffect, useState } from 'react'

import { Modal, Row, Col, Image, Form, InputGroup, Button } from 'react-bootstrap';
import FeatherIcon from "feather-icons-react";
import { useFormik } from "formik";
import * as yup from "yup";

import Alert, { confirmMsj } from "../../../shared/plugins/alerts";
import SaveDiscount from '../functions/SaveDiscount';

const NewDiscountByNumberOfProducs = ({ show, onHide }) => {
    const [imgs, setimgs] = useState()

    const handleChangeImage = (file) => {
        const data = new FileReader()
        data.addEventListener('load', () => {
            setimgs(data.result)
        })
        data.readAsDataURL(file.target.files[0]);
    }

    const handleClose = () => {
        form.resetForm();
        onHide();
    };

    const form =
        useFormik({
            initialValues: {
                type: 'Descuento por total de la compra',
                description: "",
                percentage: 0,
                /*   image: imgs, */
                order_total: 0
            },
            validationSchema: yup.object().shape({
                description: yup.string().min(20, "Mínimo 20 caracteres").required("Campo obligatorio"),
                percentage: yup.number().min(1, "Mínimo 1 caracter").required("Campo obligatorio"),
                /* image: yup.string().nullable().min(1, 'Mínimo 1 caracter img'), */
                order_total: yup.number().required("Campo obligatorio")
            }),
            onSubmit: async (values) => {
                console.log('entra aca');
                await SaveDiscount(values)
            }
        });

    return (<>
        <Form onSubmit={form.handleSubmit}>
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
                    <Modal.Title className="modalTitle">Registrar descuento por cantidad de productos</Modal.Title>
                </Modal.Header>
                <Modal.Body className="productModal">
                    <Row>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlTextarea1" >
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control as="textarea" name="description" rows={3} value={form.values.description} onChange={form.handleChange} />
                                {form.errors.description && (<span className="error-text">{form.errors.description}</span>)}
                            </Form.Group>
                        </Col>
                        {/*  <Col>
                            <Form.Group className="position-relative">
                                <Form.Label className="mb">Foto del producto</Form.Label>
                                <Form.Control
                                    type="file"
                                    className="input-modal"
                                    name="image"
                                    accept="image/png,image/jpeg"
                                    onChange={handleChangeImage}
                                />
                                {form.errors.description && (<span className="error-text">{form.errors.image}</span>)}
                            </Form.Group>
                            <Image
                                src={imgs}
                                width='200px'
                                height='200px'
                                className="mt-2 image-product-modal"
                                rounded
                            />
                        </Col> */}
                    </Row>
                    <Row>
                        <Col>
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
                                    <Button variant="primary" disabled>%</Button>
                                </InputGroup>
                                {form.errors.percentage && (<span className="error-text">{form.errors.percentage}</span>)}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Total de compra</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="number"
                                        name="order_total"
                                        className="input-modal"
                                        value={form.values.order_total}
                                        onChange={form.handleChange}
                                    />
                                    <Button variant="primary" disabled>%</Button>
                                </InputGroup>
                                {form.errors.percentage && (<span className="error-text">{form.errors.order_total}</span>)}
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="productModal">
                    <Form.Group>
                        <Button
                            className="me-2"
                            variant="outline-danger"
                            onClick={handleClose}
                        >
                            <FeatherIcon icon="x" /> &nbsp;Cerrar
                        </Button>
                        <Button
                            disabled={!form.isValid}
                            variant="outline-success"
                            onClick={form.onSubmit}
                        >
                            <FeatherIcon icon="check" /> &nbsp;Guardar
                        </Button>
                    </Form.Group>
                </Modal.Footer>
            </Modal>
        </Form>
    </>)
}


export default NewDiscountByNumberOfProducs;