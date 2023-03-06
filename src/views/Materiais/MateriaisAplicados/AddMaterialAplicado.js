import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../../components/Input/Input';
import useForm from '../../../hooks/useForm';
import MaterialAplicadoService from '../../../services/materiais/MaterialAplicadoService';

const AddMaterialAplicado = () => {
  const material = useForm();
  const id_senior = useForm();
  const [serial, setSerial] = React.useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    MaterialAplicadoService.insert({material: material.value, id_senior: id_senior.value, has_serial: serial})
    .then((resp) => {
      if(resp.status == 201){
        navigate(`${pathname.replace("/add", "")}`);
      }
    });
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <Input type="text" label="Material" id="Material" name="Material" {...material} />
            <Input type="text" label="ID Senior" id="id_senior" name="id_senior" {...id_senior} />
            <div>
              <label>Possui serial?</label>
              <input type="checkbox" value={serial} onChange={() => {setSerial(!serial)}} checked={serial && "checked"}/>
            </div>

            <button className="btn btn-primary">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddMaterialAplicado;