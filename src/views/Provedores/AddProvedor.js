import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import useForm from '../../hooks/useForm';
import { ADD_PROVEDOR } from '../../services/provedores/ProvedorService';

const AddProvedor = () => {
    const nome = useForm();
    const identificador = useForm();
    const idSenior = useForm();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        let { url, options } = ADD_PROVEDOR({name: nome.value, identificador: identificador.value, id_senior: idSenior.value}); 
        let response = await fetch(url, options);
        if(response.status === 201){
            navigate(`${pathname.replace("/add", "")}`);
        }
    }

    return (
        <div className="row">
        <div className="col-12">
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <Input type="text" label="Nome" id="nome" name="nome" {...nome} />
                    <Input type="text" label="Identificador" id="identificador" name="identificador" {...identificador} />
                    <Input type="text" label="Id Senior" id="idSenior" name="idSenior" {...idSenior}/>
                    <button className="btn btn-primary">Salvar</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default AddProvedor