import React from 'react';
import AgregarF from '../../../assets/AgregarF.jpg';
import { Figure, Row, Col, Form, Container, Button } from 'react-bootstrap';

const UserForm = () => {
    return (
        <div>
            <div className="card" style={{ position: 'relative', border: 'none' }}>
                <Figure.Image className="fondo-user" alt="fondo-user" src={AgregarF} />
                <div className="overlay">
                    <div className="text-box">
                        <h2>Agregar usuario</h2>
                    </div>
                </div>
            </div>
            <Container className="mt-4">
                <Row>
                    <Col md={5} className="mx-auto">
                        <Form style={{ color: 'var(--color-primary)' }}>
                            <Form.Group >
                                <Form.Label>Nombre: </Form.Label>
                                <Form.Control style={{
                                    border: 'none',
                                    borderBottom: '2px solid brown',
                                    borderRadius: '0',
                                    boxShadow: 'none',
                                    color: 'var(--color-primary)',
                                    marginBottom: '15px'
                                }} />
                            </Form.Group>
                            <Form.Group  >
                                <Form.Label>Apellido Paterno: </Form.Label>
                                <Form.Control style={{
                                    border: 'none',
                                    borderBottom: '2px solid brown',
                                    borderRadius: '0',
                                    boxShadow: 'none',
                                    color: 'var(--color-primary)',
                                    marginBottom: '15px'
                                }} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Correo Electronico: </Form.Label>
                                <Form.Control style={{
                                    border: 'none',
                                    borderBottom: '2px solid brown',
                                    borderRadius: '0',
                                    boxShadow: 'none',
                                    color: 'var(--color-primary)',
                                    marginBottom: '15px'
                                }} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Número de teléfono principal : </Form.Label>
                                <Form.Control style={{
                                    border: 'none',
                                    borderBottom: '2px solid brown',
                                    borderRadius: '0',
                                    boxShadow: 'none',
                                    color: 'var(--color-primary)',
                                    marginBottom: '15px'
                                }} />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={5} className="mx-auto">
                        <Form style={{ color: 'var(--color-primary)' }}>
                            <Form.Group >
                                <Form.Label>Nombre del usuario: </Form.Label>
                                <Form.Control style={{
                                    border: 'none',
                                    borderBottom: '2px solid brown',
                                    borderRadius: '0',
                                    boxShadow: 'none',
                                    color: 'var(--color-primary)',
                                    marginBottom: '15px'
                                }} />
                            </Form.Group><Form.Group >
                                <Form.Label>Apellido Materno: </Form.Label>
                                <Form.Control style={{
                                    border: 'none',
                                    borderBottom: '2px solid brown',
                                    borderRadius: '0',
                                    boxShadow: 'none',
                                    color: 'var(--color-primary)',
                                    marginBottom: '15px'
                                }} />
                            </Form.Group><Form.Group >
                                <Form.Label>Contraseña: </Form.Label>
                                <Form.Control style={{
                                    border: 'none',
                                    borderBottom: '2px solid brown',
                                    borderRadius: '0',
                                    boxShadow: 'none',
                                    color: 'var(--color-primary)',
                                    marginBottom: '15px'
                                }} />
                            </Form.Group><Form.Group >
                                <Form.Label>Número de teléfono decundario: </Form.Label>
                                <Form.Control style={{
                                    border: 'none',
                                    borderBottom: '2px solid brown',
                                    borderRadius: '0',
                                    boxShadow: 'none',
                                    color: 'var(--color-primary)',
                                    marginBottom: '15px'
                                }} />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <div className="d-flex justify-content-end ">
                        <button className="btn btn-outline-danger  mr-2 " >Cancelar</button>
                        <button className="btn  btn-outline-success" >Registrar</button>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default UserForm;
