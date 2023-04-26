import React from 'react'
import { FaRegListAlt, FaOilCan, FaMapSigns, FaUserNinja } from 'react-icons/fa';
import styles from './Styles/style.module.css'
const RelatorioHub = (props) => {
    return (
        <div className='row'>
            <div className="col-sm-12 col-md-6 col-xl-3">
                <div className={`card ${styles.card_relatorio}`} onClick={() => { props.page(1) }}>
                    <div className="card-body">
                        <FaRegListAlt />
                        <button className='btn btn-primary'>Relatório de serviços</button>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-6 col-xl-3">
                <div className={`card ${styles.card_relatorio}`} onClick={() => {props.page(2)}}>
                    <div className="card-body">
                        <FaOilCan />
                        <button className='btn btn-primary'>Relatório de combustível</button>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-6 col-xl-3">
                <div className={`card ${styles.card_relatorio}`} onClick={() => {props.page(3)}}>
                    <div className="card-body">
                        <FaMapSigns />
                        <button className='btn btn-primary'>Relatório de rota individual</button>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-6 col-xl-3">
                <div className={`card ${styles.card_relatorio}`} onClick={() => {props.page(4)}}>
                    <div className="card-body">
                        <FaUserNinja />
                        <button className='btn btn-primary'>Relatório Unifique</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RelatorioHub