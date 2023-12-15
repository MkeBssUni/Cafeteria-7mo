import React, { useState, useContext, useEffect } from "react";
import {
  Figure,
  Dropdown,
  Button,
  Navbar,
  Container,
  Badge,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../modules/auth/authContext";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import logo from "../../assets/logo-sicaf-crema.png";
import SidebarSicaf from "./sidebar";
import "../css/color.css";
import VisualConfigurations from "../../modules/visualConfig/Functions/VisualConfigurations";
import Cup from '../../assets/cafe (1).png'
import ShoopingCart from "./ShoppingCar";
const Navbarsicaf = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFromLetter, setIsFromLetter] = useState(false);
  const [changeIcon, setChangeIcon] = useState(false);
  const [typeLetter, setTypeLetter] = useState("");
  const userRole = localStorage.getItem("userRole");
  const [cart, setCart] = useState()

  let roleDefine = "";
  if (userRole != null) {
    const role = userRole || ""; // Asegúrate de que role no sea nulo
    roleDefine = role.replace(/^"(.*)"$/, "$1");
  }
  const fullName = user.name + " " + user.lastname;
  const userData = {
    "user_id": user.id,
    "dark_theme": isFormVisible,
    "letter_size": typeLetter
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      dispatch({ type: "LOGOUT" });
      navigate("/login", { replace: true });
    }, 1000);
  };

  const handleToggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };
  const handleToggleLetterSizaForm = () => {
    setIsFromLetter(!isFromLetter);
  };

  const handleSwitchChange = async (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setChangeIcon(true);
      const theme = !(localStorage.getItem("darkMode") === "true"); // Negar el valor
      localStorage.setItem("darkMode", theme);
      await VisualConfigurations({
        user_id: user.id,
        dark_theme: theme,
        letter_size: user.letter_size,
      });
    } else {
      setChangeIcon(false);
    }
  };

  const handleLetterSizeChange = async (size) => {
    setTypeLetter(size)
    localStorage.setItem("letter_size", size)
    await VisualConfigurations({
      user_id: user.id,
      dark_theme: user.dark_theme,
      letter_size: size,
    });
  };

  useEffect(() => {
    // Obtener el carrito del almacenamiento local
    var ShoppingCart = JSON.parse(localStorage.getItem('user'));

    // Verificar si el carrito existe antes de establecer el estado
    if (ShoppingCart && ShoppingCart.shopping_cart) {
      setCart(ShoppingCart.shopping_cart);
    }
  }, []);

  return (
    <>
      <SidebarSicaf
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <Navbar
        style={{ height: "75px" }}
        bg="secondary"
        data-bs-theme="light"
        className="fixed-top"
      >
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}
        >
          <Figure.Image className="logo-nav" alt="LOGOSICAFCREMA" src={logo} />
          <div style={{ marginLeft: "30px" }}>
            <FeatherIcon
              icon="menu"
              color="white"
              size={30}
              style={{ strokeWidth: 1.5, cursor: "pointer" }}
              onClick={toggleSidebar}
            />
          </div>
        </div>
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Collapse className="justify-content-end">
            {isFormVisible && (
              <div className="custom-form">
                <Form>
                  <div className="d-flex align-items-center">
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Aspecto"
                      className="switch-style"
                      onChange={handleSwitchChange}
                    />
                    <FeatherIcon
                      icon={changeIcon ? "moon" : "sun"}
                      style={{
                        strokeWidth: 1,
                        marginLeft: "0.5rem",
                        color: "white",
                      }}
                    />
                  </div>
                </Form>
              </div>
            )}
            {isFromLetter && (
              <div className="custom-form">
                <Form>
                  <Form.Check
                    inline
                    label="Pequeño"
                    type="radio"
                    id="Pequeño"
                    name="letterSizeChoose"
                    className="switch-style"
                    onChange={() => handleLetterSizeChange('Grande')}
                  />
                  <Form.Check
                    inline
                    label="Mediana"
                    type="radio"
                    id="Mediana"
                    name="letterSizeChoose"
                    className="switch-style"
                    onChange={() => handleLetterSizeChange('Grande')}
                  />
                  <Form.Check
                    inline
                    label="Grande"
                    type="radio"
                    id="Grande"
                    name="letterSizeChoose"
                    className="switch-style"
                    onChange={() => handleLetterSizeChange('Grande')}
                  />
                </Form>
              </div>
            )}
            <ShoopingCart/>
            {/* <Dropdown className="d-inline mx-2">
  {roleDefine === "Cliente" && (
    <Dropdown.Toggle
      className="botone"
      variant="info"
      id="dropdown-variants-info dropdown-autoclose-false"
    >
      <FeatherIcon
        icon="shopping-cart"
        style={{ strokeWidth: 1.5, marginRight: "0.5rem" }}
      />
    </Dropdown.Toggle>
  )}

  <Dropdown.Menu align={"end"}>
    {cart && cart.cart && cart.cart.product && cart.cart.product.length === 0 ? (
      <Dropdown.Item disabled className="text-center">
        <h5>Tu carrito de compras está vacío</h5>
        <Figure.Image className="logo-nav mx-auto" alt="LOGOSICAFCREMA" src={Cup} />
      </Dropdown.Item>
    ) : (
      <Dropdown.Item disabled className="text-center">
        <h5>Sí hay productos en tu carrito</h5>
        <Figure.Image className="logo-nav mx-auto" alt="LOGOSICAFCREMA" src={Cup} />
      </Dropdown.Item>
    )}
  </Dropdown.Menu>
</Dropdown> */}


            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle
                className="botone"
                variant="info"
                id="dropdown-variants-info dropdown-autoclose-false"
              >
                <FeatherIcon
                  icon="user"
                  style={{ strokeWidth: 1.5, marginRight: "0.5rem" }}
                />
                Perfil
              </Dropdown.Toggle>

              <Dropdown.Menu align={"end"}>
                <Dropdown.Item href="#">
                  <Badge pill bg="secondary">
                    <b>{roleDefine}</b>
                  </Badge>
                </Dropdown.Item>
                <Dropdown.Item>{fullName} </Dropdown.Item>
                <Dropdown.Item onClick={handleToggleForm}>
                  <FeatherIcon
                    icon="sun"
                    style={{ strokeWidth: 1, marginRight: "0.5rem" }}
                  />
                  Aspecto: {user.dark_theme ? "Oscuro" : "Claro"}
                </Dropdown.Item>
                <Dropdown.Item onClick={handleToggleLetterSizaForm}>
                  <FeatherIcon
                    icon="type"
                    style={{ strokeWidth: 1, marginRight: "0.5rem" }}
                  />
                  Tamaño de letra: {user.letter_size}
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button variant="outline-primary" onClick={handleLogout}>
                    <FeatherIcon
                      icon="arrow-right-circle"
                      style={{ strokeWidth: 1, marginRight: "0.5rem" }}
                      className={isLoggingOut ? "logging-out" : ""}
                    />
                    Cerrar sesión
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default Navbarsicaf;
