import React from 'react'
import { FaPlus } from 'react-icons/fa';
import Input from '../../components/Input/Input';
import { API_URL } from '../../config';
import useForm from '../../hooks/useForm';
import { ADD_STATUS } from '../../services/funcionario/FuncionarioService';

const AddStatus = () => {
	const search = useForm();
	const [data, setData] = React.useState([]);
	const cabecalho = ["Código", "Abreviatura", "Descrição", "Ações"];

	React.useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		let response = await fetch(API_URL + `/api/status/func/rubi`);
		let json = await response.json();

		setData(json);
	}

	const handleAdd = async (event) => {
		if (window.confirm("Tem certeza que deseja adicionar esse status como um status permitido?") === true) {
			const status = data.find((item) => item.codigo === Number(event.currentTarget.id));

			const { url, options } = ADD_STATUS(status);
			const response = await fetch(url, options);
			if (response.status === 200) {
				alert("Adicionado com sucesso!");
				fetchData();
			}
		}
	}

	const handleSearch = (event) => {
		event.preventDefault();

		if (search.value !== "") {
			setData(data.filter((item) => item.descricao.toUpperCase().includes(search.value.toUpperCase()) || String(item.codigo).includes(search.value) || item.abreviatura.toUpperCase().includes(search.value.toUpperCase())));
		} else {
			fetchData();
		}
	}

	return (
		<div className="row">
			<div className="col-12">
				<div className="table">
					<div className="table-controllers">
						<div className="w-100">
							<div className="row">
								<div className="col-sm-12 col-md-6 col-xl-4">
									<form onSubmit={handleSearch}>
										<Input type="text" label="Pesquisar" id="search" name="search" {...search} />
									</form>
								</div>
								<div className={`col-sm-12 col-md-4 col-xl-8 d-flex justify-content-end align-items-end mb-3`}>
									<span className="d-flex">
										<h5 className="text-danger">Atenção! </h5>
										<h5 className="text-white ml-1">Adicione apenas os status que permitem o login do funcionário!</h5>
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="table-head">
						<div className="table-head-row">
							{
								cabecalho &&
								cabecalho.map((item, index) => {
									return (
										<div className="table-cell" key={index}>
											<span>{item}</span>
										</div>
									);
								})
							}
						</div>
					</div>
					<div className="table-body">
						{
							data &&
							<>
								{
									data.map((item, index) => {
										return (
											<div className="table-row" key={index}>
												<div className="table-cell">
													<span>{item.codigo}</span>
												</div>
												<div className="table-cell">
													<span>{item.abreviatura.trim() !== "" ? item.abreviatura : "--"}</span>
												</div>
												<div className="table-cell">
													<span>{item.descricao}</span>
												</div>
												<div className="table-cell">
													<button className="btn btn-primary mr-4" id={item.codigo} onClick={handleAdd}>
														<FaPlus />
													</button>
												</div>
											</div>
										)
									})
								}
							</>

						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddStatus