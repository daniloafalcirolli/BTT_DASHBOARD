import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Input from "../Input/Input";

const ObjectControllers = ({ searchEnabled, addNewEnabled, objectSearch }) => {
    const search = useForm();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleSearch = (event) => {
        event.preventDefault();
        objectSearch.setSearch(search.value);
    }

    const handleAddNew = () => {
        navigate(`${pathname}/add`);
    }

    return (
        <div className="table-controllers">
            <div className="w-100">
                <div className="row d-flex justify-content-between align-items-end">
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        {
                            searchEnabled && 
                            <form onSubmit={handleSearch}>
								<Input type="text" label="Pesquisar" id="search" name="search" {...search} />
                            </form>
                        }
                    </div>
                    <div className="col-sm-12 col-md-6 col-xl-4 d-flex justify-content-end mb-3">
                        {
                            addNewEnabled &&
                            <button className="btn btn-primary" onClick={handleAddNew}>Adicionar novo</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ObjectControllers;
