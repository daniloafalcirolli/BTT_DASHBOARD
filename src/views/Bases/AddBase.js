import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import InputAddress from '../../components/Input/InputAddress';
import useForm from '../../hooks/useForm';
import BaseService from '../../services/provedores/BaseService';

const AddBase = () => {
  const nome = useForm();
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");
  const [address, setAddress] = React.useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    BaseService.insert({nome: nome.value, endereco: address, latitude: latitude, longitude: longitude})
    .then((resp) => {
      if(resp.status === 201){
        navigate(`${pathname.replace("/add", "")}`);
      }
    })
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <form onSubmit={handleSubmit}>
              <Input type="text" label="Nome" id="nome" name="nome" {...nome} />
              <InputAddress
                  hasInitialValues={false}
                  sendToParentLatitude={setLatitude}
                  sendToParentLongitude={setLongitude}
                  sendToParentAddress={setAddress}
              />
              <button className="btn btn-primary">Salvar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddBase;