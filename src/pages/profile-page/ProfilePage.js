import React, {useState} from "react";
import styles from './ProfilePage.module.scss';
import {BsPencil, BsTrash} from "react-icons/bs";
import {MdPassword} from "react-icons/md";
import {ModalDeleteProfileConfirm} from "./modalWindowDeleteUser/ModalDeleteProfileConfirm";
import {ModalEditPassword} from "./modalWindowEditPassword/ModalEditPassword";
import {ModalEditProfile} from "./modalWindowEditUser/ModalEditProfile";

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
        <div className={'content-container'}>
            <ModalDeleteProfileConfirm onClose={() => setShowConfirmDeleteModal(false)}
                                       show={showConfirmDeleteModal}/>

            <ModalEditPassword onClose={() => setShowChangePasswordModal(false)}
                               show={showChangePasswordModal}/>

            <ModalEditProfile onClose={() => setShowUpdateUserModal(false)}
                           show={showUpdateUserModal}
                           firstName={user.firstName}
                           lastName={user.lastName}
                           email={user.email}
                           phone={user.phone}
            />


            <div className="content">
                <div className={styles.userProfile}>
                    <div className={'card-title-container'}>

                        <p>Personal information</p>

                        <button type={'submit'}
                                className={'btn btn-danger'}
                                onClick={() => setShowConfirmDeleteModal(true)}>
                            <BsTrash className={'icon'}/>
                            <span>Delete account</span>
                        </button>
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
                            <button type={'submit'}
                                    className={'btn btn-outline-success edit-btn'}
                                    onClick={() => setShowChangePasswordModal(true)}>
                                <MdPassword className={'icon'}/>
                                Change password
                            </button>
                            <button type={'submit'}
                                    className={'btn btn-success edit-btn'}
                                    onClick={() => setShowUpdateUserModal(true)}>
                                <BsPencil className={'icon'}/>
                                Edit
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default ProfilePage