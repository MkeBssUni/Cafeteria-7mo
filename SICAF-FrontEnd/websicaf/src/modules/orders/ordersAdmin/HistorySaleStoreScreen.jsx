import React, { useState, useEffect } from "react";
import { Badge, Card, Figure } from "react-bootstrap";
import FondoH from "../../../assets/FondoH.jpg";
import DataTable from "react-data-table-component";
import GetPresentialOrders from "./../Functions/GetPresentialOrders";

const option = {
  rowsPerPageText: "Registros por página",
  rangeSeparatorText: "de",
};
const HistorySaleStoreScreen = () => {
  const [valorSeleccionado, setValorSeleccionado] = useState("");
  const [pedidosHistorial, setPedidosHistorial] = useState([]);
  const handleSelectChange = (event) => {
    const nuevoValor = event.target.value;
    setValorSeleccionado(nuevoValor);
    getPedidos();
  };

  const initialValues = { value: "2023", filter: "year" };

  const getPedidos = async () => {
    try {
      console.log(initialValues);
      const data = await GetPresentialOrders(initialValues);
      setPedidosHistorial(data);
      console.log(data);
    } catch (error) {
      console.error("Error en el servicio");
    }
  };

  useEffect(async () => {
    await getPedidos();
  }, []);

  const columns = React.useMemo(() => [
    {
      name: "Empleado que atendio",
      cell: (row) => <div>{row.employee}</div>,
      sortable: true,
      selector: (row) => row.employee,
    },
    {
      name: "Cliente",
      cell: (row) => <div>{row.client}</div>,
      sortable: true,
      selector: (row) => row.client,
    },
    {
      name: "Método de Pago",
      cell: (row) => <div>{row.payment_method}</div>,
      sortable: true,
      selector: (row) => row.payment_method,
    },
    {
      name: "Estado",
      cell: (row) => <Badge bg="success">{row.status}</Badge>,
      sortable: true,
      selector: (row) => row.status,
    },
    {
      name: "Producto",
      cell: (row) => <div>$ {row.products.name}</div>,
      sortable: true,
      selector: (row) => row.products.name,
    },
    {
      name: "Cantidad",
      cell: (row) => <div>{row.products_sold}</div>,
      sortable: true,
      selector: (row) => row.products_sold,
    },
    {
      name: "Total",
      cell: (row) => <div>$ {row.total}</div>,
      sortable: true,
      selector: (row) => row.total,
    },
  ]);

  return (
    <body>
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
            className="form-select form-select-lg mb-3 centered-text"
            aria-label="Large select example"
            value={valorSeleccionado}
            onChange={handleSelectChange}
          >
            <option value="">Mostrar por:</option>
            <option value="day">Dia</option>
            <option value="month">Mes</option>
            <option value="year">Año</option>
          </select>
          {/* Calendar picker */}
        </div>
      </div>
      <div className="center">
        <Card>
          <DataTable
            columns={columns}
            data={pedidosHistorial}
            noDataComponent={"Sin pedidos por favor selecciona"}
            pagination
            paginationComponentOptions={option}
            persistTableHead
            striped={true}
            highlightOnHover={true}
            customStyles={{
              table: {
                textAlign: "center",
              },
            }}
          />
        </Card>
      </div>
    </body>
  );
};

export default HistorySaleStoreScreen;
