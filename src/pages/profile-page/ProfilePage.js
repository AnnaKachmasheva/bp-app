import React, {useState} from "react";
import styles from './ProfilePage.module.scss';
import {BsPencil, BsTrash} from "react-icons/bs";
import {MdPassword} from "react-icons/md";
import {ModalDeleteProfileConfirm} from "./modalWindowDeleteUser/ModalDeleteProfileConfirm";
import {ModalEditPassword} from "./modalWindowEditPassword/ModalEditPassword";
import {ModalEditProfile} from "./modalWindowEditUser/ModalEditProfile";
import Button, {ButtonSize, ButtonType} from "../../components/button/Button";

function ProfilePage() {

    const titles = ['First name', 'Last name', 'Email', 'Phone'];

    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);

    const user = {
        firstName: 'first',
        lastName: 'last',
        email: 'mail@gmail.com',
        phone: '123456789',
    }

    // useEffect(() => {
    //     handleGetCurrentUser()
    // }, [])

    // const handleGetCurrentUser = async () => {
    //     try {
    //         const response = await userApi.currentUser(userToken)
    //         setUserData(response.data)
    //     } catch (error) {
    //         console.log('error')
    //     }
    // }

    return (
        <div className={'content'}>
            <ModalDeleteProfileConfirm onClose={() => setShowConfirmDeleteModal(false)}
                                       show={showConfirmDeleteModal}/>

            <ModalEditPassword onClose={() => setShowChangePasswordModal(false)}
                               email={user.email}
                               show={showChangePasswordModal}/>

            <ModalEditProfile onClose={() => setShowUpdateUserModal(false)}
                              show={showUpdateUserModal}
                              firstName={user.firstName}
                              lastName={user.lastName}
                              email={user.email}
                              phone={user.phone}
            />

            <div className={styles.userProfile}>
                <div className={'card-title-container'}>

                    <p>Personal information</p>

                    <Button label={'Delete account'}
                            type={ButtonType[4].type}
                            size={ButtonSize[0].size}
                            onClick={() => setShowConfirmDeleteModal(true)}
                            icon={<BsTrash/>}/>

                </div>

                <div className={styles.userInfo}>
                    <div className={styles.infoColumn}>
                        <ul className={styles.labels}>
                            {titles.map((title, i) => {
                                return (<li className={'title'} key={i}>{title}</li>);
                            })}
                        </ul>

                        <ul>
                            <li>{user.firstName}</li>
                            <li>{user.lastName}</li>
                            <li>{user.email}</li>
                            <li>{user.phone}</li>
                        </ul>
                    </div>

                    <div className={styles.infoColumn}>
                        <ul className={styles.labels}>User role</ul>

                        <ul>USER</ul>
                    </div>

                    <div className={styles.buttonsContainer}>

                        <Button label={'Change password'}
                                type={ButtonType[3].type}
                                size={ButtonSize[1].size}
                                onClick={() => setShowChangePasswordModal(true)}
                                icon={<MdPassword/>}/>

                        <Button label={'Edit'}
                                type={ButtonType[2].type}
                                size={ButtonSize[1].size}
                                onClick={() => setShowUpdateUserModal(true)}
                                icon={<BsPencil/>}/>

                    </div>
                </div>
            </div>

        </div>
    )
}


export default ProfilePage