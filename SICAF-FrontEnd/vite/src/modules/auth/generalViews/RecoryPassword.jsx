import React from "react";
import { Card, Button, Form, Figure, Alert } from "react-bootstrap";
import logo from "../../../assets/logo-sicaf.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router";
import recoveryPassword from "../Functions/recoveryPassword";

const RecoryPassword = () => {
  const navigation = useNavigate();
  const form = useFormik({
    initialValues:{
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Campo Obligatorio")
    }),
    onSubmit: async (values) => {
      try {
        return  await recoveryPassword({ ...values, url: "http://localhost:3000/newPassword" });
      } catch (error) {
        Alert.fire({
          title: "Error Interno",
          text: "Vuelve a intentarlo más tarde",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      }
    }

  })

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
            <Form onSubmit={form.handleSubmit}>
            <Form.Group>
                <Form.Label className="">Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="cafe@gmail.com"
                  className="input-redondo mx-auto"
                  value={form.values.email} // Use form.values.email instead of form.initialValues.email
                  onChange={form.handleChange}
                />
                {form.errors.email ? (
                  <span className="error-text">{form.errors.email}</span>
                ) : null}
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
