import React, { useState } from "react";
import { Figure, Dropdown, Navbar, Container, Badge,Form } from "react-bootstrap";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import logo from "../../assets/logo-sicaf-crema.png";
import SidebarSicaf from "./sidebar";
import "../css/color.css";

const Navbarsicaf = () => {
  // moon : sun en aspectos del icono
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the state of isSidebarOpen
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log(isSidebarOpen);
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
                <b>Empleado</b>
                </Badge>
              </Dropdown.Item>
              <Dropdown.Item href="#">Anna Christina Bustos</Dropdown.Item>
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
              <Dropdown.Item href="#">
                <FeatherIcon
                  icon="arrow-right-circle"
                  style={{ strokeWidth: 1, marginRight: "0.5rem"}}
                />
                Cerrar sesión
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default Navbarsicaf;
