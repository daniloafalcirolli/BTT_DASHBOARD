import React from 'react'
import AbstractModal from '../AbstractModal';
import "./ModalCidade.css";

const ModalCidade = () => {
    const [modal, setModal] = React.useState(true);
    const toggleModal = () => setModal(!modal);

    return (
        <>
            <button className='btn btn-primary' onClick={toggleModal}>Selecione uma cidade</button>
            {
                modal &&
                <AbstractModal modalTitle="Selecione uma cidade" isOpen={modal} openModal={toggleModal}>
                    <table>
                        <tbody>
                            <tr>
                                <td>dsiajiidifas</td>
                                <td>doskadoksaok</td>
                            </tr>
                        </tbody>
                    </table>
                </AbstractModal>
            }

        </>
    )
}

export default ModalCidade