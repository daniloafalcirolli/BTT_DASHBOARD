import React from 'react'
import { useParams } from 'react-router-dom';
import Input from '../../components/Input/Input';
import useForm from '../../hooks/useForm';
import { EDIT_AND_SAVE_FUNCIONARIO, GET_FUNCIONARIO_BY_CPF } from '../../services/funcionario/FuncionarioService';
import ModalRecalculo from './components/ModalRecalculo';
import ModalResetPassword from './components/ModalResetPassword';

const EditFuncionario = () => {
    const nome = useForm();
    const username = useForm();
    const cpf = useForm();
    const pis = useForm();
    const empresa = useForm();
    const placa = useForm();
    const consumo = useForm();
    const preco_gasolina = useForm();
    const endereco = useForm();
    const cod_status = useForm();
    const status = useForm();
    const params = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        let { url, options } = EDIT_AND_SAVE_FUNCIONARIO({ cpf: cpf.value, placa: placa.value, kilometragem_por_litro: consumo.value });
        let response = await fetch(url, options);
        if (response.status === 200) {
            alert("Editado com sucesso!");
        }
    }

    async function fetchData() {
        let { url } = GET_FUNCIONARIO_BY_CPF(params.id);
        let response = await fetch(url);
        let json = await response.json();
        nome.setValue(json.nome);
        username.setValue(json.username);
        cpf.setValue(json.cpf);
        pis.setValue(json.pis);
        empresa.setValue(json.empresa);
        placa.setValue(json.placa);
        consumo.setValue(json.consumo);
        preco_gasolina.setValue(json.preco_gasolina);
        endereco.setValue(json.endereco);
        cod_status.setValue(json.cod_status);
        status.setValue(json.status);
    }

    React.useEffect(() => {
        fetchData();
    }, [params]);

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <form onSubmit={handleSubmit} className="row">
                        <div className="col-6">
                            <Input type="text" label="Nome" id="nome" name="nome" disabled {...nome} />
                        </div>
                        <div className="col-6">
                            <Input type="text" label="Username" id="username" name="username" disabled {...username} />
                        </div>
                        <div className="col-6">
                            <Input type="text" label="CPF" id="cpf" name="cpf" disabled {...cpf} />
                        </div>
                        <div className="col-6">
                            <Input type="text" label="PIS" id="pis" name="pis" disabled {...pis} />
                        </div>
                        <div className="col-8">
                            <Input type="text" label="Endereço" id="endereco" name="endereco" disabled {...endereco} />
                        </div>
                        <div className="col-4">
                            <Input type="text" label="Empresa" id="empresa" name="empresa" disabled {...empresa} />
                        </div>
                        <div className="col-6">
                            <Input type="text" label="Status" id="cod_status" name="cod_status" disabled {...cod_status} />
                        </div>
                        <div className="col-6">
                            <Input type="text" label="Descrição do status" id="status" name="status" disabled {...status} />
                        </div>
                        <div className="col-6">
                            <Input type="text" label="Placa do veículo" id="placa" name="placa" {...placa} />
                        </div>
                        <div className="col-6">
                            <Input type="text" label="Consumo do veículo" id="consumo" name="consumo"  {...consumo} />
                        </div>

                        <div className="col-12">
                            <button className="btn btn-primary mt-1">Salvar</button>
                        </div>
                    </form>
                    <div className="col-12 mt-4">
                        <ModalResetPassword funcionario={cpf.value}/>
                    </div>
                    <div className="col-12 mt-4">
                        <ModalRecalculo funcionario={cpf.value}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditFuncionario