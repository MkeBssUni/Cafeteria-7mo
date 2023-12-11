import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import FeatherIcon from "feather-icons-react";


import GetAllActiveDiscount from "./functions/GetAllActive";

import Separator from "../../assets/separator.png";
import CookiesOffers from './CookiesOffers'
import CakesOffers from "./CakesOffers";

const OffersList = () => {
  const [modalShow, setModalShow] = useState(false);

  const [category, setCategory] = useState("Todos");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalList, setOriginalList] = useState([])

  const [byRol, setbyRol] = useState([]);
  const [byProductsNumber, setbyProductsNumber] = useState([]);
  const [byOrderTotal, setbyOrderTotal] = useState([]);
  const [ByCategory, setByCategory] = useState([]);
  const [byProduct, setbyProduct] = useState([]);
  const [allDiscount,setAllDiscounts] = useState([])



  const getDiscountByType = async () => {
    var gets = await GetAllActiveDiscount();
    var byRol = gets.discountsByRol || [];
    var byCategory = gets.discountsByCategory || [];
    var byTotal = gets.discountsByOrderTotal || [];
    var byCantByProducts = gets.discountsByProductsNumber || [];
    var byProduct = gets.discountsByProduct || [];
    setbyRol(byRol)
    setbyProductsNumber(byCantByProducts)
    setbyOrderTotal(byTotal)
    setbyProduct(byProduct)
    setByCategory(byCategory)
    console.log(byOrderTotal,'order total');

    /* switch (category) {
      case "Todos":
        var descuentos = [...byRol, ...byCategory, ...byTotal, ...byCantByProducts, ...byProduct];
        setDiscounts(descuentos)
        setOriginalList(descuentos)
        break;
      case "Descueto por rol":
        setDiscounts(byRol)
        break;
      case "Descuento por categoria":
        setDiscounts(byCategory)
        break;
      case "Descuento por total de compra":
        setDiscounts(byTotal)
        break
      case "Descuento por cantidad de productos":
        setDiscounts(byCantByProducts)
        break
      case "Descuento por producto":
        setDiscounts(byProduct)
        break;
      case "busqueda":
        const filteredDiscounts = originalList.filter(discount =>
          discount.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setDiscounts(filteredDiscounts);
        break;
      default:
        gets = await GetAllDiscount();
        byRol = gets.discountsByRol || [];
        byCategory = gets.discountsByCategory || [];
        byTotal = gets.discountsByOrderTotal || [];
        byCantByProducts = gets.discountsByProductsNumber || [];
        byProduct = gets.discountsByProduct || [];
        descuentos = [...byRol, ...byCategory, ...byTotal, ...byCantByProducts, ...byProduct];
        setDiscounts(descuentos)
        setOriginalList(descuentos)
    } */
  }

  useEffect(() => {
    getDiscountByType();
  }, []);


  return (
    <Container fluid>
      <div
        className="image-top d-flex justify-content-center align-items-center"
        style={{ width: "100%", height: "300px" }}
      >
        <Form.Group as={Col} md="4">
          <InputGroup>
            <Form.Control
              type="search"
              className="input-search text-center"
              placeholder="Buscar"
              required
            />
            <Button className="input-search">
              <FeatherIcon icon="search" />
            </Button>
          </InputGroup>
        </Form.Group>
      </div>

      <section className="my-3 text-center">
        <Container fluid>
          <h3 className="mb-0">Descuentos por categoria</h3>
          <Image className="separator mt-0" src={Separator} />
          <CookiesOffers discounts={ByCategory} />
        </Container>
      </section>

      <section
        className="my-3 text-center "
        style={{ backgroundColor: "var(--color-secondary)" }}
      >
        <Container fluid className="p-3">
          <h3 className="mb-0">Descuento por rol</h3>
          <Image className="separator mt-0 mb-0" src={Separator} />
          <CakesOffers discounts={byRol} />
        </Container>
      </section>

      <section className="my-3 text-center">
        <Container fluid>
          <h3 className="mb-0">Descuento por total de compra</h3>
          <Image className="separator mt-0" src={Separator} />
          <CookiesOffers discounts={byOrderTotal} />
        </Container>
      </section>

      <section
        className="my-3 text-center "
        style={{ backgroundColor: "var(--color-secondary)" }}
      >
        <Container fluid className="p-3">
          <h3 className="mb-0">Descuento por producto</h3>
          <Image className="separator mt-0 mb-0" src={Separator} />
          <CakesOffers discounts={byProduct} />
        </Container>
      </section>

      <section className="my-3 text-center">
        <Container fluid>
          <h3 className="mb-0">Por Cantidad de productos</h3>
          <Image className="separator mt-0" src={Separator} />
          <CookiesOffers discounts={byProductsNumber} />
        </Container>
      </section>
    </Container>
  );
};

export default OffersList;
