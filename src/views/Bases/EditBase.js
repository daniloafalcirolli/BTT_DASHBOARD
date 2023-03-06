import React from 'react'
import InputAddress from '../../components/Input/InputAddress';
import Input from '../../components/Input/Input';
import { useParams } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import BaseService from '../../services/provedores/BaseService';

const EditBase = () => {
    const params = useParams();
    const nome = useForm();
    const [latitude, setLatitude] = React.useState("");
    const [longitude, setLongitude] = React.useState("");
    const [address, setAddress] = React.useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        BaseService.edit({id: params.id, nome: nome.value, endereco: address, latitude: latitude, longitude: longitude})
        .then((resp) => {
            if(resp.status === 200){
                alert("Editado com sucesso!");
            }
        });
    }

    const getById = async () => {
        BaseService.getById(params.id)
        .then((resp) => {
            nome.setValue(resp.nome);
            setLatitude(resp.latitude);
            setLongitude(resp.longitude);
            setAddress(resp.endereco);
        });
    }

    React.useEffect(() => {
        getById();
    }, [])

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <Input type="text" label="Nome" id="nome" name="nome" {...nome}/>
                        {   
                            latitude && longitude &&
                            <InputAddress
                                hasInitialValues={true}
                                sendToChildLatitude={latitude}
                                sendToChildLongitude={longitude}
                                sendToChildAddress={address}
                                sendToParentLatitude={setLatitude}
                                sendToParentLongitude={setLongitude}
                                sendToParentAddress={setAddress}
                            />
                        }
                        <button className="btn btn-primary">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditBase