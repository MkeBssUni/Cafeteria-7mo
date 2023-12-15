import React from 'react'
import errorImage404 from '../../../assets/cafe (1).png'
import { Figure } from "react-bootstrap";
import { Container, Row, Col } from 'react-bootstrap';

const NoRegisters = () => {
    return (
        <div className=' ps-5 d-flex align-items-center justify-content-center mt-5'>
            <Row>
                <Col>
                    <h1>Vaya...parece que no hay registros</h1>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>
                    <Figure.Image alt="ERROR404" src={errorImage404} className='notRegisters' />
                </Col>
            </Row>
        </div>

    )
}

export default NoRegisters