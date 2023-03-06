import React from "react";

//componentes
import { ReactComponent as Item } from "./components/item.svg";
import Input from "../../components/Input/Input";
import useForm from '../../hooks/useForm';

//style
import "./components/login.css";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const email = useForm();
    const senha = useForm();
    const navigate = useNavigate();
    const [error, setError] = React.useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(verificaCampos()){
            doLogin(email.value, senha.value);
        }
    }

    const doLogin = async (emailF, senhaF) => {
        let config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: emailF, password: senhaF})            
        }
        const response = await fetch(API_URL + '/api/master/user/login', config);
        
        if(response.status == 404){
            setError("Usuário não encontrado")
        }else if(response.status == 400){
            setError("Ocorreu um erro ao realizar o login")
        } else if(response.status == 200){
            setError(null);
            window.localStorage.setItem('token', JSON.stringify(await response.json()));
            navigate('/');
        } else {
            setError("Ocorreu um erro ao realizar o login")
        }
    }

    React.useEffect(() => {
        let token = window.localStorage.getItem('token') 
        if(token != null && token != ""){
            let user = JSON.parse(window.localStorage.getItem('token'));
            doLogin(user.email, user.password);
        }
    }, []);
    
    const verificaCampos = () => {
        if(email.value != "" && senha.value != ""){
            return true;
        }
        return false;
    }

    return (
        <>
            <div className="row h-100 m-0">
                <div className="col-lg-8 d-flex justify-content-center align-items-center">
                    <div className="w-50">
                        <Item />
                    </div>
                </div>
                <div className="col-lg-4 d-flex justify-content-center align-items-center">
                    <div className="w-75">
                        <p className="fs-1">Bem vindo a BT&T 👋</p>
                        <p className="opacity-50 mb-4">Faça login para usar o que nossa empresa tem de melhor.</p>
                        <form onSubmit={handleSubmit}>
                            <Input type="text" label="Email" name="email" id="email" {...email}/>
                            <Input type="password" label="Senha" name="senha" id="senha" {...senha}/>
                            {
                                error &&
                                <p className="text-danger">{error}</p>
                            }
                            <div className="d-flex justify-content-center align-items-center">
                                <button className="btn btn-primary w-100 mt-4">Logar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
