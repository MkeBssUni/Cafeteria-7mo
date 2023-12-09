import React, { useState,useContext } from "react";
import { Figure, Dropdown,Button, Navbar, Container, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../modules/auth/authContext";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import logo from "../../assets/logo-sicaf-crema.png";
import SidebarSicaf from "./sidebar";
import "../css/color.css";

const Navbarsicaf = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  // moon : sun en aspectos del icono
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Function to toggle the state of isSidebarOpen
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log(isSidebarOpen);
  };
  const handleLogout = () => {
    setIsLoggingOut(true); // Agrega un estado para indicar que se está cerrando sesión
    setTimeout(() => {
      dispatch({ type: "LOGOUT" });
      navigate("/login", { replace: true });
    }, 1000); // Ajusta el valor según sea necesario
  };
  return (
    <>
    <SidebarSicaf isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    <Navbar
      style={{height: "75px" }}
      bg="secondary" data-bs-theme="light"
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
          <Dropdown className="d-inline mx-2" autoClose={false}>
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
                <b>{localStorage.getItem("userRole")}</b>
                </Badge>
              </Dropdown.Item>
              <Dropdown.Item>Anna Christina Bustos</Dropdown.Item>
              <Dropdown.Item href="#">
                <FeatherIcon
                  icon="sun"
                  style={{ strokeWidth: 1, marginRight: "0.5rem" }}
                />
                Aspecto: Claro
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <FeatherIcon
                  icon="type"
                  style={{ strokeWidth: 1, marginRight: "0.5rem" }}
                />
                Tamaño de letra: Normal
              </Dropdown.Item>
              <Dropdown.Item>
                <Button variant="outline-primary" onClick={handleLogout}>
                <FeatherIcon
                  icon="arrow-right-circle"
                  style={{ strokeWidth: 1, marginRight: "0.5rem"}}
                  className={isLoggingOut ? "logging-out" : ""} 
                />Cerrar sesión
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br/>
    </>
  );
};

export default Navbarsicaf;
