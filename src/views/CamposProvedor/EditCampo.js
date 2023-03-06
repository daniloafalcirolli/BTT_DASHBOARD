import React from 'react'
import { useParams } from 'react-router-dom';
import Input from '../../components/Input/Input';
import useForm from '../../hooks/useForm';
import CampoService from '../../services/provedores/CampoService';

const EditCampo = () => {
    const campo = useForm();
    const params = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        CampoService.edit({ id: params.id, campo: campo.value })
        .then((resp) => {
            if (resp.status === 200) {
                alert("Editado com sucesso!");
            }
        });
    }

    const getById = async () => {
        CampoService.getById(params.id)
        .then((resp) => {
            campo.setValue(resp.campo);
        })
    }

    React.useEffect(() => {
        getById();
    }, [params])

    return (
          <div className="row">
            <div className="col-12">
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <Input type="text" label="Campo" id="campo" name="campo" {...campo} />
                        <button className="btn btn-primary">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditCampo