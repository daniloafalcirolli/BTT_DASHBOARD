import React from 'react'
import AbstractModal from '../../../components/Modal/AbstractModal';
import styles from  '../Styles/ModalFuncionario.module.css';
import modalStyles from '../Styles/Modal.module.css'
import { API_URL } from '../../../config';
import useForm from '../../../hooks/useForm';
import Input from '../../../components/Input/Input';

const ModalFuncionario = (props) => {
	const search  = useForm();
	const [modal, setModal] = React.useState(false);
	const [data, setData] = React.useState([]);

	const toggleModal = () => setModal(!modal);

	const selectFuncionario = (event) => {
		props.funcionario({ cpf: event.currentTarget.id, nome: data.find((item) => item.cpf === event.currentTarget.id).nome});
		toggleModal();
	}

	const getFuncionarios = async () => {
		let url = API_URL + `/api/funcionario?value=${search.value}`;
		let response = await fetch(url);
		let json = await response.json();
		setData(json);
	}

	const handleSearch = async (event) => {
		event.preventDefault();
		getFuncionarios();
	}

	React.useEffect(() => {
		getFuncionarios();
	}, [])

	return (
		<>
			<button className={`${modalStyles.button_height} btn btn-primary w-25`} onClick={toggleModal}>Selecione o funcionário</button>
			{
				<AbstractModal modalTitle="Relacione os campos ao provedor" isOpen={modal} openModal={toggleModal}>
					{
						data && <>
							<div className='table'>
								<div className="table-controllers">
									<form onSubmit={handleSearch}>
										<Input type="text" label="Pesquisar" id="search" name="search" {...search}/>
									</form>
								</div>
								<div className='table-head'>
									<div className='table-head-row head-func'>
										<div className={`table-cell ${styles.row_func}`}>
											<span>Nome</span>
										</div>
										<div className={`table-cell ${styles.row_func}`}>
											<span>Cpf</span>
										</div>
										<div className={`table-cell ${styles.row_func}`}>
											<span>Rg</span>
										</div>
									</div>
								</div>
								<div className={`table-body ${styles.body_func}`}>
									{
										data.map((item, index) => {
											return (
												<div className={`table-row ${styles.clickable}`} key={index} onClick={selectFuncionario} id={item.cpf}>
													<div className={`table-cell ${styles.row_func}`}>
														<span>{item.nome}</span>
													</div>
													<div className={`table-cell ${styles.row_func}`}>
														<span>{item.cpf}</span>
													</div>
													<div className={`table-cell ${styles.row_func}`}>
														<span>{item.rg}</span>
													</div>
												</div>
											)
										})
									}
								</div>
							</div>
						</>
					}
				</AbstractModal>
			}
		</>
	)
}

export default ModalFuncionario