import React from 'react';
import { Figure } from 'react-bootstrap';
import fondo from '../../assets/fondo.jpg';
import buscar from '../../assets/buscar.png'
import '../../shared/css/color.css'
import agregar from '../../assets/agregar.png'
import editar from '../../assets/editar.png'
import eliminar from '../../assets/eliminar.png'


const UsersScreens = () => {
  return (
    <div>
      <div className="card" style={{ position: 'relative', border: 'none' }}>
        <Figure.Image className="fondo-user" alt="fondo-user" src={fondo} />
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
            <img
              src={buscar}
              width="25"
              height="25"
            />
          </span>
          <button
            className="btn btn-primary rounded-pill"
            type="submit"
            style={{
              backgroundColor: "var(--color-search)",
              color: "var(--color-primary)",
              marginLeft: '20px'
            }}
          >
            <span style={{ marginRight: '8px' }}>Registrar</span>
            <img
              src={agregar}
              width="25"
              height="25"
              alt="Agregar Icon"
            />
          </button>
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
              <td>
                <button type="button" class="btn btn-link">
                  <img
                    src={editar}
                    width="35"
                    height="35"
                  />
                </button>
                <button type="button" class="btn btn-link">
                  <img
                    src={eliminar}
                    width="31"
                    height="31"
                  />
                </button>
              </td>
            </tr>
            <tr>
              <td>Lisseth Georgina </td>
              <td>Fuentes</td>
              <td>Figueroa</td>
              <td>Alix_313</td>
              <td>Alix313gmail.com</td>
              <td>7774567893</td>
              <td>
                <button type="button" class="btn btn-link">
                  <img
                    src={editar}
                    width="35"
                    height="35"
                  />
                </button>
                <button type="button" class="btn btn-link">
                  <img
                    src={eliminar}
                    width="31"
                    height="31"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersScreens;
