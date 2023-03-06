import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import useForm from '../../hooks/useForm';
import ParametrizacaoService from '../../services/parametrizacoes/ParametrizacaoService';

const AddParametro = () => {
	const meta_key = useForm();
	const meta_value = useForm();
	const description = useForm();

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        ParametrizacaoService.insert({metaKey: meta_key.value, metaValue: meta_value.value, description: description.value})
        .then((resp) => {
            if(resp.status === 201){
                navigate(`${pathname.replace("/add", "")}`);
            }
        });
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <Input type="text" label="Meta Key" id="meta_key" name="meta_key" {...meta_key} />
						<Input type="text" label="Meta Value" id="meta_value" name="meta_value" {...meta_value} />
                        <Input type="text" label="Descrição" id="description" name="description" {...description} />

                        <button className="btn btn-primary">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddParametro