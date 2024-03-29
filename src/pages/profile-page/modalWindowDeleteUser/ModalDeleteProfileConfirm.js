import React from "react";
import ModalWindow from "../../../components/modal/ModalWindow";
import Button, {ButtonSize, ButtonType} from "../../../components/button/Button";


export const ModalDeleteProfileConfirm = (props) => {
    if (!props.show)
        return null;

    const handleDeleteAccount = async () => {

        try {
            alert("Delete profile")
            props.onClose(true)
        } catch (error) {
            console.log('error - delete profile')
        }
    }

    function getContent() {
        return (
            <div className={'modal-window-body'}>

                <p>Are you sure you want to delete your account?</p>

                <div className={'buttons'}>
                    <Button type={ButtonType[3].type}
                            size={ButtonSize[1].size}
                            onClick={props.onClose}
                            label={'Cancel'}/>

                    <Button type={ButtonType[0].type}
                            size={ButtonSize[1].size}
                            onClick={handleDeleteAccount}
                            label={'Delete account'}/>
                </div>
            </div>
        )
    }

    return (
        <ModalWindow show={props.show}
                     title={"Delete profile"}
                     content={getContent()}/>
    )
}
