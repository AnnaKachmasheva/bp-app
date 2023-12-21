import React from "react";
import HeaderModal from "../../../components/modal/HeaderModal";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import styles from './ModalEditProfile.module.scss';


export const ModalEditProfile = (props) => {

    if (!props.show)
        return null;

    const initialValues = {
        firstName: props.firstName,
        lastName: props.lastName,
        email: props.email,
        phone: props.phone
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email')
    });

    // const handleUpdateUser = async (e) => {
    //     e.preventDefault();
    //
    //     try {
    //         console.log('update user')
    //         //todo update user, show alert and reload page
    //     } catch (error) {
    //         console.log('error - update user')
    //     }
    // }

    return (
        <div className={'modal'}
             onClick={props.onClose}>
            <div className={'content'}
                 onClick={(e) => e.stopPropagation()}>

                <HeaderModal title={'Edit personal information'}/>

                <div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {({
                              values,
                              errors,
                              touched,
                          }) => (
                            <Form className={styles.form}>
                                <div>
                                    <div className={'form-group'}>
                                        <label>First name</label>
                                        <Field
                                            type={'text'}
                                            className={'form-control '
                                                + (values.firstName === '' && !touched.firstName ?
                                                    null :
                                                    (touched.firstName && errors.firstName ?
                                                        'is-invalid' :
                                                        'is-valid'))}
                                            placeholder={'Enter first name'}
                                            name={'firstName'}
                                        />
                                    </div>

                                    <div className={'form-group'}>
                                        <label>Last name</label>
                                        <Field
                                            type={'text'}
                                            className={'form-control '
                                                + (values.lastName === '' && !touched.lastName ?
                                                    null :
                                                    (touched.lastName && errors.lastName ?
                                                        'is-invalid' :
                                                        'is-valid'))}
                                            placeholder={'Enter last name'}
                                            name={'lastName'}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className={'form-group'}>
                                        <label>Phone</label>
                                        <Field
                                            type={'phone'}
                                            className={'form-control '
                                                + (values.phone === '' && !touched.phone ?
                                                    null :
                                                    (touched.phone && errors.phone ?
                                                        'is-invalid' :
                                                        'is-valid'))}
                                            placeholder={'Enter phone'}
                                            name={'phone'}
                                            required
                                        />
                                        <div className={'invalid-feedback'}>
                                        </div>
                                    </div>

                                    <div className={'form-group'}>
                                        <label>Email address*</label>
                                        <Field
                                            type={'email'}
                                            className={'form-control '
                                                + (values.email === '' && !touched.email ?
                                                    null :
                                                    (touched.email && errors.email ?
                                                        'is-invalid' :
                                                        'is-valid'))}
                                            placeholder={'Enter email'}
                                            name={'email'}
                                            required
                                        />
                                        <div className={'invalid-feedback'}>
                                            <ErrorMessage name="email"/>
                                        </div>
                                    </div>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </div>

                <div className={'buttons'}>

                    <button type={'submit'}
                            className={'btn btn-outline-success edit-btn'}
                            onClick={props.onClose}>
                        Cancel
                    </button>

                    <button
                    type={'submit'}
                    className={'btn btn-primary edit-btn'}
                    onSubmit={console.log('update')}>
                    Save changes
                </button>
                </div>
            </div>
        </div>
    )
}
