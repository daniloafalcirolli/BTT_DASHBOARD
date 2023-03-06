import React from 'react'
import "./style.css";

const AbstractModal = (props) => {
    return (
        <>
            {
                props.isOpen &&
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-title">
                            <h5>{props.modalTitle}</h5>
                            <div className="modal-close-btn">
                                <button onClick={props.openModal}>×</button>
                            </div>
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                        {
                            props.onSave != null &&
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={props.onSave}>Salvar</button>
                            </div>
                        }
                     
                    </div>
                </div>
            }
        </>
    )
}

export default AbstractModal