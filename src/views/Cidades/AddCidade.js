import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input'
import useForm from '../../hooks/useForm';
import CidadesService from '../../services/cidades/CidadesService';

const AddCidade = () => {
    const cidade = useForm();
    const preco_gasolina = useForm();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        CidadesService.insert({cidade: cidade.value, preco_gasolina: preco_gasolina.value})
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
                        <Input type="text" label="Cidade" id="cidade" name="cidade" {...cidade} />
                        <Input type="text" label="Preço da gasolina" id="gasolina" name="gasolina" {...preco_gasolina} />
                        <button className="btn btn-primary">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCidade;