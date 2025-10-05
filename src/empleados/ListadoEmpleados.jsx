import axios from "axios";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

export default function ListadoEmpleados() {
  const urlBase = "http://localhost:8080/api/empleados";

  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    try {
      const resultado = await axios.get(urlBase);
      console.log("Resultado de cargar empleados");
      console.log(resultado.data);
      setEmpleados(resultado.data);
    } catch (error) {
      console.error("Error al cargar empleados: ", error);
    }
  };

  const eliminarEmpleado = async (id) => {
    await axios.delete(`${urlBase}/${id}`);
    cargarEmpleados();
  };

  const confirmarEliminacion = (id) => {
    console.log("Clic en eliminar");
    Swal.fire({
      title: "¿Desea eliminar este empleado?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: 'No',
      confirmButtonColor: "#d33",
      calcelButtonColor: "#6c757d",
      reverserButtons: true,
      width: "300px",
      background: "#fff",
      customClass: {
        popup: "shadow-sm rounded-3",
      },
      backdrop:false, // Esto hace que No bloquee toda la pantalla
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarEmpleado(id);
      }
    });
  };

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Sistema de Recursos Humanos</h3>
      </div>

      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Empleado</th>
            <th scope="col">Departamento</th>
            <th scope="col">Sueldo</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            // Iterar el arreglo de empleado
            empleados.map((empleado) => (
              <tr key={empleado.idEmpleado}>
                <th scope="row">{empleado.idEmpleado}</th>
                <td>{empleado.nombre}</td>
                <td>{empleado.departamento}</td>
                <td>
                  <NumericFormat
                    value={empleado.sueldo}
                    displayType={"text"}
                    thousandSeparator=","
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale
                  />
                </td>
                <td className="text-center">
                  <div>
                    <Link
                      to={`/editar/${empleado.idEmpleado}`}
                      className="btn btn-warning btn-sm me-3  rounded-circle"
                      title="Editar"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                    <button
                      onClick={() => confirmarEliminacion(empleado.idEmpleado)}
                      className="btn btn-danger btn-sm  rounded-circle"
                      title="Eliminar"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
