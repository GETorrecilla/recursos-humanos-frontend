import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AgregarEmpleado() {
    
    const[empleado, setEmpleado]=useState({
        nombre:"",
        departamento:"",
        sueldo:""
    })

    const{nombre, departamento, sueldo} = empleado

    const onInputChange = (e) => {
        // Spread operator ... (expandir los atributos)
        setEmpleado({...empleado, [e.target.name]: e.target.value})

    }

    let navegacion = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/api/empleados"
        await axios.post(urlBase, empleado);
        //Redireccion a la pagina de inicio
        navegacion('/');
    }

    return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Agregar Empleado</h3>
      </div>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Nombre del empleado" required={true} 
             value={nombre} onChange={(e)=> onInputChange(e)}
          />
          <label htmlFor="nombre" className="form-label">Nombre</label>
        </div>

        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="departamento" name="departamento" placeholder="Departamento"
             value={departamento} onChange={(e)=> onInputChange(e)}
          />
          <label htmlFor="departamento" className="form-label">Departamento</label>
        </div>

        <div className="form-floating mb-3">
          <input type="number" step="any" className="form-control" id="sueldo" name="sueldo" placeholder="Sueldo"
             value={sueldo} onChange={(e)=> onInputChange(e)}
          />
          <label htmlFor="sueldo" className="form-label">Sueldo</label>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sm me-3">Agregar</button>
          <a href="/" className="btn btn-danger btn-sm">Regresar</a>
        </div>
       
      </form>
    </div>
  );
}
