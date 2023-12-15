import React, { useState, useEffect } from "react";
import "../../App.css";
import {
  Figure,
  Dropdown,
  Button,
  Navbar,
  Container,
  Badge,
  Form,
} from "react-bootstrap";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Cup from "../../assets/cafe (1).png";
import SaveOnlineOrders from "../../modules/orders/ordersClient/SaveOnlineOrders";

const ShoopingCart = () => {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const userRole = localStorage.getItem("userRole");

  let roleDefine = "";
  if (userRole != null) {
    const role = userRole || "";
    roleDefine = role ? role.replace(/^"(.*)"$/, "$1") : "";
  }

  useEffect(() => {
    // Obtener el carrito del almacenamiento local
    let ShoppingCart = JSON.parse(localStorage.getItem("user"));
    // Verificar si el carrito existe antes de establecer el estado
    if (ShoppingCart && ShoppingCart.shopping_cart) {
      setCart(ShoppingCart.shopping_cart.cart.product); 
    }
  }, []); // El array de dependencias vacío asegura que useEffect se ejecute una vez en el montaje

  return (
    <>
      <Dropdown className="d-inline mx-2">
        
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
        

        <Dropdown.Menu align={"end"}>
          {cart &&
          cart.cart &&
          cart.cart.product &&
          cart.cart.product.length === 0 ? (
            <Dropdown.Item disabled className="text-center">
              <h5>Tu carrito de compras está vacío</h5>
              <Figure.Image
                className="logo-nav mx-auto"
                alt="LOGOSICAFCREMA"
                src={Cup}
              />
            </Dropdown.Item>
          ) : (
            <Dropdown.Item disabled className="text-center">
              <h5>Tú carrito: </h5>
              <div className="d-flex justify-content-between">
                  <p className="text-left" >Nombre</p>
                  <p className="text-right">Precio</p>
                </div>
              {cart.map((item, index) => (
                <div className="d-flex justify-content-between" key={index}>
                  <p className="text-left" key={item.name}>{item.name}</p>
                  <p className="text-right" key={item.price}>${item.price}</p>
                </div>
              ))
              }
            </Dropdown.Item>
          )}
          <Dropdown.Divider />
          <Dropdown.Item className="text-center">
          <Button
                variant="outline-primary"
                onClick={()=> setIsOpen(true)}
                disabled={cart.length === 0}
              >
                Continuar con la compra
          </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <SaveOnlineOrders isOpen={isOpen} onClose={()=> setIsOpen(false)} carritoCompras={cart} /> 
    </>
  );
};

export default ShoopingCart;
