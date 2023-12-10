import React, { useEffect, useState,useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Figure, Col, ListGroup, Row, Tab } from "react-bootstrap";
import logo from "../../assets/logo-sicaf-crema.png";
import SvgIcon from "@mui/material/SvgIcon";
import {
  CakeOutlined,
  EmojiFoodBeverageOutlined,
  LocalCafeOutlined,
  SupervisedUserCircleOutlined,
  PointOfSaleOutlined,
} from "@mui/icons-material";
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const SidebarSicaf = ({ isOpen, onClose }) => {
  const [menuItems, setMenuItems] = useState([]);
  const userRole = localStorage.getItem("userRole");
  let roleDefine = "";
  
    if (userRole != null) {
      const role = userRole || ""; // Asegúrate de que role no sea nulo
      roleDefine = role.replace(/^"(.*)"$/, "$1");
    }
 
  useEffect(() => {
    const localStorageValue = roleDefine;

    let items;
    switch (localStorageValue) {
      case "Empleado":
        items = menuItemsEmpleado;
        break;
      case "Administrador":
        items = menuItemsGerente;
        break;
      case "Cliente":
      default:
        items = menuItemsCliente;
        break;
    }

    setMenuItems(items);
  }, []);

  const menuItemsCliente = [
    { id: "products", label: "Productos", icon: <LocalCafeOutlined /> },
    { id: "offers", label: "Ofertas", icon: <EmojiFoodBeverageOutlined /> },
    { id: "orders", label: "Pedidos", icon: <CakeOutlined /> },
    { id: "historyClient", label: "Historial de compras Presenciales", icon: <StorefrontIcon/> },
    { id: "historyClientOnline", label: "Historial de compras Online", icon: <ShoppingBagIcon/> },
  ];

  const menuItemsGerente = [
    { id: "productAdmin", label: "Productos", icon: <LocalCafeOutlined /> },
    { id: "link2", label: "Ofertas", icon: <EmojiFoodBeverageOutlined /> },
    { id: "historySaleStore", label: "Historial de ventas en Tienda", icon: <StorefrontIcon/> },
    { id: "historySaleOnline", label: "Historial de ventas Online", icon: <ShoppingBagIcon/> },
    { id: "users", label: "Usuarios", icon: <SupervisedUserCircleOutlined /> },
  ];

  const menuItemsEmpleado = [
    { id: "productAdmin", label: "Productos", icon: <LocalCafeOutlined /> },
    { id: "link2", label: "Ofertas", icon: <EmojiFoodBeverageOutlined /> },
    { id: "link3", label: "Ventas", icon: <CakeOutlined /> },
    { id: "historySaleStore", label: "Historial de ventas en Tienda", icon: <StorefrontIcon/> },
    { id: "historySaleOnline", label: "Historial de ventas Online", icon: <ShoppingBagIcon/> },
  ];

  return (
    <Offcanvas
      show={isOpen}
      onHide={onClose}
      className="sidebar-size bakground-things"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <Figure.Image className="logo-nav" alt="LOGOSICAFCREMA" src={logo} />
          &nbsp; Bienvenid@
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Tab.Container
          id="list-group-tabs-example"
        >
          <Row>
            <Col cols="col-xl-12">
              <ListGroup>
                {menuItems.map((item) => (
                  <ListGroup.Item key={item.id} action href={`${item.id}`}>
                    <SvgIcon component={() => item.icon} inheritViewBox />
                    {item.label}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Tab.Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SidebarSicaf;
