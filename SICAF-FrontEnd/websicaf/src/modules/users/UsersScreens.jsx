import React, { useState, useEffect } from "react";
import { Badge,Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../shared/css/color.css";
import FilterComponent from "../../shared/components/FilterComponent";
import DataTable from "react-data-table-component";
import GetUser from "./Functions/GetUser";
import editar from "../../assets/editar.png";
import eliminar from "../../assets/eliminar.png";
import CryptoJS from 'crypto-js';
import ChageStatus from "./Functions/ChageStatus"
import Alert,{confirmTitle,errorTitle,confirmMsj,errorMsj} from "../../shared/plugins/alerts"

const option = {
  rowsPerPageText: "Registros por página",
  rangeSeparatorText: "de",
};
const UsersScreens = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [setselectUser, setSetselectUser] = useState({});
  const navigation = useNavigate();

  const filteredUsuarios = usuarios
    ? usuarios.filter(
        (user) =>
          user.person.name &&
          user.person.name.toLowerCase().includes(filterText.toLowerCase())
      )
    : [];

  const getUsuarios = async () => {
    try {
      const data = await GetUser();
      if (!data.error) {
        setUsuarios(data); // Update this line to setUsuarios(data.data)
      }
    } catch (error) {
      console.error("No esta funcionando");
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);
  
  const handleOpen = (row) => {
    console.log(row.user_id);
    const datos = row.user_id.toString();  // Convierte a cadena si no lo es
    const datosCifrado = datos ? CryptoJS.AES.encrypt(datos, 'sicaf-Cofee').toString() : '';
    navigation(`/useredt/${datosCifrado}`);
  };

  const enableOrDisable = (row) => {
    Alert.fire({
        title: confirmTitle,
        text: confirmMsj,
        icon: 'warning',
        confirmButtonColor: '#009574',
        confirmButtonText: 'Aceptar',
        cancelButtonColor: '#DD6B55',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        backdrop: true,
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Alert.isLoading,
        preConfirm: async () => {
            try {
               return await ChageStatus(row.user_id);
            } catch (error) {
                Alert.fire({
                    title: errorTitle,
                    text: errorMsj,
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Aceptar'
                })
            } finally {
                getUsuarios()
            }
        }
    })
}

  const handleClear = () => {
    if (filterText) setFilterText("");
  };

  const columns = React.useMemo(() => [
    {
      name: "Nombre Completo",
      cell: (row) => (
        <div>
          {row.person.name}
          {row.lastname}
        </div>
      ),
      sortable: true,
      selector: (row) => row.person.name + row.lastname,
    },
    {
      name: "Correo Electrónico",
      cell: (row) => <div>{row.email}</div>,
      sortable: true,
      selector: (row) => row.email,
    },
    {
      name: "Genero",
      cell: (row) => <div>{row.person.gender}</div>,
      sortable: true,
      selector: (row) => row.person.gender,
    },
    {
      name: "Teléfono",
      cell: (row) => <div>{row.person.phone_number1}</div>,
      sortable: true,
      selector: (row) => row.person.phone_number1,
    },
    {
      name: "Estado",
      cell: (row) =>
        row.status ? (
          <Badge bg="success">Activo</Badge>
        ) : (
          <Badge bg="danger">Inactivo</Badge>
        ),
      sortable: true,
      selector: (row) => row.status,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <button type="button" class="btn btn-link" onClick={() => {
                handleOpen(row);
            }}>
            <img src={editar}   width="35" height="35" />
          </button>
          <button type="button" class="btn btn-link" onClick={() => {
                enableOrDisable(row);
            }}> 
            <img src={eliminar} width="31" height="31" />
          </button>
        </>
      ),
    },
  ]);

  return (
    <>
    <body>
    <div>
    <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
      <div className="center">
      <Card className="size-Table">
        <DataTable
          columns={columns}
          data={filteredUsuarios}
          noDataComponent={"Sin registros"}
          pagination
          paginationComponentOptions={option}
          persistTableHead
          striped={true}
          highlightOnHover={true}
          customStyles={{
            table: {
              textAlign: 'center',
            },
          }}
        />
      </Card>
      </div>
    </div>
    </body>
    </>
  );
};

export default UsersScreens;
