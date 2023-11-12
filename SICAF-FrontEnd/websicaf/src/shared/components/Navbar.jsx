import React from "react";
import { Figure, Button, Navbar, Container } from "react-bootstrap";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import logo from "../../assets/logo-sicaf-crema.png";
import "../css/color.css";

const Navbarsicaf = () => {
  return (
    <Navbar style={{ backgroundColor: "var(--color-primary)", height: '70px' }} data-bs-theme="dark">
    <Container className="d-flex justify-content-between align-items-center">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Figure.Image className="logo-nav" alt="LOGOSICAFCREMA" src={logo} />
        <div style={{ marginLeft: '20px' }}>
          <FeatherIcon
            icon="menu"
            color="white"
            size={30}
            style={{ strokeWidth: 1.5 }}
          />
        </div>
      </div>
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Navbar.Text>
          <Button
            variant="info"
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "50px",
            }}
          >
            <FeatherIcon
              icon="user"
              color="white"
              style={{ strokeWidth: 1.5, marginRight: "0.5rem" }}
            />
            Perfil
          </Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default Navbarsicaf;
