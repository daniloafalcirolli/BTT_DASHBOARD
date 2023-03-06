import React from 'react'
import { useParams } from 'react-router-dom';
import { EDIT_FOTO, GET_FOTO } from '../../api';
import Input from '../../components/Input/Input';
import useForm from '../../hooks/useForm';
import FotoService from '../../services/provedores/FotoService';

const EditFoto = () => {
    const name = useForm();
    const descricao = useForm();
    const [status_servico, setStatusServico] = React.useState("");
    const params = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        FotoService.edit({ id: params.id, name: name.value, descricao: descricao.value, status_servico: status_servico })
        .then((resp) => {
            if(resp.status === 200){
                alert("Editado com sucesso!");
            }
        });

    }

    const getById = async () => {
        FotoService.getById(params.id)
        .then((resp) => {
            name.setValue(resp.name);
            descricao.setValue(resp.descricao);
            setStatusServico(resp.status_servico);
        });
    }

    React.useEffect(() => {
        getById();
    }, [params]);

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <Input type="text" label="Nome" id="name" name="name" {...name} />
                        <Input type="text" label="Descrição" id="descricao" name="descricao" {...descricao} />

                        <div>
                            <label>Status do serviço</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" onChange={() => { setStatusServico("quebra") }} checked={status_servico === "quebra"} />
                                <label className="form-check-label">
                                    Quebra
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" onChange={() => { setStatusServico("finalizado") }} checked={status_servico === "finalizado"} />
                                <label className="form-check-label">
                                    Finalizado
                                </label>
                            </div>
                        </div>
                        <button className="btn btn-primary mt-1">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditFoto