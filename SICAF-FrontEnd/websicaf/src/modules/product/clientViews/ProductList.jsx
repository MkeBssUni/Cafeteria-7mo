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

import getProductsByCategoryAndstatus from "../Functions/GetAll";
import Separator from "../../../assets/separator.png";
import CookiesList from "./CookiesList";
import CakesList from "./CakesList";
import Overlay from "../../utils/Overlay";
import WithOutProducts from "../../utils/withoutProducts";

const ProductList = () => {
  const [Cookies, setCookies] = useState([]);
  const [cakes, setCakes] = useState([]);
  const [cupcakes, setCupcakes] = useState([]);
  const [breads, setBreads] = useState([]);
  const [HotDrinkds, setHotDrinkds] = useState([]);
  const [ColdDrinkds, setColdDrinkds] = useState([]);
  const [overlay, setOverlay] = useState(true);
  const [Search, setSearch] = useState("");

  const [CookiesCopy, setCookiesCopy] = useState([]);
  const [cakesCopy, setCakesCopy] = useState([]);
  const [cupCakesCopy, setCupcakesCopy] = useState([]);
  const [breadsCopy, setBreadsCopy] = useState([]);
  const [HotDrinkdsCopy, setHotDrinkdsCopy] = useState([]);
  const [ColdDrinkdsCopy, setColdDrinkdsCopy] = useState([]);

  const getProductsByType = () => {
    if (Search.length === 0) {
      console.log(Search,'entro aqio');
      getProductsByCategoryAndstatus({ status: true, category: 1 }).then((cookies) => {setCookies(cookies);setCookiesCopy(Cookies); });
      

      getProductsByCategoryAndstatus({ status: true, category: 2 }).then((cakes) => setCakes(cakes));
      setCakesCopy(cakes)

      getProductsByCategoryAndstatus({ status: true, category: 3 }).then((cupcakes) => setCupcakes(cupcakes));
      setCupcakesCopy(cupcakes);

      getProductsByCategoryAndstatus({ status: true, category: 4 }).then((breads) => setBreads(breads));
      setBreadsCopy(breads);

      getProductsByCategoryAndstatus({ status: true, category: 5 }).then((drinks) => setHotDrinkds(drinks));
      setHotDrinkdsCopy(HotDrinkds);

      getProductsByCategoryAndstatus({ status: true, category: 6 }).then((drinks) => setColdDrinkds(drinks));
      setColdDrinkdsCopy(ColdDrinkds);

    } else {
      
      const filteredCookies = CookiesCopy.filter((product) => product.name.toLowerCase().includes(Search.toLowerCase()));
      setCookies(filteredCookies);
      console.log(Cookies,'cookies');

      const filteredCakes = cakesCopy.filter((product) =>product.name.toLowerCase().includes(Search.toLowerCase()));
      setCakes(filteredCakes);
  console.log(cakes,'pasteles');

      const filteredBreads = cupCakesCopy.filter((product) => product.name.toLowerCase().includes(Search.toLowerCase()));
      setCupcakes(filteredBreads);
      console.log(cupcakes,'cupcakes');

      const filteredCupcakes = breadsCopy.filter((product) =>product.name.toLowerCase().includes(Search.toLowerCase()));
      setBreads(filteredCupcakes);
      console.log(breads,'panes');

      const filteredCHotDrinks = HotDrinkdsCopy.filter((product) =>product.name.toLowerCase().includes(Search.toLowerCase()));
      setHotDrinkds(filteredCHotDrinks);
      console.log(HotDrinkds,'calientes');

      const filteredColdtDrinks = ColdDrinkdsCopy.filter((product) =>product.name.toLowerCase().includes(Search.toLowerCase()));
      setColdDrinkds(filteredColdtDrinks);
      console.log(ColdDrinkds,'frias');

      console.log(Search,'entro aca');
    }
  };

  useEffect(() => {
    getProductsByType();
    setOverlay(false);
  }, [Search]);

  return (<>
    <div
      className="image-top d-flex justify-content-center align-items-center"
      style={{ width: "100%", height: "300px" }}
    >
      <Form.Group as={Col} xs="12" md="5" className="mx-5">
        <InputGroup>
          <Form.Control
            type="search"
            className="input-search text-center"
            placeholder="Buscar"
            value={Search}
            onChange={({ target }) => {
              setSearch(target.value);
            }}
          />
          <Button className="input-search">
            <FeatherIcon icon="search" />
          </Button>
        </InputGroup>
      </Form.Group>
    </div>
    <Container fluid>
      <section className="my-3 text-center">
        <Container fluid>
          <h3 className="mb-0">Galletas</h3>
          <Image className="separator mt-0" src={Separator} />
          {Cookies.length > 0 ? (
            <CookiesList products={Cookies} />
          ) : (
            <WithOutProducts />
          )}
        </Container>
      </section>

      <section
        className="my-3 text-center " 
        style={{ backgroundColor: "var(--color-secondary)" }}
      >
        <Container fluid className="p-3">
          <h3 className="mb-0">Pasteles</h3>
          {<Image className="separator mt-0" src={Separator} />}
          {cakes.length > 0 ? (
            <CakesList products={cakes} />
          ) : (
            <WithOutProducts />
          )}
        </Container>
      </section>

      <section className="my-3 text-center">
        <Container fluid>
          <h3 className="mb-0">Cupcakes</h3>
          <Image className="separator mt-0" src={Separator} />
          {cupcakes.length > 0 ? (
            <CookiesList products={cupcakes} />
          ) : (
            <WithOutProducts />
          )}
        </Container>
      </section>

      <section
        className="my-3 text-center "
        style={{ backgroundColor: "var(--color-secondary)" }}
      >
        <Container fluid className="p-3">
          <h3 className="mb-0">Panes</h3>
          {<Image className="separator mt-0" src={Separator} />}
          {breads.length > 0 ? (
            <CakesList products={breads} />
          ) : (
            <WithOutProducts />
          )}
        </Container>
      </section>

      <section className="my-3 text-center">
        <Container fluid>
          <h3 className="mb-0">Bebidas Calientes</h3>
          <Image className="separator mt-0" src={Separator} />
          {HotDrinkds.length > 0 ? (
            <CookiesList products={HotDrinkds} />
          ) : (
            <WithOutProducts />
          )}
        </Container>
      </section>

      <section
        className="my-3 text-center "
        style={{ backgroundColor: "var(--color-secondary)" }}
      >
        <Container fluid className="p-3">
          <h3 className="mb-0">Bebidas frias</h3>
          {<Image className="separator mt-0" src={Separator} />}
          {ColdDrinkds.length > 0 ? (
            <CakesList products={ColdDrinkds} />
          ) : (
            <WithOutProducts />
          )}
        </Container>
      </section>
    </Container>
  </>

  );
};

export default ProductList;
