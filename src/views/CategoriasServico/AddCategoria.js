import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import useForm from '../../hooks/useForm';
import CategoriaServicoService from '../../services/provedores/CategoriaServicoService';

const AddCategoria = () => {
	const categoria = useForm();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		CategoriaServicoService.insert({ categoria: categoria.value })
		.then((resp) => {
			if (resp.status === 201) {
				navigate(`${pathname.replace("/add", "")}`);
			}
		});
	}

	return (
		<div className="row">
			<div className="col-12">
				<div className="card">
					<form onSubmit={handleSubmit}>
						<Input type="text" label="Categoria" id="categoria" name="categoria" {...categoria} />
						<button className="btn btn-primary">Salvar</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AddCategoria;