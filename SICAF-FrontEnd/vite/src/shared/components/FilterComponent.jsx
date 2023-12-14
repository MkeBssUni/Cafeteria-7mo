import React from "react";
import { useNavigate } from "react-router-dom";
import { Figure } from "react-bootstrap";
import fondo from "../../assets/fondo.jpg";
import buscar from "../../assets/buscar.png";
import agregar from "../../assets/agregar.png";

const FilterComponent = ({ filterText, onFilter}) => {
    const navigation = useNavigate();
    const handleOpen = () =>{
        navigation("/userform", { replace: true });
    }
  return (
    <div className="card" style={{ position: "relative", border: "none" }}>
      <Figure.Image className="fondo-user" alt="fondo-user" src={fondo} />
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
          value={filterText}
          onChange={onFilter}
        />
        <span
          className="input-group-text rounded-end"
          id="basic-addon2"
          style={{ backgroundColor: "var(--color-search)" }}
        >
          <img src={buscar} width="25" height="25" />
        </span>
        <button
          className="btn btn-primary rounded-pill"
          type="submit"
          style={{
            backgroundColor: "var(--color-search)",
            color: "var(--color-primary)",
            marginLeft: "20px",
          }}
          onClick={handleOpen}
        >
          <span style={{ marginRight: "8px" }} >Registrar</span>
          <img src={agregar} width="25" height="25" alt="Agregar Icon" />
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
