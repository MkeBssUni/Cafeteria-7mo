import { Row, Col, Image, Carousel } from 'react-bootstrap';
import Image1 from '../../assets/Products/galletas2.jpeg'
import Image2 from '../../assets/Products/galletas2.png'

function CookiesList() {
    return <>

        <Carousel /* fade */>
            <Carousel.Item interval={3000}>
                <Row className='d-flex justify-content-center'>
                    <Col xs={12} md={4} className='text-center mx-2 my-2'>
                        <div className='col-12 col-sm-6 col-md-12 col-lg-12 mt-3'>
                            <Row>
                                <Col xs={12} md={3}>
                                    <div className="imagewithoffer">
                                        <Image className='image_product_offers shadow' src={Image2} roundedCircle />
                                        <div className="notification-icon shadow">-50%</div>
                                    </div>
                                </Col>
                                <Col xs={12} md={8} className='mx-2'>
                                    <div>
                                        <p className='info_products_offers mt-2' style={{ display: 'inline-block' }}>Galletas mosntruo.........</p>
                                        <p style={{ display: 'inline-block', marginLeft: '10px' }}>$150.00</p>
                                    </div>
                                    <div>
                                        <small className='info_products_offers'>Galletas tipo brownie con nutella (12pzs)</small>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={12} md={4} className='text-center mx-2 my-2'>
                        <div className='col-12 col-sm-6 col-md-12 col-lg-12 mt-3'>
                            <Row>
                                <Col xs={12} md={3}>
                                    <div className="imagewithoffer">
                                        <Image className='image_product_offers shadow' src={Image1} roundedCircle />
                                        <div className="notification-icon shadow">-30%</div>
                                    </div>
                                </Col>
                                <Col xs={12} md={8} className='mx-2'>
                                    <div>
                                        <p className='info_products_offers mt-2' style={{ display: 'inline-block' }}>Surtido de galletas .........</p>
                                        <p style={{ display: 'inline-block', marginLeft: '10px' }}>$150.00</p>
                                    </div>
                                    <div>
                                        <small className='info_products_offers'>6 tipos de galletas sorpresa(12pzs)</small>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <Row className='d-flex justify-content-center'>
                    <Col xs={12} md={4} className='text-center mx-2 my-2'>
                        <div className='col-12 col-sm-6 col-md-12 col-lg-12 mt-3'>
                            <Row>
                                <Col xs={12} md={3}>
                                    <div className="imagewithoffer">
                                        <Image className='image_product_offers shadow' src={Image2} roundedCircle />
                                        <div className="notification-icon shadow">-50%</div>
                                    </div>
                                </Col>
                                <Col xs={12} md={8} className='mx-2'>
                                    <div>
                                        <p className='info_products_offers mt-2' style={{ display: 'inline-block' }}>Galletas mosntruo.........</p>
                                        <p style={{ display: 'inline-block', marginLeft: '10px' }}>$150.00</p>
                                    </div>
                                    <div>
                                        <small className='info_products_offers'>Galletas tipo brownie con nutella (12pzs)</small>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={12} md={4} className='text-center mx-2 my-2'>
                        <div className='col-12 col-sm-6 col-md-12 col-lg-12 mt-3'>
                            <Row>
                                <Col xs={12} md={3}>
                                    <div className="imagewithoffer">
                                        <Image className='image_product_offers shadow' src={Image1} roundedCircle />
                                        <div className="notification-icon shadow">-30%</div>
                                    </div>
                                </Col>
                                <Col xs={12} md={8} className='mx-2'>
                                    <div>
                                        <p className='info_products_offers mt-2' style={{ display: 'inline-block' }}>Surtido de galletas .........</p>
                                        <p style={{ display: 'inline-block', marginLeft: '10px' }}>$150.00</p>
                                    </div>
                                    <div>
                                        <small className='info_products_offers'>6 tipos de galletas sorpresa(12pzs)</small>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <Row className='d-flex justify-content-center'>
                    <Col xs={12} md={4} className='text-center mx-2 my-2'>
                        <div className='col-12 col-sm-6 col-md-12 col-lg-12 mt-3'>
                            <Row>
                                <Col xs={12} md={3}>
                                    <div className="imagewithoffer">
                                        <Image className='image_product_offers shadow' src={Image2} roundedCircle />
                                        <div className="notification-icon shadow">-50%</div>
                                    </div>
                                </Col>
                                <Col xs={12} md={8} className='mx-2'>
                                    <div>
                                        <p className='info_products_offers mt-2' style={{ display: 'inline-block' }}>Galletas mosntruo.........</p>
                                        <p style={{ display: 'inline-block', marginLeft: '10px' }}>$150.00</p>
                                    </div>
                                    <div>
                                        <small className='info_products_offers'>Galletas tipo brownie con nutella (12pzs)</small>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={12} md={4} className='text-center mx-2 my-2'>
                        <div className='col-12 col-sm-6 col-md-12 col-lg-12 mt-3'>
                            <Row>
                                <Col xs={12} md={3}>
                                    <div className="imagewithoffer">
                                        <Image className='image_product_offers shadow' src={Image1} roundedCircle />
                                        <div className="notification-icon shadow">-30%</div>
                                    </div>
                                </Col>
                                <Col xs={12} md={8} className='mx-2'>
                                    <div>
                                        <p className='info_products_offers mt-2' style={{ display: 'inline-block' }}>Surtido de galletas .........</p>
                                        <p style={{ display: 'inline-block', marginLeft: '10px' }}>$150.00</p>
                                    </div>
                                    <div>
                                        <small className='info_products_offers'>6 tipos de galletas sorpresa(12pzs)</small>
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

export default CookiesList;