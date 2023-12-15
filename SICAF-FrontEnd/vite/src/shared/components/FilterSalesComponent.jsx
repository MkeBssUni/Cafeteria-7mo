import React from "react";
import FondoH from '../../assets/FondoH.jpg'
import 'css/color.css'
import { Figure } from 'react-bootstrap';

const FilterSalesComponent = ({startDile}) => {
  return (
    <div className="card" style={{ position: "relative", border: "none" }}>
      <Figure.Image className="fondo-user" alt="fondo-user" src={FondoH} />
      <div
        className="input-group mb-3"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
        }}
      >
        <select
          class="form-select form-select-lg mb-3 centered-text"
          aria-label="Large select example"
        >
          <option selected>Mostrar por: </option>
          <option value="day">Dia</option>
          <option value="month">Mes</option>
          <option value="year">Año</option>
        </select>
        {/* Calendar picker */}
      </div>
    </div>
  );
};

export default FilterSalesComponent;
