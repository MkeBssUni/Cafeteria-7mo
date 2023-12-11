import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Carousel } from "react-bootstrap";

import NoRegisters from "../../shared/components/Error/NotRegisters";
import Image2 from "../../assets/logo-sicaf.png";
import coffe from "../../assets/cafe (1).png"




function CookiesOffers({ discounts }) {
  console.log(discounts);
  const productNull = {
    image: "",
    id: 0,
    description: "Parece que no hay muchas ofertas...por ahora"
  }

  if (Array.isArray(discounts) && discounts.length) {
    console.log('Entro aca', discounts);
    if (discounts.length % 2 === 1) {
      discounts.push(productNull);
      console.log(discounts);
    }
  }
  return (
    <>
      <Carousel>
        {discounts.length > 0 ?
          Array.from({ length: Math.ceil(discounts.length / 2) }).map(
            (_, index) => (
              <Carousel.Item key={index}>
                <Row className="d-flex justify-content-center">
                  {[index * 2, index * 2 + 1].map((cardIndex) => (
                    <Col
                      xs={12}
                      md={4}
                      className="text-center mx-2 mt-2 mb-4"
                      key={discounts[cardIndex].id}
                    >
                      <div
                        className="product col-12 col-sm-6 col-md-12 col-lg-12 mb-4 my-4">
                        {/* Utiliza products[cardIndex] para acceder a los datos */}
                        <Row>
                          <Col xs={12} md={3}>
                            <div className="imagewithoffer">
                              <Image className='image_product_offers my-2 ms-3 shadow' src={discounts[cardIndex].image ? discounts[cardIndex].imag : Image2} roundedCircle />
                              {discounts[cardIndex].percentage && <div className="notification-icon shadow">-{discounts[cardIndex].percentage}%</div>}
                            </div>
                          </Col>
                          <Col xs={12} md={8} className='mx-2 ms-3 my-3'>
                            <p className='info_products_offers mt-2 ms-3' style={{ display: 'inline-block' }}>{discounts[cardIndex].description}</p>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            )
          )
          : (

            <div>
              <h4>Vaya...parece que no hay registros</h4>
              <Image className='image_product_offers my-2 ms-3' src={coffe} />
            </div>


          )
        }
      </Carousel>
    </>
  );
}

export default CookiesOffers
