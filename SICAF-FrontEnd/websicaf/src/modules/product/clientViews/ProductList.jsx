import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Form, InputGroup, Button } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';


import getProductsByCategoryAndstatus from '../Functions/GetAll';
import Separator from "../../../assets/separator.png";
import CookiesList from './CookiesList';
import CakesList from './CakesList';
import Overlay from '../../utils/Overlay';
import WithOutProducts from '../../utils/withoutProducts';



const ProductList = () => {
  const [Cookies, setCookies] = useState([])
  const [CupCakes, setCupCakes] = useState([])
  const [Pays, setPays] = useState([])
  const [Cakes, setCakes] = useState([])
  const [HotDrinkds, setHotDrinkds] = useState([])
  const [ColdDrinkds, setColdDrinkds] = useState([])
  const [overlay, setOverlay] = useState(true)



  useEffect(() => {
    getProductsByCategoryAndstatus({ status: true, category: 1 }).then((cookies) => setCookies(cookies))
    getProductsByCategoryAndstatus({ status: true, category: 2 }).then((cakes) => setCupCakes(cakes))
    getProductsByCategoryAndstatus({ status: true, category: 3 }).then((pays) => setPays(pays))
    getProductsByCategoryAndstatus({ status: true, category: 4 }).then((cakes) => setCakes(cakes))
    getProductsByCategoryAndstatus({ status: true, category: 5 }).then((drinks) => setHotDrinkds(drinks))
    getProductsByCategoryAndstatus({ status: true, category: 6 }).then((drinks) => setColdDrinkds(drinks))

    setOverlay(false)

  }, []);


  return (
    <Container fluid>
      <div className='image-top d-flex justify-content-center align-items-center' style={{ width: '100%', height: '300px' }}>
        <Form.Group as={Col} md="4">
          <InputGroup>
            <Form.Control type="search" className='input-search text-center' placeholder="Buscar" required />
            <Button className='input-search'>
              <FeatherIcon icon="search" />
            </Button>
          </InputGroup>
        </Form.Group>
      </div>

      <section className='my-3 text-center'>
        <Container fluid >
          <h3 className='mb-0'>Galletas</h3>
          <Image className='separator mt-0' src={Separator} />
          { Cookies.length >0 ? <CookiesList products={Cookies} /> : <WithOutProducts/>}
        </Container>
      </section>


      <section className='my-3 text-center ' style={{ backgroundColor: "var(--color-secondary)" }}>
        <Container fluid className='p-3'>
          <h3 className='mb-0'>Pasteles</h3>
          {<Image className='separator mt-0' src={Separator} />}
          {Cakes.length > 0 ? <CakesList products={Cakes} /> : <WithOutProducts/>}
        </Container>
      </section>

      <section className='my-3 text-center'>
        <Container fluid >
          <h3 className='mb-0'>Cupcakes</h3>
          <Image className='separator mt-0' src={Separator} />
          { Pays.length >0 ? <CookiesList products={Pays} /> : <WithOutProducts/>}
        </Container>
      </section>

      <section className='my-3 text-center ' style={{ backgroundColor: "var(--color-secondary)" }}>
        <Container fluid className='p-3'>
          <h3 className='mb-0'>Panes</h3>
          {<Image className='separator mt-0' src={Separator} />}
          {CupCakes.length > 0 ? <CakesList products={CupCakes} /> : <WithOutProducts/>}
        </Container>
      </section>

      <section className='my-3 text-center'>
        <Container fluid >
          <h3 className='mb-0'>Bebidas Calientes</h3>
          <Image className='separator mt-0' src={Separator} />
          { HotDrinkds.length >0 ? <CookiesList products={HotDrinkds} /> : <WithOutProducts/>}
        </Container>
      </section>

      <section className='my-3 text-center ' style={{ backgroundColor: "var(--color-secondary)" }}>
        <Container fluid className='p-3'>
          <h3 className='mb-0'>Bebidas frias</h3>
          {<Image className='separator mt-0' src={Separator} />}
          {ColdDrinkds.length > 0 ? <CakesList products={ColdDrinkds} /> : <WithOutProducts/>}
        </Container>
      </section>

    </Container>


  )
}

export default ProductList
