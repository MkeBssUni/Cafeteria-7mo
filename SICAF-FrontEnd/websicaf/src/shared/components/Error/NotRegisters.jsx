import React from 'react'
import errorImage404 from '../../../assets/cafe (1).png'
import { Figure } from "react-bootstrap";
import { Container, Row, Col } from 'react-bootstrap';

const NoRegisters = () => {
    return (
        <div className='center d-flex align-items-center justify-content-center mt-5'>
            <Row>
                <Col>
                    <h1 className='mt-5'>Vaya...parece que no hay registros</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Figure.Image alt="ERROR404" src={errorImage404} className='notRegisters' />
                </Col>
            </Row>
            <br />
        </div>
    )
}

export default NoRegisters