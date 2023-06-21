import React from 'react'
import {MAPS_KEY, API_URL} from "../../config";
import { useParams } from 'react-router-dom';
import { EDIT_FUNCIONARIO_SERVICO, GET_SERVICO } from '../../api';
import Geocode from "react-geocode";
import ModalFuncionario from './Modal/ModalFuncionario';
import InputAlterText from '../../components/InputAlterText/InputAlterText';

import {
	useJsApiLoader,
	GoogleMap,
	Autocomplete,
	Marker
  } from '@react-google-maps/api'

const ServicoDescricao = () => {
	const params = useParams();
	const [servico, setServico] = React.useState({});
	const [funcionario, setFuncionario] = React.useState({});

	React.useState(() => {
		async function getById() {
			let { url } = GET_SERVICO(params.id);
			let response = await fetch(url);
			let json = await response.json();
			setServico(json);
		}
		getById();
	}, [params]);

	const EditFuncionario = async function(){
		if(funcionario.cpf){
			let items = {
				cpf_funcionario:`${funcionario.cpf}`,
				servico_id:params.id
			}
			let {url, options} = EDIT_FUNCIONARIO_SERVICO(items);
			let f = await fetch(url, options);
			alert(f.status == 200 ? "Funcionario alterado com sucesso" : "Esse funcionario ou servico não existe");
			window.location.reload(false);
		}else{
			alert("Não é possivel trocar o funcionario sem ter selecionado um.")
		}
	}

	const [map, setMap] = React.useState(null);
	const [valorFinal, setValorFinal] = React.useState(null);
	const [localizacao, setLocalizacao] = React.useState({
		lat: 0,
		lng: 0
	})
	const originRef = React.useRef();
	
	Geocode.setApiKey(MAPS_KEY);
	Geocode.setLanguage("br");

	let libraries = ["places"];
	const {isLoaded} = useJsApiLoader({
		googleMapsApiKey: MAPS_KEY,
		libraries: libraries,
	})

	const salvarEndereco = async function(){
		if(
			valorFinal["estado"] == "" ||
			valorFinal["cidade"] == "" ||
			valorFinal["bairro"] == "" ||
			valorFinal["logradouro"] == "" ||
			valorFinal["endereco"] == "" ||
			valorFinal["numero"] == "" ||
			valorFinal["complemento"] == "" ||
			valorFinal["latitude"] == "" ||
			valorFinal["longitude"] == ""
		)
		return alert("Algum campo não esta preenchido");

		let temp = servico["cliente"];
		temp["estado"] = valorFinal["estado"];
		temp["cidade"] = valorFinal["cidade"];
		temp["bairro"] = valorFinal["bairro"];
		temp["logradouro"] = valorFinal["logradouro"];
		temp["endereco"] = valorFinal["endereco"];
		temp["numero"] = valorFinal["numero"];
		temp["complemento"] = valorFinal["complemento"];
		temp["latitude"] = valorFinal["latitude"]+"";
		temp["longitude"] = valorFinal["longitude"]+"";
		
		let settings = {
			"method": "PUT",
			"headers": {
				"Content-Type": "application/json"
			},
			"body": JSON.stringify(temp)
		}

		console.log(temp)

		let f = await fetch(`${API_URL}/api/cliente`, settings);
		if(f["status"] == 200){
			alert("Endereço alterado com sucesso");
		}else{
			alert("erro ao alterar endereço, tente novamente")
		}

	}

	async function calculateRoute() {
		if (originRef.current.value === '') {
		  return
		}

		setValorFinal(null);

		Geocode.fromAddress(originRef.current.value).then(
			response => {
				const { lat, lng } = response.results[0].geometry.location;
				setLocalizacao({
					lat: lat,
					lng: lng
				});
				Geocode.fromLatLng(lat+"", lng+"").then(
					response=>{
						let endereco = "";
						response.results[0].address_components[1].long_name.split(" ").forEach((e, index)=>{
							endereco += (index >= 1 ? `${e} ` : '')
						})
						setValorFinal({
							numero: response.results[0].address_components[0].long_name,
							endereco: endereco.substring(0, endereco.length-1),
							logradouro: response.results[0].address_components[1].long_name.split(" ")[0],
							cidade: response.results[0].address_components[3].long_name,
							estado: response.results[0].address_components[4].long_name,
							numero: response.results[0].address_components[0].long_name,
							bairro: response.results[0].address_components[2].long_name,
							complemento: "",
							latitude: lat,
							longitude: lng
						})
					}
				)
              map.setZoom(15);
			},
			error => {
			  alert("algum erro foi detectado tente novamente");
			}
		);


	}

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
										servico.status === "em andamento" ? <div className="d-flex flex-column">
											<div className="justify-content-around w-100 d-flex">
												<ModalFuncionario funcionario={setFuncionario} />
												<button onClick={EditFuncionario} className={`btn btn-primary w-25`}>Trocar Funcionario</button>
											</div>
											<div className="mt-4 justify-content-around w-100 d-flex align-items-center">
												<label className="fw-bold">Novo funcionario</label>
												<input className="w-75" value={funcionario.nome || "--"} readOnly />
											</div>
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
												<input value={servico.cliente.cpf || "--"} readOnly />
											</div> :
											<div className="col-4">
												<label>CNPJ</label>
												<input value={servico.cliente.cnpj || "--"} readOnly />
											</div>
									}
									<div className="col-4">
										<label>Contrato</label>
										<input value={servico.cliente.contrato || "--"} readOnly />
									</div>
									<div className="col-4">
										<label>Estado</label>
										<input value={servico.cliente.estado || "--"} readOnly />
									</div>
									<div className="col-4">
										<label>Cidade</label>
										<input value={servico.cliente.cidade || "--"} readOnly />
									</div>
									<div className="col-4">
										<label>Bairro</label>
										<input value={servico.cliente.bairro || "--"} readOnly />
									</div>
									<div className="col-4">
										<label>Logradouro</label>
										<input value={servico.cliente.logradouro || "--"} readOnly />
									</div>
									<div className="col-8">
										<label>Endereço</label>
										<input value={servico.cliente.endereco || "--"} readOnly />
									</div>
									<div className="col-6">
										<label>Numero</label>
										<input value={servico.cliente.numero || "--"} readOnly />
									</div>
									<div className="col-6">
										<label>Complemento</label>
										<input value={servico.cliente.complemento || "--"} readOnly />
									</div>
									<div className="col-6">
										<label>Telefone</label>
										<input value={servico.cliente.telefone || "--"} readOnly />
									</div>
									<div className="col-6">
										<label>Telefone secundario</label>
										<input value={servico.cliente.telefone2 || "--"} readOnly />
									</div>
								</>
							}
						</div>

						<h4>Novas informações do cliente</h4>
						<div className="col-12 mt-4 mb-4">
							{
								isLoaded && <div
									className="col-12"
								>
									<div
										className={"col-12 flex row mb-3"}
									>
										<Autocomplete
											className={`w-75`}
										>
											<input
												className={`mb-0`}
												type='text'
												placeholder='Destination'
												ref={originRef}
											/>
										</Autocomplete>
										<button
											className={`btn btn-primary w-25`}
											onClick={calculateRoute}
										>
											Preencher
										</button>
									</div>
									<GoogleMap
										mapContainerStyle={{
											width: "100%",
											height: "500px",
											borderRadius: "10px"
										}}
										zoom={15}
										center={localizacao}
										onLoad={map => setMap(map)}
									>
										<Marker position={localizacao} />
									</GoogleMap>
									{
										valorFinal && <>
											<div
												className={"row mt-3"}
											>
												<div className="col-4">
													<label>Estado</label>
													<InputAlterText
														OldValue={valorFinal}
														NewValue={setValorFinal}
														typeToChange={"estado"}
													/>
												</div>
												<div className="col-4">
													<label>Cidade</label>
													<InputAlterText
														OldValue={valorFinal}
														NewValue={setValorFinal}
														typeToChange={"cidade"}
													/>
												</div>
												<div className="col-4">
													<label>Bairro</label>
													<InputAlterText
														OldValue={valorFinal}
														NewValue={setValorFinal}
														typeToChange={"bairro"}
													/>
												</div>
												<div className="col-4">
													<label>Logradouro</label>
													<InputAlterText
														OldValue={valorFinal}
														NewValue={setValorFinal}
														typeToChange={"logradouro"}
													/>
												</div>
												<div className="col-8">
													<label>Endereço</label>
													<InputAlterText
														OldValue={valorFinal}
														NewValue={setValorFinal}
														typeToChange={"endereco"}
													/>
												</div>
												<div className="col-6">
													<label>Numero</label>
													<InputAlterText
														OldValue={valorFinal}
														NewValue={setValorFinal}
														typeToChange={"numero"}
													/>
												</div>
												<div className="col-6">
													<label>Complemento</label>
													<InputAlterText
														OldValue={valorFinal}
														NewValue={setValorFinal}
														typeToChange={"complemento"}
													/>
												</div>
											</div>
											<button
												onClick={salvarEndereco}
												className={"btn btn-primary w-100"}
											>
												Salvar novo endereço
											</button>
										</>
									}
								</div>
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