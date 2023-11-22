import React from "react";
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

import Separator from "../../assets/separator.png";
import CookiesList from "./CookiesOffers";
import CakesList from "./CakesOffers";
import CupCakesList from "./CupcakesOffers";

const OffersList = () => {
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

      {/*
      ejemplo de las imagenes con la oferta 
      <div className="imagewithoffer mt-5 mx-5">
        <Image className='image_product_offers shadow' src="https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" roundedCircle />
        <div className="notification-icon">50%</div>
      </div> */}

      <section className="my-3 text-center">
        <Container fluid>
          <h3 className="mb-0">Galletas</h3>
          <Image className="separator mt-0" src={Separator} />
          <CookiesList />
        </Container>
      </section>

      <section
        className="my-3 text-center "
        style={{ backgroundColor: "var(--color-secondary)" }}
      >
        <Container fluid className="p-3">
          <h3 className="mb-0">Pasteles</h3>
          <Image className="separator mt-0 mb-0" src={Separator} />
          <CakesList />
        </Container>
      </section>

      <section className="my-3 text-center">
        <Container fluid>
          <h3 className="mb-0">Cupcakes</h3>
          <Image className="separator mt-0" src={Separator} />
          <CupCakesList />
        </Container>
      </section>

      <section
        className="my-3 text-center "
        style={{ backgroundColor: "var(--color-secondary)" }}
      >
        <Container fluid className="p-3">
          <h3 className="mb-0">Pasteles</h3>
          <Image className="separator mt-0 mb-0" src={Separator} />
          <CakesList />
        </Container>
      </section>
    </Container>
  );
};

export default OffersList;
