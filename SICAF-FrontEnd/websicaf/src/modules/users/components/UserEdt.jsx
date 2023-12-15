import React,{useState, useEffect}from "react";
import AgregarF from "../../../assets/AgregarF.jpg";
import { Figure, Row, Col, Form, Container, Card } from "react-bootstrap";
import Alert, { confirmMsj } from "../../../shared/plugins/alerts";
import { useNavigate,useParams  } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import CryptoJS from 'crypto-js';
import GetOneUser from "../Functions/GetOneUser";
import UpdateUser from './../Functions/UpdateUser';
import Loading from "../../../shared/components/Loading";

const UserEdt = () => {
  const [user, setuser] = useState({})
  const navigation = useNavigate();
  const { datosCifrado  } = useParams();
  const bytes = CryptoJS.AES.decrypt(datosCifrado , 'sicaf-Cofee');
  const datosDescifrados = bytes.toString(CryptoJS.enc.Utf8);

  

  const handleOpen = () => {
    navigation("/users", { replace: true });
    window.location.reload();
  };

  const getUser =async (id)=>{
      const data = await GetOneUser(id);
      setuser(data)
  }
  useEffect(()=>{
    getUser(datosDescifrados);
  },[])

  const form = useFormik({
    initialValues: {
      email: "",
      role_id: 0,
      person: {
        name: "",
        lastname: "",
        gender: "",
        phone_number1: "",
        address: {
          street: "",
          settlement: "",
          city: "",
          state: "",
          postal_code: "",
          country: "",
        },
      },
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Campo Obligatorio")
        .matches(/^(?!.*@[^,]*,)/, "Correo Electrónico no Válido"),
      role_id: yup.number().required("Campo Obligatorio"),
      person: yup.object().shape({
        name: yup.string().required("Campo Obligatorio"),
        lastname: yup.string().required("Campo Obligatorio"),
        gender: yup.string().required("Campo Obligatorio"),
        phone_number1: yup.string().required("Campo Obligatorio"),
        address: yup.object().shape({
          street: yup.string().required("Campo Obligatorio"),
          settlement: yup.string().required("Campo Obligatorio"),
          city: yup.string().required("Campo Obligatorio"),
          state: yup.string().required("Campo Obligatorio"),
          postal_code: yup.string().required("Campo Obligatorio"),
          country: yup.string().required("Campo Obligatorio"),
        }),
      }),
    }),
    onSubmit: async (values) => {
      return await Alert.fire({
        title: "¿Estas seguro de guardar el usuario?",
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
          handleOpen()
          return await UpdateUser(datosDescifrados,values);
        },
      });
    },
  });

  React.useMemo(() => {
    if (user) {
      const { role_id, email, person } = user;
      form.values.email = email;
      form.values.role_id = role_id;
      
      if (person) {
        form.values.person.name = person.name;
        form.values.person.lastname = person.lastname;
        form.values.person.gender = person.gender;
        form.values.person.phone_number1 = person.phone_number1;
        
        if (person.address) {
          form.values.person.address.street = person.address.street;
          form.values.person.address.settlement = person.address.settlement;
          form.values.person.address.city = person.address.city;
          form.values.person.address.state = person.address.state;
          form.values.person.address.postal_code = person.address.postal_code;
          form.values.person.address.country = person.address.country;
        }
      }
    }
  }, [user]);
  

  

  return (
    <body>   
    <div>
      <div className="card" style={{ position: "relative", border: "none" }}>
        <Figure.Image className="fondo-user" alt="fondo-user" src={AgregarF} />
        <div className="overlay">
          <div className="text-box">
            <h2>Editar usuario</h2>
          </div>
        </div>
      </div>
      <Container className="mt-4">
        <Form
          style={{ color: "var(--color-primary)" }}
          onSubmit={form.handleSubmit}
        >
          <Row>
            <Card>
              <Card.Header>Crear Usuario</Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Correo eléctronico: </Form.Label>
                      <Form.Control
                        className="input-user"
                        name="email"
                        value={form.values.email}
                        onChange={form.handleChange}
                      />
                      {form.errors.email && (
                        <span className="error-text">{form.errors.email}</span>
                      )}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Tipo de usuario: </Form.Label>
                      <Form.Control
                        as="select"
                        className="input-user"
                        name="role_id"
                        value={form.values.role_id}
                        onChange={form.handleChange}
                      >
                        <option value={1}>Administrador</option>
                        <option value={2}>Empleado</option>
                        <option value={3}>Cliente</option>
                      </Form.Control>
                      {form.errors.role_id && (
                        <span className="error-text">
                          {form.errors.role_id}
                        </span>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="my-2">
              <Card.Header>Información Personal</Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Nombre: </Form.Label>
                      <Form.Control
                        className="input-user"
                        name="person.name"
                        value={form.values.person && form.values.person.name}
                        onChange={form.handleChange}
                      />
                      {form.errors.person && form.errors.person.name && (
                        <span className="error-text">
                          {form.errors.person.name}
                        </span>
                      )}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Apellidos: </Form.Label>
                      <Form.Control
                        className="input-user"
                        name="person.lastname"
                        value={
                          form.values.person && form.values.person.lastname
                        }
                        onChange={form.handleChange}
                      />
                      {form.errors.person && form.errors.person.lastname && (
                        <span className="error-text">
                          {form.errors.person.lastname}
                        </span>
                      )}
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>

                    </Form.Group>
                      <Form.Label>Genero: </Form.Label>
                      <Form.Control
                        as="select"
                        className="input-user"
                        name="person.gender"
                        value={form.values.person && form.values.person.gender}
                        onChange={form.handleChange}
                      >
                        <option value='F'>Femenino</option>
                        <option value='M'>Masculino</option>
                      </Form.Control>
                        {form.errors.person && form.errors.person.lastname && (
                        <span className="error-text">
                          {form.errors.person.lastname}
                        </span>
                      )}
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Teléfono:</Form.Label>
                      <Form.Control
                        className="input-user"
                        name="person.phone_number1"
                        value={
                          form.values.person &&
                          form.values.person.address &&
                          form.values.person.phone_number1
                        }
                        onChange={form.handleChange}
                      />
                      {form.errors.person && form.errors.person.lastname && (
                        <span className="error-text">
                          {form.errors.person.lastname}
                        </span>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Card>
                  <Card.Header> Dirección </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Calle:</Form.Label>
                          <Form.Control
                            className="input-user"
                            name="person.address.street"
                            value={
                              form.values.person &&
                              form.values.person.address &&
                              form.values.person.address.street
                            }
                            onChange={form.handleChange}
                          />
                          {form.errors.person &&
                            form.errors.person.address &&
                            form.errors.person.address.street && (
                              <span className="error-text">
                                {form.errors.person.address.street}
                              </span>
                            )}
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>Colonia:</Form.Label>
                          <Form.Control
                            className="input-user"
                            name="person.address.settlement"
                            value={
                              form.values.person &&
                              form.values.person.address &&
                              form.values.person.address.settlement
                            }
                            onChange={form.handleChange}
                          />
                          {form.errors.person &&
                            form.errors.person.address &&
                            form.errors.person.address.settlement && (
                              <span className="error-text">
                                {form.errors.person.address.settlement}
                              </span>
                            )}
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>Ciudad:</Form.Label>
                          <Form.Control
                            className="input-user"
                            name="person.address.city"
                            value={
                              form.values.person &&
                              form.values.person.address &&
                              form.values.person.address.city
                            }
                            onChange={form.handleChange}
                          />
                          {form.errors.person &&
                            form.errors.person.address &&
                            form.errors.person.address.city && (
                              <span className="error-text">
                                {form.errors.person.address.city}
                              </span>
                            )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Estado:</Form.Label>
                          <Form.Control
                            className="input-user"
                            name="person.address.state"
                            value={
                              form.values.person &&
                              form.values.person.address &&
                              form.values.person.address.state
                            }
                            onChange={form.handleChange}
                          />
                          {form.errors.person &&
                            form.errors.person.address &&
                            form.errors.person.address.state && (
                              <span className="error-text">
                                {form.errors.person.address.state}
                              </span>
                            )}
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>Código Postal:</Form.Label>
                          <Form.Control
                            className="input-user"
                            name="person.address.postal_code"
                            value={
                              form.values.person &&
                              form.values.person.address &&
                              form.values.person.address.postal_code
                            }
                            onChange={form.handleChange}
                          />
                          {form.errors.person &&
                            form.errors.person.address &&
                            form.values.person.address.postal_code && (
                              <span className="error-text">
                                {form.values.person.address.postal_code}
                              </span>
                            )}
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>País:</Form.Label>
                          <Form.Control
                            className="input-user"
                            name="person.address.country"
                            value={
                              form.values.person &&
                              form.values.person.address &&
                              form.values.person.address.country
                            }
                            onChange={form.handleChange}
                          />
                          {form.errors.person &&
                            form.errors.person.address &&
                            form.errors.person.address.country && (
                              <span className="error-text">
                                {form.values.person.address.country}
                              </span>
                            )}
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Row>
          <Row className="mt-2">
            <div className="d-flex justify-content-end my-3">
              <button
                className="btn btn-outline-danger  mr-2 mx-2 "
                onClick={handleOpen}
              >
                Cancelar
              </button>
              <button className="btn  btn-outline-success">Actualizar</button>
            </div>
          </Row>
        </Form>
      </Container>
    </div>
    </body>
  );
};

export default UserEdt;
