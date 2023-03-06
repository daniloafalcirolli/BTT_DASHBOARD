import React from 'react'
import { useParams } from 'react-router-dom';
import { EDIT_MASTER_USER, GET_MASTER_USER } from '../../api';
import Input from '../../components/Input/Input';
import useForm from '../../hooks/useForm';
import UserService from '../../services/usuarios/UserService';

const EditUser = () => {
    const username = useForm();
    const email = useForm();
    const password = useForm();
    const params = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        UserService.edit({ id: params.id, username: username.value, email: email.value, password: password.value })
        .then((resp) => {
            if(resp.status === 200){
                alert("Editado com sucesso!");
            }
        });
    }
    
    const getById = async () => {
        UserService.getById(params.id)
        .then((resp) => {
            username.setValue(resp.username);
            email.setValue(resp.email);
            password.setValue(resp.password);
        });
    }

    React.useEffect(() => {
        getById();
    }, [params])

    return (
        <>
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
        </>
    )
}

export default EditUser