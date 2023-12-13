import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Carousel } from "react-bootstrap";

import logo from "../../../assets/logo-sicaf.png"
import Image1 from "../../../assets/Products/pastel1.jpeg";
import Image2 from "../../../assets/Products/pastel2.jpeg";

function CupCakesList({ products }) {
  const [selectedProductId, setSelectedProductId] = useState(null);
  return (
    <>
      <Carousel>
        {products.length > 0 &&
          Array.from({ length: Math.ceil(products.length / 2) }).map(
            (_, index) => (
              <Carousel.Item key={index}>
                <Row className="d-flex justify-content-center">
                  {[index * 2, index * 2 + 1].map((cardIndex) => (
                    <Col
                      xs={12}
                      md={4}
                      className="text-center mx-2 mt-2 mb-4"
                      key={products[cardIndex].id}
                    >
                      <div
                        className="productBlack col-12 col-sm-6 col-md-12 col-lg-12 mb-4"
                        style={{ backgroundColor: "var(--color-product-info)" }}
                      >
                        {/* Utiliza products[cardIndex] para acceder a los datos */}
                        <Row>
                          <Col xs={12} md={3}>
                            <Image
                              className="image_product_offers my-2 ms-3 shadow"
                              src={products[cardIndex].image.length > 50 ? products[cardIndex].image : logo}
                              roundedCircle
                            />
                          </Col>
                          <Col xs={12} md={8} className="mx-2">
                            <div className="mt-4">
                              <p
                                className="info_products_offers"
                                style={{ display: "inline-block" }}
                              >
                                {products[cardIndex].name}
                              </p>
                              <p
                                style={{
                                  display: "inline-block",
                                  marginLeft: "10px",
                                }}
                              >
                                {products[cardIndex].price}
                              </p>
                            </div>
                            <div>
                              <small className="info_products_offers">
                                {products[cardIndex].description.length < 60 ? products[cardIndex].description : products[cardIndex].description.substring(0, 60) + '...'}
                              </small>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            )
          )}
      </Carousel>
    </>
  );
}

export default CupCakesList;
