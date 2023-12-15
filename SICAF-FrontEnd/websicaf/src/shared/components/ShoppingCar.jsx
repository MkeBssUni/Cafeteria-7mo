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

const ShoopingCart = () => {
  const [cart, setCart] = useState(null);

  const userRole = localStorage.getItem("userRole");

  let roleDefine = "";
  if (userRole != null) {
    const role = userRole || "";
    roleDefine = role ? role.replace(/^"(.*)"$/, "$1") : "";
  }

  useEffect(() => {
    let ShoppingCart = JSON.parse(localStorage.getItem("user"));
    console.log(ShoppingCart);
    // Verificar si el carrito existe antes de establecer el estado
    if (ShoppingCart && ShoppingCart.shopping_cart) {
      setCart(ShoppingCart.shopping_cart);
    }
  }, []); // El array de dependencias vacío asegura que useEffect se ejecute una vez en el montaje

  return (
    <>
      <Dropdown className="d-inline mx-2">
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
              <h5>Sí hay productos en tu carrito</h5>
              <Figure.Image
                className="logo-nav mx-auto"
                alt="LOGOSICAFCREMA"
                src={Cup}
              />
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ShoopingCart;
