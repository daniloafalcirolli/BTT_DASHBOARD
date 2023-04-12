import React from 'react'
import { useParams } from 'react-router-dom';
import { GET_SERVICO } from '../../api';

const ServicoDescricao = () => {
	const params = useParams();
	const [servico, setServico] = React.useState({});

	React.useState(() => {
		async function getById() {
			let { url } = GET_SERVICO(params.id);
			let response = await fetch(url);
			let json = await response.json();
			console.log(json)
			setServico(json);
		}
		getById();
	}, [params]);

	return (
		<div className="card">
			{
				servico &&
				<>
					<h2 className="col-12">Resumo do serviço</h2>
					<div className="col-12 mt-4">
						<h4>Funcionário responsável</h4>
						<div className=" mt-4 mb-4 row">
							{
								servico.funcionario &&
								<>
									<div className="col-4">
										<label>Nome</label>
										<input value={servico.funcionario.nome} readOnly />
									</div>
									<div className="col-4">
										<label>RG</label>
										<input value={servico.funcionario.rg} readOnly />
									</div>
									<div className="col-4">
										<label>CPF</label>
										<input value={servico.funcionario.cpf} readOnly />
									</div>
									<div className="col-4">
										<label>Telefone</label>
										<input value={servico.funcionario.telefone} readOnly />
									</div>
									<div className="col-8">
										<label>Endereço</label>
										<input value={servico.funcionario.endereco} readOnly />
									</div>
									<div className="col-4">
										<label>Placa do veículo</label>
										<input value={servico.funcionario.placa ? servico.funcionario.placa : "--"} readOnly />
									</div>
									<div className="col-4">
										<label>Consumo do veículo</label>
										<input value={servico.funcionario.consumo ? `${servico.funcionario.consumo} km/l` : "--"} readOnly />
									</div>
									<div className="col-4">
										<label>Empresa</label>
										<input value={servico.funcionario.empresa} readOnly />
									</div>
									{
										servico.status === "em andamento" ? <div className="w-100 row d-flex justify-content-center">
											<button className="btn btn-primary w-75 align-self-center">
												Mudar Funcionario
											</button>
										</div> : null
									}
								</>
							}
						</div>

						<h4>Cliente atendido</h4>
						<div className="col-12 mt-4 mb-4 row">
							{
								servico.cliente &&
								<>
									<div className="col-4">
										<label>Nome</label>
										<input value={servico.cliente.nome} readOnly />
									</div>
									{
										servico.cliente.cpf != null ?
											<div className="col-4">
												<label>CPF</label>
												<input value={servico.cliente.cpf} readOnly />
											</div> :
											<div className="col-4">
												<label>CNPJ</label>
												<input value={servico.cliente.cnpj} readOnly />
											</div>
									}
									<div className="col-4">
										<label>Contrato</label>
										<input value={servico.cliente.contrato} readOnly />
									</div>
									<div className="col-12">
										<label>Endereço</label>
										<input value={servico.cliente.endereco} readOnly />
									</div>
								</>
							}
						</div>

						<h4>Informações do serviço</h4>
						<div className="col-12 mt-4 mb-4 row">
							{
								servico.provedor &&
								<>
									<div className="col-4">
										<label>Provedor</label>
										<input value={servico.provedor.name} readOnly />
									</div>

									<div className="col-4">
										<label>Serviço executado</label>
										<input value={servico.servicoProvedor.servico} readOnly />
									</div>
									<div className="col-4">
										<label>Protocolo</label>
										<input value={servico.protocolo} readOnly />
									</div>
									<div className="col-4">
										<label>Data de criação</label>
										<input value={`${servico.data.split('-')[2]}/${servico.data.split('-')[1]}/${servico.data.split('-')[0]} às ${servico.hora}`} readOnly />
									</div>
									<div className="col-4">
										<label>Data de finalização</label>
										<input value={servico.data_finalizacao != null ? `${servico.data_finalizacao.split('-')[2]}/${servico.data_finalizacao.split('-')[1]}/${servico.data_finalizacao.split('-')[0]} às ${servico.hora_finalizacao}` : "--"} readOnly />
									</div>
									<div className="col-4">
										<label>Status</label>
										<input value={servico.status} readOnly />
									</div>
									{
										(servico.status === "quebra" || servico.status === "quebra sem ir ao local") &&
										<>
											<div className="col-4">
												<label>Código de quebra</label>
												<input value={servico.cod_quebra ? servico.cod_quebra : "--"} readOnly />
											</div>
											<div className="col-4">
												<label>Observações</label>
												<input value={servico.observacoes ? servico.observacoes : "--"} readOnly />
											</div>
										</>
									}
								</>
							}
						</div>

						<h4>Materiais aplicados</h4>
						<div className="col-12 mt-4 mb-4 row">
							{
								servico.materiais_aplicados &&
								<>
									{
										servico.materiais_aplicados.map((item, index) => {
											return (
												<div className="col-4" key={index}>
													<label>{item.material_aplicado.material}</label>
													<input value={item.value} readOnly />
												</div>
											);
										})
									}
								</>
							}
						</div>

						<h4>Materiais retirados</h4>
						<div className="col-12 mt-4 mb-4 row">
							{
								servico.materiais_retirados &&
								<>
									{
										servico.materiais_retirados.map((item, index) => {
											return (
												<div className="col-4" key={index}>
													<label>{item.material_retirado.material}</label>
													<input value={item.value} readOnly />
												</div>
											);
										})
									}
								</>
							}
						</div>

						<h4>Campos</h4>
						<div className="col-12 mt-4 mb-4 row">
							{
								servico.campos_aplicados &&
								<>
									{
										servico.campos_aplicados.map((item, index) => {
											return (
												<div className="col-4" key={index}>
													<label>{item.campo_provedor.campo}</label>
													<input value={item.value} readOnly />
												</div>
											);
										})
									}
								</>
							}
						</div>

						<h4>Imagens retiradas</h4>
						<div className="col-12 mt-4 mb-4 row">
							{
								servico.imagens &&
								<>
									{
										servico.imagens.map((item, index) => {
											return (
												<div className="col-4 mt-4 row" key={index}>
													<h5 className="mb-4">{item.imagem_provedor.name}</h5>
													<img src={`data:image/${item.fileType};base64,${item.content}`} alt={item.imagem_provedor.name}/>
												</div>
											);
										})
									}
								</>
							}
						</div>
					</div>
				</>
			}
		</div>
	)
}

export default ServicoDescricao;