import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Checkbox from '../Checkbox/Checkbox';

const ObjectRow = ({ data, headerReference, redirect}) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleRedirect = () => {
        navigate(`${pathname}/${Object.values(data)[0]}`);
    }

    return (
        <div className={"table-row"} onDoubleClick={redirect ? handleRedirect : undefined}>
            {
                Object.values(data).map((x, index) => {
                    if(!headerReference[index].oculto){
                        if(headerReference[index].tipo != undefined){
                            switch(headerReference[index].tipo){
                                case "delete": {
                                    return (
                                        <div className="table-cell" key={index} onClick={headerReference[index].funcao} id={x}>
                                            <button className="btn btn-primary mr-4">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    );
                                }
                                case "checkbox": {
                                    return (
                                        <div className="table-cell" key={index}>
                                            <Checkbox value={x} click={headerReference[index].funcao} id={Object.values(data)[0]}/>
                                        </div>
                                    );
                                }
                            }
                        } else {
                            return (
                                <div className="table-cell" key={index}>
                                     <span>{x}</span>
                                 </div>
                            );
                        }
                    }
                })
            }
        </div>
    )
}

export default ObjectRow;