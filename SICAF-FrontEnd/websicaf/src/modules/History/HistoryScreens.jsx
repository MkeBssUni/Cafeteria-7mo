import React from 'react'
import FondoH from '../../assets/FondoH.jpg'
import '../../shared/css/color.css'
import { Figure } from 'react-bootstrap';

const HistoryScreens = () => {
  return (
    
    <div>
      <div className="card" style={{ position: 'relative', border: 'none' }}>
        <Figure.Image className="fondo-user" alt="fondo-user" src={FondoH} />
        <div className="input-group mb-3" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px' }}>
          <input
            type="text"
            className="form-control rounded-start"
            placeholder="Buscar"
            aria-label="Buscar"
            aria-describedby="basic-addon2"
            style={{
              backgroundColor: "var(--color-search)",
              textAlign: "center",
              color: "var(--color-primary)",
            }}
          />
          <span className="input-group-text rounded-end" id="basic-addon2" style={{ backgroundColor: "var(--color-search)" }}>

          </span>
        </div>
      </div>
      <div className="table tabla-personalizada" style={{ marginTop: '20px' }}>
        <table class="table table-striped ">
          <thead>
            <tr >
              <td style={{ color: 'var(--color-title)' }}> <b>Nombre</b></td>
              <td style={{ color: 'var(--color-title)' }}><b>Apellido Paterno</b></td>
              <td style={{ color: 'var(--color-title)' }}><b>Apellido Materno</b></td>
              <td style={{ color: 'var(--color-title)' }}><b>Nombre del usuario</b></td>
              <td style={{ color: 'var(--color-title)' }}><b>Correo Electrónico</b></td>
              <td style={{ color: 'var(--color-title)' }}><b>Numero de teléfono</b></td>
              <td> </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Anna Christina</td>
              <td>Bustos</td>
              <td>.</td>
              <td>gizi_jane</td>
              <td>bustos04@gmail.com</td>
              <td>7771234563</td>
            </tr>
            <tr>
              <td>Lisseth Georgina </td>
              <td>Fuentes</td>
              <td>Figueroa</td>
              <td>Alix_313</td>
              <td>Alix313gmail.com</td>
              <td>7774567893</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HistoryScreens