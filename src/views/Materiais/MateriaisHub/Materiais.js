import React from 'react'
import { Link } from 'react-router-dom';

const MateriaisHub = () => {
    return (
        <div className="row">
            <div className="col-sm-12 col-md-4 col-xl-5">
                <Link to="/materiais/aplicados">
                    <div className="card">
                        <div className="card-body">
                            Materiais Aplicados
                        </div>
                    </div>
                </Link>
            </div>
            <div className="col-sm-12 col-md-4 col-xl-5">
                <Link to="/materiais/retirados">
                    <div className="card">
                        <div className="card-body">
                            Materiais Retirados
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default MateriaisHub;