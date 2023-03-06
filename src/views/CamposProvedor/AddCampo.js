import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import useForm from '../../hooks/useForm';
import CampoService from '../../services/provedores/CampoService';

const AddCampo = () => {
    const campo = useForm();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        CampoService.insert({campo: campo.value})
        .then((resp) => {
            if(resp.status === 201){
                navigate(`${pathname.replace("/add", "")}`);
            };
        });
    }

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

export default AddCampo