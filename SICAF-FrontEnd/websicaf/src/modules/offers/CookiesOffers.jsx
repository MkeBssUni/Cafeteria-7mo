import { Row, Col, Image, Carousel } from "react-bootstrap";
import Image1 from "../../assets/Products/galletas2.jpeg";
import Image2 from "../../assets/Products/galletas2.png";

function CookiesList() {
  return (
    <>
      <Carousel /* fade */ pause="hover" variant='dark'  >
      <Carousel.Item interval={8500}>
          <Row className="d-flex justify-content-center mt-2 mb-4 ">
            <Col xs={12} col={12} md={5} lg={4} className="text-center mx-2 my-4">
             <div className="product col-sm-6 col-md-12 d-flex align-items-center">
                <Row>
                  <Col xs={12} md={3} className="mx-2">
                    <div className="imagewithoffer">
                      <Image
                        className="image_product_offers my-2 ms-3 shadow"
                        src={Image2}
                        roundedCircle
                      />
                      <div className="notification-icon shadow">-50%</div>
                    </div>
                  </Col>
                  <Col xs={12} md={8} className="mx-2">
                    <div>
                      <p
                        className="info_products_offers mt-2"
                        style={{ display: "inline-block" }}
                      >
                        Galletas mosntruo.........
                      </p>
                      <p
                        style={{ display: "inline-block", marginLeft: "10px" }}
                      >
                        $150.00
                      </p>
                    </div>
                    <div>
                      <small className="info_products_offers">
                        Galletas tipo brownie con nutella (12pzs)
                      </small>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col  xs={12} col={12} md={5} lg={4} className="text-center mx-2 my-4">
              <div className="product">
                <Row>
                  <Col xs={12} md={3} className="mx-2">
                    <div className="imagewithoffer">
                      <Image
                        className="image_product_offers my-2 ms-3 shadow"
                        src={Image1}
                        roundedCircle
                      />
                      <div className="notification-icon shadow">-30%</div>
                    </div>
                  </Col>
                  <Col xs={12} md={8} className="mx-2">
                    <div>
                      <p
                        className="info_products_offers mt-2"
                        style={{ display: "inline-block" }}
                      >
                        Surtido de galletas .........
                      </p>
                      <p
                        style={{ display: "inline-block", marginLeft: "10px" }}
                      >
                        $150.00
                      </p>
                    </div>
                    <div>
                      <small className="info_products_offers mb-5">
                        6 tipos de galletas sorpresa(12pzs)
                      </small>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          </Carousel.Item>
      </Carousel>
    </>
  );
}

export default CookiesList;
