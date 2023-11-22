import { Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import Image1 from '../../assets/Products/pastel1.jpeg'
import Image2 from '../../assets/Products/pastel2.jpeg'

function CupCakesList() {
    return <>
        <Carousel fade>
            <Carousel.Item className=''>
                <Row className='d-flex justify-content-center'>
                    <Col xs={12} md={4} className='text-center mx-2 mt-2 mb-4' >
                        <div className='productBlack col-12 col-sm-6 col-md-12 col-lg-12 mb-4' style={{ backgroundColor: "var(--color-product-info)" }}>
                            <Row>
                                <Col xs={12} md={3}>
                                    <Image className='image_product_offers my-2 ms-3 shadow' src={Image2} roundedCircle />
                                </Col>
                                <Col xs={12} md={8} className='mx-2'>
                                    <div className='mt-4'>
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
                    <Col xs={12} md={4} className='text-center mx-2 mt-2 mb-4'>
                        <div className='productBlack col-12 col-sm-6 col-md-12 col-lg-12 mb-4' style={{ backgroundColor: "var(--color-product-info)" }}>
                            <Row>
                                <Col xs={12} md={3}>
                                    <Image className='image_product_offers my-2 ms-3 shadow' src={Image1} roundedCircle />
                                </Col>
                                <Col xs={12} md={8} className='mx-2'>
                                    <div className='mt-4'>
                                        <p className='info_products_offers mt-2' style={{ display: 'inline-block' }}>Galletas mosntruo.........</p>
                                        <p style={{ display: 'inline-block', marginLeft: '10px' }}>$150.00</p>
                                    </div>
                                    <div>
                                        <small className='info_products_offers mb-5'>Galletas tipo brownie con nutella (12pzs)</small>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Carousel.Item>
        </Carousel>

    </>
}

export default CupCakesList