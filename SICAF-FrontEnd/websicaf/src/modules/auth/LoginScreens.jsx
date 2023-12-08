import React from "react";
import { Card, Button, Form, Figure} from "react-bootstrap";
import logo from "../../assets/logo-sicaf.png";

const LoginScreens = () => {
  return (
    <div className="fondo-container">
      <Card className="fondo-cardlogin">
        <Card.Body>
          <Card.Title className="d-flex align-items-center justify-content-center">
            <Figure.Image alt="LOGOSICAF" className="logo-login" src={logo} />
            <h1 className="color-titleLogin">SICAF</h1>
          </Card.Title>

          <Card.Text>
            <Form>
              <Form.Group
                className=" mb-3"
                controlId="formBasicEmail"
              >
               <Form.Label className="">Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="cafe@gmail.com"
                  className="input-redondo mx-auto"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 text-center"
                controlId="formBasicPassword"
              >
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="********"
                  className="input-redondo mx-auto"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="boton-redondo boton-login my-3">
                Iniciar Sesión
              </Button>
              <br/>
              <p>¿Olvidaste tu contraseña? <a href="recoveryPassword" className="login-link ">Recuperar contraseña</a></p>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginScreens;
