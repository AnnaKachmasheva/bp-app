import React from "react";
import ModalWindow from "../../../components/modal/ModalWindow";
import Button, {ButtonSize, ButtonType} from "../../../components/button/Button";


export const ModalTransaction = (props) => {
    if (!props.show)
        return null;

    const handleTransaction = async () => {

        try {
            alert("Transaction ")
            props.onClose(true)
        } catch (error) {
            console.log('error - transaction product')
        }
    }

    function getContent() {
        return (
            <div className={'modal-window-body'}>

                <p></p>

                <div className={'buttons'}>
                    <Button type={ButtonType[3].type}
                            size={ButtonSize[1].size}
                            onClick={props.onClose}
                            label={'Cancel'}/>

                    <Button type={ButtonType[0].type}
                            size={ButtonSize[1].size}
                            onClick={handleTransaction}
                            label={'Transaction'}/>
                </div>
            </div>
        )
    }

    return (
        <ModalWindow show={props.show}
                     title={"New transaction"}
                     content={getContent()}/>
    )
}
