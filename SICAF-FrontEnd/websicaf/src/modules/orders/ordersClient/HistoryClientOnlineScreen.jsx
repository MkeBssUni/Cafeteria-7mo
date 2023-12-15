import React, { useState, useEffect, useContext } from "react";
import { Badge, Card, Figure } from "react-bootstrap";
import FondoH from "../../../assets/FondoH.jpg";
import DataTable from "react-data-table-component";
import GetUserOnlineHistory from './../Functions/GetUserOnlineHistory';
import { AuthContext } from "../../../modules/auth/authContext";

const option = {
  rowsPerPageText: "Registros por página",
  rangeSeparatorText: "de",
};
const HistoryClientOnlineScreen = () => {
  const [valorSeleccionado, setValorSeleccionado] = useState("");
  const [pedidos, setpedidos] = useState([]);
  const { user } = useContext(AuthContext);

  const handleSelectChange = (event) => {
    setValorSeleccionado(event.target.value);
  };

  const fecha = new Date();
  // Obtener el año
  const añoActual = fecha.getFullYear();

  // Obtener la fecha del día en formato 2023-12-10
  const formatoFechaDia = `${añoActual}-${(fecha.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${fecha.getDate().toString().padStart(2, "0")}`;

  // Obtener el mes en formato 2023-12
  const formatoFechaMes = `${añoActual}-${(fecha.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;

  const initialValues = {
    id: user.id,
    value: "",
    filter: valorSeleccionado,
  };

  const getPedidos = async (newInitialValue) => {
    try {
      initialValues.value = newInitialValue;
      const data = await GetUserOnlineHistory(initialValues);
      setpedidos(data);
    } catch (error) {
      console.error("Error en el servicio", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPedidos(
        valorSeleccionado === "year"
          ? añoActual
          : valorSeleccionado === "month"
          ? formatoFechaMes
          : formatoFechaDia
      );
    };

    fetchData();
  }, [valorSeleccionado]);
  

  const columns = React.useMemo(() => [
    {
      name: "Empleado que atendio",
      cell: (row) => <div>{row.employee}</div>,
      sortable: true,
      selector: (row) => row.employee,
    },
    {
      name: "Método de  Pago",
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
      cell: (row) => <div>{row.products[0].name}</div>,
      sortable: true,
      selector: (row) => row.products[0].name,
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
            data={pedidos}
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


export default HistoryClientOnlineScreen