import React from 'react'
import { useParams } from 'react-router-dom';
import { EDIT_CIDADE, GET_CIDADE } from '../../api';
import Input from '../../components/Input/Input';
import useForm from '../../hooks/useForm';
import CidadesService from '../../services/cidades/CidadesService';
import ModalRecalculo from './components/ModalRecalculo';

const EditCidade = () => {
    const cidade = useForm();
    const preco_gasolina = useForm();
    const params = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        CidadesService.edit({ id: params.id, cidade: cidade.value, preco_gasolina: preco_gasolina.value })
        .then((resp) => {
            if (resp.status === 200) {
                alert("Editado com sucesso!");
            }
        })
    }

    const getById = async () => {
        CidadesService.getById(params.id)
        .then((resp) => {
            cidade.setValue(resp.cidade);
            preco_gasolina.setValue(resp.preco_gasolina);
        })
    }

    React.useEffect(() => {
        getById();
    }, [params])

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <form onSubmit={handleSubmit}>
                            <Input type="text" label="Cidade" id="cidade" name="cidade" {...cidade} />
                            <Input type="text" label="Preço da gasolina" id="gasolina" name="gasolina" {...preco_gasolina} />
                            <button className="btn btn-primary">Salvar</button>
                        </form>
                        <div className="col-12 mt-4">
                            <ModalRecalculo cidade={cidade}/>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default EditCidade