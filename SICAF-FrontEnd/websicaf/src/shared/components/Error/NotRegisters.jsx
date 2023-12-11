import React from 'react'
import errorImage404 from '../../../assets/cafe (1).png'
import { Figure } from "react-bootstrap";
import { Container, Row, Col } from 'react-bootstrap';

const NoRegisters = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Vaya...parece que no hay registros</h1>
                    <br />
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>
                    <Figure.Image alt="ERROR404" src={errorImage404} className='notRegisters ' />
                </Col>
            </Row>
        </Container>

    )
}

export default NoRegisters