import React from "react";
import HeaderModal from "../../../components/modal/HeaderModal";


export const ModalDeleteProfileConfirm = (props) => {
    if (!props.show)
        return null;

    const handleDeleteAccount = async (e) => {
        e.preventDefault();

        try {
            console.log('delete user profile')
            //todo delete, show alert and navigate
        } catch (error) {
            console.log('error - delete user account')
        }
    }

    return (
        <div className={'modal'}
             onClick={props.onClose}>
            <div className={'content'}
                 onClick={(e) => e.stopPropagation()}>

                <HeaderModal title={'Delete account'}/>

                <div className={'body'}>
                    <p>Are you sure you want to delete your account?</p>
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
                        Delete account
                    </button>

                </div>
            </div>
        </div>
    )
}
