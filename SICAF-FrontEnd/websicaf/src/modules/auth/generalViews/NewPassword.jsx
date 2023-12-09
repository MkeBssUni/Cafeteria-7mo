import React from "react";
import { Card, Button, Form, Figure, Alert } from "react-bootstrap";
import logo from "../../../assets/logo-sicaf.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router";
import recoveryPassword from "../Functions/recoveryPassword";

const NewPassword = () => {
  const navigation = useNavigate();
  
  const form = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "", // Nuevo campo para confirmar la contraseña
    },
    validationSchema: yup.object().shape({
      password: yup.string().required("Campo Obligatorio"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden") // Validación para asegurarse de que coincidan
        .required("Campo Obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        return await recoveryPassword(values);
      } catch (error) {
        Alert.fire({
          title: "Error Interno",
          text: "Vuelve a intentarlo más tarde",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      }
    },
  });

  return (
    <div className="fondo-container">
      <Card className="fondo-cardlogin">
        <Card.Body>
          <Card.Title className="d-flex align-items-center justify-content-center">
            <Figure.Image alt="LOGOSICAF" className="logo-login" src={logo} />
            <h1 className="color-titleLogin">SICAF</h1>
          </Card.Title>

          <Card.Text>
            <Form onSubmit={form.handleSubmit}>
              <Form.Group
                className="mb-3 text-center"
                controlId="formBasicPassword"
              >
                <Form.Label>Nueva contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="********"
                  className="input-redondo mx-auto"
                  value={form.values.password}
                  onChange={form.handleChange}
                />
                {form.errors.password ? (
                  <span className="error-text">{form.errors.password}</span>
                ) : null}
              </Form.Group>
              <Form.Group
                className="mb-3 text-center"
                controlId="formBasicConfirmPassword"
              >
                <Form.Label>Confirma tu nueva contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="********"
                  className="input-redondo mx-auto"
                  value={form.values.confirmPassword}
                  onChange={form.handleChange}
                />
                {form.errors.confirmPassword ? (
                  <span className="error-text">
                    {form.errors.confirmPassword}
                  </span>
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
                <a className="login-link " href="auth">
                  Regresar
                </a>
              </p>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewPassword;
