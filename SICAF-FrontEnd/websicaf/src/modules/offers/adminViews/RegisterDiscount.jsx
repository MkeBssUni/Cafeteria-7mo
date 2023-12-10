import React, { useEffect, useState } from 'react'
import { Modal, Row, Col, Image, Form, InputGroup, Button } from 'react-bootstrap';
import FeatherIcon from "feather-icons-react";
import {Formik, useFormik } from "formik";
import * as yup from "yup";
import Multiselect from 'multiselect-react-dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SaveDiscount from '../functions/SaveDiscount';
import Alert, { confirmTitle, changeStatusFalse, changeStatusTrue, confirmMsj, successMsj } from "../../../shared/plugins/alerts";
import getCategories from "../../categories/functions/GetAllCategories";

import getByStatus from '../../product/Functions/GetBystatus';

const RegisterDiscount = ({ show, onHide }) => {
    const [imgs, setimgs] = useState()
    const [types, setType] = useState()
    const [products, setProducts] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [categories, setCategories] = useState([])

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
    useEffect(() => {
        getByStatus(true).then((products) => setProducts(products));
        getCategories().then((categories) => setCategories(categories));
    }, []);

    const form =
        useFormik({
            initialValues: {
                type: types,
                description: "",
                percentage: 0,
                start_date: new Date(),
                end_date: new Date(),
                order_total: 0,
                products_number: 0,
                image: "",
                rol_id: 0,
                category_id: 1,
                products_id: [],
            },
            validationSchema: yup.object().shape({
                type: yup.string().required("Campo obligatorio"),
                description: yup.string().min(20, "Mínimo 20 caracteres d").required("Campo obligatorio"),
                percentage: yup.number().min(1, "Mínimo 1 caracter %").required("Campo obligatorio"),
                start_date: yup.date().min(new Date(), 'La fecha de inicio no puede ser anterior al día actual').nullable(),
                end_date: yup.date().min(new Date(), 'La fecha de fin no puede ser anterior al día actual').nullable(),
                order_total: yup.number().nullable().min(1, 'Mínimo 1 caracter ot'),
                products_number: yup.number().nullable().min(1, 'Mínimo 1 caracter'),
                image: yup.string().nullable().min(1, 'Mínimo 1 caracter img'),
                rol_id: yup.number().nullable().min(1, 'Mínimo 1 caracter rol'),
                category_id: yup.number().nullable().min(1, 'Mínimo 1 caracter catId'),
                products_id: yup.array().of(yup.number().min(1, 'Mínimo 1 caracter prods')).nullable(),
            }),
            onSubmit: async (values) => {
                console.log('entra aca', values);
                return await Alert.fire({
                    title: "¿Estas seguro de guardar el descuento?",
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
                            const Data = { ...values, image: imgs };
                            const response = await SaveDiscount(Data);
                            if (response && !response.error) {
                                Alert.fire({
                                    title: "Registro realizado exitosamente",
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

    return (<>
        <Formik {...form}>
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
                        <Modal.Title className="modalTitle">Registrar descuento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="productModal">
                        <Form.Select name="type" value={form.values.type} aria-label="Tipo de descuento" className="input-modal" onChange={({ target }) => {
                            setType(target.value)
                        }}>
                            <option value='Descueto por rol'>Descuento por rol</option>
                            <option value='Descuento por total de compra'>Descuento por total de compra</option>
                            <option value='Descuento por categoria'>Descuento por categoria</option>
                            <option value='Descuento por cantidad de productos'>Descuento por cantidad de productos</option>
                            <option value='Descuento por producto'>Descuento por producto</option>
                        </Form.Select>
                        {types === 'Descueto por rol' && <div>
                        <Row>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlTextarea1" >
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" name="description" rows={7} value={form.values.description} onChange={form.handleChange} />
                                    {form.errors.description && (
                                        <span className="error-text">
                                            {form.errors.description}
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
                                        <span className="error-text">
                                            {form.errors.image}
                                        </span>
                                    )}
                                </Form.Group>
                                <Image
                                    src={imgs}
                                    width='200px'
                                    height='200px'
                                    className="mt-2 image-product-modal"
                                    rounded
                                />
                            </Col>
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
                                    {form.errors.percentage && (
                                        <span className="error-text">{form.errors.percentage}</span>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Rol al que se le aplicara</Form.Label>
                                    <Form.Select name="type" value={form.values.rol_id} aria-label="Rol al que se le aplicara el descuento" className="input-modal" onChange={form.handleChange}>
                                        <option value={1}>Gerente</option>
                                        <option value={2}>Empleado</option>
                                        <option value={3}>Cliente</option>
                                    </Form.Select>
                                    {form.errors.rol_id && (
                                        <span className="error-text">
                                            {form.errors.rol_id}
                                        </span>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                    </div>} 

                    {types === 'Descuento por total de compra' && <div>
                        <Row>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlTextarea1" >
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" name="description" rows={7} value={form.values.description} onChange={form.handleChange} />
                                    {form.errors.description && (
                                        <span className="error-text">
                                            {form.errors.description}
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
                                        <span className="error-text">
                                            {form.errors.image}
                                        </span>
                                    )}
                                </Form.Group>
                                <Image
                                    src={imgs}
                                    width='200px'
                                    height='200px'
                                    className="mt-2 image-product-modal"
                                    rounded
                                />
                            </Col>
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
                                    {form.errors.percentage && (
                                        <span className="error-text">{form.errors.percentage}</span>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Total de la compra</Form.Label>
                                    <InputGroup>
                                        <Button variant="primary" disabled>$</Button>
                                        <Form.Control
                                            type="number"
                                            name="order_total"
                                            className="input-modal"
                                            value={form.values.order_total}
                                            onChange={form.handleChange}
                                        />
                                    </InputGroup>
                                    {form.errors.percentage && (
                                        <span className="error-text">{form.errors.order_total}</span>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                    </div>}

                    {types === 'Descuento por producto' && <div>
                        <Row>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlTextarea1" >
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" name="description" rows={7} value={form.values.description} onChange={form.handleChange} />
                                    {form.errors.description && (
                                        <span className="error-text">
                                            {form.errors.description}
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
                                        <span className="error-text">
                                            {form.errors.image}
                                        </span>
                                    )}
                                </Form.Group>
                                <Image
                                    src={imgs}
                                    width='200px'
                                    height='200px'
                                    className="mt-2 image-product-modal"
                                    rounded
                                />
                            </Col>
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
                                    {form.errors.percentage && (
                                        <span className="error-text">{form.errors.percentage}</span>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Productos</Form.Label>
                                    <InputGroup>
                                        <Multiselect
                                            className="input-modal multiselect"
                                            options={products}
                                            selectedValues={form.values.products_id}
                                            onSelect={(selectedList, selectedItem) => {
                                                form.setFieldValue('products_id', selectedList);
                                            }}
                                            onRemove={(selectedList, removedItem) => {
                                                form.setFieldValue('products_id', selectedList);
                                            }}
                                            displayValue="name"
                                            style={{
                                                chips: {
                                                    background: 'var(--color-tertiary)'
                                                },
                                                searchBox: {
                                                    border: 'none',
                                                    borderRadius: '0px'
                                                }
                                            }}


                                        />
                                    </InputGroup>
                                    {form.errors.percentage && (
                                        <span className="error-text">{form.errors.products_id}</span>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>}

                    {types === 'Descuento por cantidad de productos' && <div>
                        <Row>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlTextarea1" >
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" name="description" rows={7} value={form.values.description} onChange={form.handleChange} />
                                    {form.errors.description && (
                                        <span className="error-text">
                                            {form.errors.description}
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
                                        <span className="error-text">
                                            {form.errors.image}
                                        </span>
                                    )}
                                </Form.Group>
                                <Image
                                    src={imgs}
                                    width='200px'
                                    height='200px'
                                    className="mt-2 image-product-modal"
                                    rounded
                                />
                            </Col>
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
                                    {form.errors.percentage && (
                                        <span className="error-text">{form.errors.percentage}</span>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Cantidad de productos</Form.Label>
                                    <InputGroup>
                                        <Button variant="primary" onClick={() => form.setFieldValue('products_number', form.values.products_number - 1)} disabled={form.values.products_number <= 0}> - </Button>
                                        <Form.Control required type="number" name="stock" className="input-modal" value={form.values.products_number < 0 ? 0 : form.values.products_number} onChange={form.handleChange} />
                                        <Button variant="primary" onClick={() => form.setFieldValue('products_number', form.values.products_number + 1)}> + </Button>
                                    </InputGroup>
                                    {form.errors.percentage && (
                                        <span className="error-text">{form.errors.products_number}</span>
                                    )}
                                </Form.Group>
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
                                            selectedValues={form.values.products_id}
                                            onSelect={(selectedList, selectedItem) => {
                                                form.setFieldValue('products_id', selectedList);
                                            }}
                                            onRemove={(selectedList, removedItem) => {
                                                form.setFieldValue('products_id', selectedList);
                                            }}
                                            displayValue="name"
                                            style={{
                                                chips: {
                                                    background: 'var(--color-tertiary)'
                                                },
                                                searchBox: {
                                                    border: 'none',
                                                    borderRadius: '0px'
                                                }
                                            }}


                                        />
                                    </InputGroup>
                                    {form.errors.percentage && (
                                        <span className="error-text">{form.errors.products_idl}</span>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>}


                        {types === 'Descuento por categoria' && <div>
                            <Row>
                                <Col>
                                    <Form.Group controlId="exampleForm.ControlTextarea1" >
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control as="textarea" name="description" rows={7} value={form.values.description} onChange={form.handleChange} />
                                        {form.errors.description && (
                                            <span className="error-text">
                                                {form.errors.description}
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
                                            <span className="error-text">
                                                {form.errors.image}
                                            </span>
                                        )}
                                    </Form.Group>
                                    <Image
                                        src={imgs}
                                        width='200px'
                                        height='200px'
                                        className="mt-2 image-product-modal"
                                        rounded
                                    />
                                </Col>
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
                                        {form.errors.percentage && (
                                            <span className="error-text">{form.errors.percentage}</span>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="validationCustom01">
                                        <Form.Label>Categoria</Form.Label>
                                        <Form.Select name="category_id" value={form.values.category_id} aria-label="Categorias" className="input-modal" onChange={form.handleChange}>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Fecha de inicio </Form.Label>
                                        <DatePicker
                                            selected={form.values.start_date}
                                            className="input-modal py-2 px-2 multiselect"
                                            onChange={(date) => form.setFieldValue('start_date', date)}
                                            popperClassName="some-custom-class"
                                            popperPlacement="top-end"
                                            popperModifiers={[
                                                {
                                                    name: "offset",
                                                    options: {
                                                        offset: [5, 10],
                                                    },
                                                },
                                                {
                                                    name: "preventOverflow",
                                                    options: {
                                                        rootBoundary: "viewport",
                                                        tether: false,
                                                        altAxis: true,
                                                    },
                                                },
                                            ]}
                                        />
                                        {form.errors.percentage && (
                                            <span className="error-text">{form.errors.start_date}</span>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Fecha de fin </Form.Label>
                                        <DatePicker
                                            selected={form.values.end_date}
                                            className="input-modal py-2 px-2 multiselect"
                                            onChange={(date) => form.setFieldValue('end_date', date)}
                                            popperClassName="some-custom-class"
                                            popperPlacement="top-end"
                                            popperModifiers={[
                                                {
                                                    name: "offset",
                                                    options: {
                                                        offset: [5, 10],
                                                    },
                                                },
                                                {
                                                    name: "preventOverflow",
                                                    options: {
                                                        rootBoundary: "viewport",
                                                        tether: false,
                                                        altAxis: true,
                                                    },
                                                },
                                            ]}
                                        />
                                        {form.errors.percentage && (
                                            <span className="error-text">{form.errors.end_date}</span>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>}
                    </Modal.Body>
                    <Modal.Footer className="productModal">
                        <Button
                            className="me-2"
                            variant="outline-danger"
                            onClick={handleClose}
                        >
                            <FeatherIcon icon="x" /> &nbsp;Cerrar
                        </Button>
                        <Button type="submit" onClick={form.onSubmit} variant="outline-success">
                            <FeatherIcon icon="check" /> &nbsp;Guardar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </Formik>
    </>)
    /* (<>
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
                    <Modal.Title className="modalTitle">Registrar descuento</Modal.Title>
                </Modal.Header>
                <Modal.Body className="productModal">

                    <Form.Select name="type" value={form.values.type} aria-label="Tipo de descuento" className="input-modal" onChange={({ target }) => {
                        setType(target.value)
                    }}>
                        <option value='Descueto por rol'>Descuento por rol</option>
                        <option value='Descuento por total de compra'>Descuento por total de compra</option>
                        <option value='Descuento por categoria'>Descuento por categoria</option>
                        <option value='Descuento por cantidad de productos'>Descuento por cantidad de productos</option>
                        <option value='Descuento por producto'>Descuento por producto</option>
                    </Form.Select>


                    {types === 'Descuento por categoria' && <div>
                        <Row>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlTextarea1" >
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" name="description" rows={7} value={form.values.description} onChange={form.handleChange} />
                                    {form.errors.description && (
                                        <span className="error-text">
                                            {form.errors.description}
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
                                        <span className="error-text">
                                            {form.errors.image}
                                        </span>
                                    )}
                                </Form.Group>
                                <Image
                                    src={imgs}
                                    width='200px'
                                    height='200px'
                                    className="mt-2 image-product-modal"
                                    rounded
                                />
                            </Col>
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
                                    {form.errors.percentage && (
                                        <span className="error-text">{form.errors.percentage}</span>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="validationCustom01">
                                    <Form.Label>Categoria</Form.Label>
                                    <Form.Select name="category_id" value={form.values.category_id} aria-label="Categorias" className="input-modal" onChange={form.handleChange}>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Fecha de inicio </Form.Label>
                                    <DatePicker
                                        selected={form.values.start_date}
                                        className="input-modal py-2 px-2 multiselect"
                                        onChange={(date) => form.setFieldValue('start_date', date)}
                                        popperClassName="some-custom-class"
                                        popperPlacement="top-end"
                                        popperModifiers={[
                                            {
                                                name: "offset",
                                                options: {
                                                    offset: [5, 10],
                                                },
                                            },
                                            {
                                                name: "preventOverflow",
                                                options: {
                                                    rootBoundary: "viewport",
                                                    tether: false,
                                                    altAxis: true,
                                                },
                                            },
                                        ]}
                                    />
                                    {form.errors.percentage && (
                                        <span className="error-text">{form.errors.start_date}</span>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Fecha de fin </Form.Label>
                                    <DatePicker
                                        selected={form.values.end_date}
                                        className="input-modal py-2 px-2 multiselect"
                                        onChange={(date) => form.setFieldValue('end_date', date)}
                                        popperClassName="some-custom-class"
                                        popperPlacement="top-end"
                                        popperModifiers={[
                                            {
                                                name: "offset",
                                                options: {
                                                    offset: [5, 10],
                                                },
                                            },
                                            {
                                                name: "preventOverflow",
                                                options: {
                                                    rootBoundary: "viewport",
                                                    tether: false,
                                                    altAxis: true,
                                                },
                                            },
                                        ]}
                                    />
                                    {form.errors.percentage && (
                                        <span className="error-text">{form.errors.end_date}</span>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>}
                </Modal.Body>
                <Modal.Footer className='productModal'>

                    <Button
                        className="me-2"
                        variant="outline-danger"
                        onClick={handleClose}
                    >
                        <FeatherIcon icon="x" /> &nbsp;Cerrar
                    </Button>
                    <Button type="submit" onClick={form.onSubmit} variant="outline-success">
                        <FeatherIcon icon="check" /> &nbsp;Guardar
                    </Button>

                </Modal.Footer>
            </Modal>
        </Form>
    </>)
} */
}

export default RegisterDiscount;