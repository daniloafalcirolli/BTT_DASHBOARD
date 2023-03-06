import React from 'react'
import { useParams } from 'react-router-dom';
import Input from '../../../components/Input/Input';
import useForm from '../../../hooks/useForm';
import MaterialRetiradoService from '../../../services/materiais/MaterialRetiradoService';

const EditMaterialRetirado = () => {
  const material = useForm();
  const id_senior = useForm();
  const [serial, setSerial] = React.useState("");
  const params = useParams();


  const handleSubmit = async (event) => {
    event.preventDefault();
    MaterialRetiradoService.edit({ id: params.id, material: material.value, id_senior: id_senior.value, has_serial: serial })
    .then((resp) => {
      if (resp.status === 200) {
        alert("Editado com sucesso!");
      }
    });
  }

  const getById = async () => {
    MaterialRetiradoService.getById(params.id)
    .then((resp) => {
      material.setValue(resp.material);
      id_senior.setValue(resp.id_senior);
      setSerial(resp.has_serial);
    });
  }

  React.useEffect(() => {
    getById();
  }, [params])

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <Input type="text" label="Material" id="Material" name="Material" {...material} />
            <Input type="text" label="ID Senior" id="id_senior" name="id_senior" {...id_senior} />
            <div>
              <label>Possui serial?</label>
              <input type="checkbox" value={serial} onChange={() => { setSerial(!serial) }} checked={serial && "checked"} />
            </div>

            <button className="btn btn-primary">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditMaterialRetirado;