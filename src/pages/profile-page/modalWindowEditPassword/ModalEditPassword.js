import React from "react";
import HeaderModal from "../../../components/modal/ModalWindow";


export const ModalEditPassword = (props) => {
    if (!props.show)
        return null;

    const handleDeleteAccount = async (e) => {
        e.preventDefault();

        try {
            console.log('change password')
            //todo save changed password, show alert and reload page
        } catch (error) {
            console.log('error - change password')
        }
    }

    return (
        <div className={'modal'}
             onClick={props.onClose}>
            <div className={'content'}
                 onClick={(e) => e.stopPropagation()}>

                <HeaderModal title={'Change password'}/>

                <div className={'body'}>
                    //todo
                    //reused change password
                </div>

                <div className={'buttons'}>

                    <button type={'submit'}
                            className={'btn btn-outline-success edit-btn'}
                            onClick={props.onClose}>
                        Cancel
                    </button>

                    <button type={'submit'}
                            className={'btn btn-primary edit-btn'}
                            onClick={handleDeleteAccount}>
                        Save changes
                    </button>

                </div>
            </div>
        </div>
    )
}
