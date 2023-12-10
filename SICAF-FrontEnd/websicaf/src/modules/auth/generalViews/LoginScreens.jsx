import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AxiosClient from "../../../shared/plugins/axios";
import { AuthContext } from "../authContext";
import Alert from "../../../shared/plugins/Alert";
import { Card, Button, Form, Figure } from "react-bootstrap";
import logo from "../../../assets/logo-sicaf.png";
import { useFormik } from "formik";
import * as yup from "yup";

const LoginScreens = () => {
  const navigation = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Campo obligatorio"),
      password: yup.string().required("Campo obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await AxiosClient({
          url: "/auth/login",
          method: "POST",
          data: JSON.stringify(values),
        });
        if (!response.error) {
          const action = {
            type: "LOGIN",
            payload: response.data,
          };
          console.log(user.isLogged);
          dispatch(action);
          navigation("/welcome", { replace: true });
        } else {
          throw Error();
        }
      } catch (error) {
        Alert.fire({
          title: "Verificar datos",
          text: "Usuario y/o contraseña incorrectos",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      }
    },
  });

  if (user.isLogged) {
    return <Navigate to={'/'} />;
  }


  return (
    <div className="fondo-container">
      <Card className="fondo-cardlogin">
        <Card.Body>
          <Card.Title className="d-flex align-items-center justify-content-center">
            <Figure.Image alt="LOGOSICAF" className="logo-login" src={logo} />
            <h1 className="color-titleLogin">SICAF</h1>
          </Card.Title>

          <Card.Text>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Label className="">Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="cafe@gmail.com"
                  className="input-redondo mx-auto"
                  value={formik.values.email} // Use formik.values.email instead of formik.initialValues.email
                  onChange={formik.handleChange}
                />
                {formik.errors.email ? (
                  <span className="error-text">{formik.errors.email}</span>
                ) : null}
              </Form.Group>

              <Form.Group
                className="mb-3 text-center"
                controlId="formBasicPassword"
              >
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="********"
                  className="input-redondo mx-auto"
                  value={formik.values.password} // Use formik.values.password instead of formik.initialValues.password
                  onChange={formik.handleChange}
                />
                {formik.errors.password ? (
                  <span className="error-text">{formik.errors.password}</span>
                ) : null}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="boton-redondo boton-login my-3"
              >
                Iniciar Sesión
              </Button>
              <br />
              <p>
                ¿Olvidaste tu contraseña?{" "}
                <a href="recoveryPassword" className="login-link ">
                  Recuperar contraseña
                </a>
              </p>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginScreens;
