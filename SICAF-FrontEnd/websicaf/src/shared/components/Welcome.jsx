import React from "react";
import { Carousel, Figure, Button, Row, Col, Card } from "react-bootstrap";
import SvgIcon from "@mui/material/SvgIcon";
import foto1 from "../../assets/taza-1.jpeg";
import foto2 from "../../assets/taza-2.jpeg";
import linea from "../../assets/linea-cafe.png";
import lugar from "../../assets/lugar.jpg";
import PlaceIcon from "@mui/icons-material/Place";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const Welcome = () => {
  return (
    <>
     <body>
     <div className="carrusel-foto">
        <Carousel>
          <Carousel.Item>
            <Figure.Image alt="LOGOSICAFCREMA" className="foto" src={foto2} />
            <Carousel.Caption>
              <h2>SICAF</h2>
              <p>
                <b>
                  Donde el café caliente encuentra su hogar y tu corazón
                  encuentra su refugio.
                </b>
              </p>
              <Button variant="outline-light">Compra Aquí</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Figure.Image alt="LOGOSICAFCREMA" className="foto" src={foto1} />
            <Carousel.Caption>
              <h2>SICAF</h2>
              <p>
                <b>
                  Las mejores ofertas en postres siempre se han encontrado aquí
                </b>
              </p>
              <Button variant="outline-light">Ofertas</Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="text-center f">
        <h5 className="uente-bienvenida">Encuentranos en:</h5>
        <Figure.Image alt="LOGOSICAFCREMA" src={linea} />
      </div>
      <div>
        <Row
          className="d-flex justify-content-center
            align-items-center h-100"
        >
          <Col className="col-xl-5 text-center">
            <Card body>
              <h5>
                {" "}
                <SvgIcon component={PlaceIcon} inheritViewBox />
                C. Gutemberg 2, Cuernavaca Centro, Centro, 62000 Cuernavaca,
                Mor.
              </h5>
              <h5>
                {" "}
                <SvgIcon component={InstagramIcon} inheritViewBox />
                SICAF
              </h5>
              <h5>
                {" "}
                <SvgIcon component={FacebookIcon} inheritViewBox />
                SICAF
              </h5>
            </Card>
          </Col>
          <Col className="col-xl-6 text-center">
            <Figure.Image className="foto-bienvenida center" src={lugar} />
          </Col>
        </Row>
        
      </div>
     </body>
    </>
  );
};

export default Welcome;
