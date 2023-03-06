import React from 'react'
import AbstractModal from '../../../components/Modal/AbstractModal/index'
import { RECALCULO_CONSUMO } from '../../../services/funcionario/FuncionarioService';

const ModalRecalculo = ( props ) => {
	const [modal, setModal] = React.useState(false);
	const [dataInicio, setDataInicio] = React.useState("");
    const [dataFinal, setDataFinal] = React.useState("");
	const [error, setError] = React.useState(null);

	const toggleModal = () => setModal(!modal);

    const changeDataInicio = (event) => {
        setDataInicio(event.target.value);
    }

    const changeDataFinal = (event) => {
        setDataFinal(event.target.value);
    }

	const handleSubmit = async (event) => {
		event.preventDefault();
		if(dataInicio !== "" && dataFinal !== ""){
			if(new Date(dataInicio) <= new Date(dataFinal)){
				setError(null);
				if(window.confirm("Tem certeza que deseja alterar as rotas desse funcionário entre o dia " + dataInicio + " e o dia " + dataFinal + "?")){
					const { url, options } = RECALCULO_CONSUMO({ cpf_funcionario: props.funcionario, data_inicio: dataInicio, data_fim: dataFinal});
					const response = await fetch(url, options);
					if(response.status === 200){
						alert("Rotas alteradas com sucesso!");
						toggleModal();
					}else{
						alert("Ocorreu um erro!");
					}
				}
			} else{
				setError("Data final não pode ser menor que a data inicial");
			}
		}else{
			setError("Preencha os dois campos")
		}
	}

	return (
		<>
			<button className='btn btn-primary' onClick={toggleModal}>Recalcule o combustível das rotas</button>
			{
				<AbstractModal modalTitle="Recálculo do valor do combustível" isOpen={modal} openModal={toggleModal}>
					<>
						<div className="col-12">
							<form onSubmit={handleSubmit} className="row">
								<div className="col-6">
									<label>A partir do dia:</label>
									<input type="date" value={dataInicio} onChange={changeDataInicio}  />
								</div>
								<div className="col-6">
									<label>Até o dia:</label>
									<input type="date" value={dataFinal} onChange={changeDataFinal}/>
								</div>
								{
									error != null &&
									<p className="text-danger">
										{error}
									</p>
								}
								<div className="col-12">
									<p>Obs.: Salve o consumo do funcionário antes de alterar o consumo de suas rotas
									</p>
								</div>
								<div className="col-12 mt-4">
									<button className="btn btn-primary">Recalcular</button>
								</div>
							</form>
						</div>
					</>
				</AbstractModal>
			}
		</>
	)
}

export default ModalRecalculo