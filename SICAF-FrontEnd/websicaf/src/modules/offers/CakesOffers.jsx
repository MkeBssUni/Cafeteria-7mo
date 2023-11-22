import { Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import Image1 from '../../assets/Products/pastel1.jpeg'
import Image2 from '../../assets/Products/pastel2.jpeg'

function CupCakesList() {
    return <>
        <Carousel /* fade */ pause="hover" variant='dark' >
        <Carousel.Item  interval={4500}>
                <Row className='d-flex justify-content-center mt-2 mb-4'>
                    <Col xs={12} md={4} className='text-center mx-2 my-4' >
                        <div className='productBlack col-12 col-sm-6 col-md-12 col-lg-12' style={{ backgroundColor: "var(--color-product-info)" }}>
                            <Row>
                                <Col xs={12} md={3}>
                                    <div className="imagewithoffer">
                                        <Image className='image_product_offers my-2 ms-3 shadow' src={Image2} roundedCircle />
                                        <div className="notification-icon shadow">-50%</div>
                                    </div>
                                </Col>
                                <Col xs={12} md={8} className='mx-2'>
                                    <div>
                                        <p className='info_products_offers mt-2' style={{ display: 'inline-block' }}>Pastel de limon.........</p>
                                        <p style={{ display: 'inline-block', marginLeft: '10px' }}>$150.00</p>
                                    </div>
                                    <div>
                                        <small className='info_products_offers mb-5'>Pastel de limon, con merengue de limon</small>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={12} md={4} className='text-center mx-2 my-4' >
                        <div className='productBlack col-12 col-sm-6 col-md-12 col-lg-12' style={{ backgroundColor: "var(--color-product-info)" }}>
                            <Row>
                                <Col xs={12} md={3}>
                                    <div className="imagewithoffer">
                                        <Image className='image_product_offers my-2 ms-3 shadow' src={Image1} roundedCircle />
                                        <div className="notification-icon shadow">-50%</div>
                                    </div>
                                </Col>
                                <Col xs={12} md={8} className='mx-2'>
                                    <div>
                                        <p className='info_products_offers mt-2' style={{ display: 'inline-block' }}>Pastel de limon.........</p>
                                        <p style={{ display: 'inline-block', marginLeft: '10px' }}>$150.00</p>
                                    </div>
                                    <div>
                                        <small className='info_products_offers mb-5'>Pastel de limon, con merengue de limon</small>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Carousel.Item >
        </Carousel>

    </>
}

export default CupCakesList