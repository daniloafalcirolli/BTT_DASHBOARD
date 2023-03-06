import React from 'react'
import Input from '../../../components/Input/Input';
import AbstractModal from '../../../components/Modal/AbstractModal'
import useForm from '../../../hooks/useForm';
import { RESET_PASSWORD } from '../../../services/funcionario/FuncionarioService';

const ModalResetPassword = ({ funcionario }) => {
	const [modal, setModal] = React.useState(false);
	const [error, setError] = React.useState(null);
	const password = useForm();
	const confirmPassword = useForm();

	const toggleModal = () => setModal(!modal);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if(password.value === "" || confirmPassword.value === ""){
			setError("Preencha os campos!");
		} else if(password.value.length < 8 || confirmPassword.value.length < 8){
			setError("A senha deve possuir ao menos 8 caracteres!");
		} else if(password.value === confirmPassword.value){
			setError(null);
			const { url, options } = RESET_PASSWORD({ cpf: funcionario, password: password.value});
			const response = await fetch(url, options);
			if(response.status === 200){
				password.setValue("");
				confirmPassword.setValue("");

				alert("Senha alterada com sucesso!");
				toggleModal();
			} else {
				alert("Ocorreu um erro!");
			}
		} else {
			setError("As senhas devem ser iguais!")
		}
	}

  	return (
		<>
			<button className='btn btn-primary' onClick={toggleModal}>Resetar senha aplicativo</button>
			{
				<AbstractModal modalTitle="Recálculo do valor do combustível" isOpen={modal} openModal={toggleModal}>
					<>
						<div className="col-12">
							<form onSubmit={handleSubmit} className="row">
								<div className="col-12">
									<Input type="text" label="Senha" id="password" name="password"  {...password}/>
								</div>
								<div className="col-12">
									<Input type="text" label="Confirme a senha" id="confirmPassword" name="confirmPassword"  {...confirmPassword}/>
								</div>
								<div className="col-6">
								</div>
								{
									error !== null &&
									<p className="text-danger">
										{error}
									</p>
								}
								<div className="col-12 mt-4">
									<button className="btn btn-primary">Salvar</button>
								</div>
							</form>
						</div>
					</>
				</AbstractModal>
			}
		</>  
	)
}

export default ModalResetPassword