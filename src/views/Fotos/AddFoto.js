import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import useForm from '../../hooks/useForm';
import FotoService from '../../services/provedores/FotoService';

const AddFoto = () => {
	const name = useForm();
	const descricao = useForm();
	const [status_servico, setStatusServico] = React.useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		FotoService.insert({name: name.value, descricao: descricao.value, status_servico: status_servico})
		.then((resp) => {
			if(resp.status === 201){
				navigate(`${pathname.replace("/add", "")}`);
			}
		})
	}

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
								<input className="form-check-input" type="radio" onChange={() => { setStatusServico("quebra")}} checked={status_servico === "quebra"} />
								<label className="form-check-label">
									Quebra
								</label>
							</div>
							<div className="form-check">
								<input className="form-check-input" type="radio" onChange={() => { setStatusServico("finalizado")}} checked={status_servico === "finalizado"} />
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

export default AddFoto