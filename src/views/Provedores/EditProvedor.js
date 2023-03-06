import React from 'react'
import { useParams } from 'react-router-dom';
import Input from '../../components/Input/Input';
import useForm from '../../hooks/useForm';
import { EDIT_PROVEDOR, GET_PROVEDOR } from '../../services/provedores/ProvedorService';
import ModalCampos from './ComponentesProvedor/ModalCampos';
import ModalFotosAplicadas from './ComponentesProvedor/ModalFotosAplicadas';
import ModalMateriaisAplicados from './ComponentesProvedor/ModalMateriaisAplicados';
import ModalMateriaisRetirados from './ComponentesProvedor/ModalMateriaisRetirados';
import ModalServicosProvedor from './ComponentesProvedor/ModalServicosProvedor';

const EditProvedor = () => {
  const params = useParams();
  const campo = useForm();
  const identificador = useForm();
  const idSenior = useForm();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let { url, options } = EDIT_PROVEDOR({ id: params.id, name: campo.value, identificador: identificador.value, id_senior: idSenior.value });
    let response = await fetch(url, options);
    if (response.status === 200) {
      alert("Editado com sucesso!");
    }
  }

  React.useEffect(() => {
    (async function () {
      let { url } = GET_PROVEDOR(params.id);
      let response = await fetch(url);
      let json = await response.json();
      campo.setValue(json.name);
      identificador.setValue(json.identificador);
      idSenior.setValue(json.id_senior);
    })()
  }, [params]);

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="card">
            <div className="card-body">
              <ModalMateriaisAplicados idProvedor={params.id} />
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="card">
            <div className="card-body">
              <ModalMateriaisRetirados idProvedor={params.id} />
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="card">
            <div className="card-body">
              <ModalCampos idProvedor={params.id} />
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="card">
            <div className="card-body">
              <ModalServicosProvedor idProvedor={params.id} />
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="card">
            <div className="card-body">
              <ModalFotosAplicadas idProvedor={params.id} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <form onSubmit={handleSubmit}>
              <Input type="text" label="Campo" id="campo" name="campo" {...campo} />
              <Input type="text" label="Identificador" id="identificador" name="identificador" {...identificador} />
              <Input type="text" label="Id Senior" id="id_senior" name="id_senior" {...idSenior} />
              <button className="btn btn-primary">Salvar</button>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}

export default EditProvedor