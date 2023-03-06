import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ADD_MASTER_USER } from '../../api';
import Input from '../../components/Input/Input'
import useForm from '../../hooks/useForm';
import UserService from '../../services/usuarios/UserService';

const AddUser = () => {
    const username = useForm();
    const email = useForm();
    const password = useForm();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        UserService.insert({username: username.value, email: email.value, password: password.value})
        .then((resp) => {
            if(resp.status === 200){
                alert("Adicionado com sucesso!");
                navigate(`${pathname.replace("/add", "")}`);
            }
        });
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <Input type="text" label="Username" id="username_add" name="username_add" {...username} />
                        <Input type="text" label="Email" id="email_add" name="usuario_add" {...email} />
                        <Input type="password" label="Senha" id="senha_add" name="senha_add" {...password} />
                        <button className="btn btn-primary">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser;