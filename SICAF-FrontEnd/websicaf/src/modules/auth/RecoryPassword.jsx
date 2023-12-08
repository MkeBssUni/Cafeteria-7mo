import React from "react";
import { Card, Button, Form, Figure, Alert } from "react-bootstrap";
import logo from "../../assets/logo-sicaf.png";

const RecoryPassword = () => {
  return (
    <div className="fondo-container">
      <Card className="fondo-cardlogin">
        <Card.Body>
          <Card.Title className="d-flex align-items-center justify-content-center">
            <Figure.Image alt="LOGOSICAF" className="logo-login" src={logo} />
            <h1 className="color-titleLogin">SICAF</h1>
          </Card.Title>

          <Card.Text>
            <Alert key="warning" variant="warning">
            <span className="nota-advert">Nota:</span> De acuerdo al correo registrado de tu cuenta se te mandara
              un correo para restablecer la contraseña por medio de seguridad.
            </Alert>
            <Form>
              <Form.Group className=" mb-3" controlId="formBasicEmail">
                <Form.Label className="">Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="cafe@gmail.com"
                  className="input-redondo mx-auto"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="boton-redondo boton-login my-3"
              >
                Enviar
              </Button>
              <br />
              <p>
                <a className="login-link " href="auth">Regresar</a>
              </p>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RecoryPassword;
