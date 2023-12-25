import React from "react";
import ModalWindow from "../../../components/modal/ModalWindow";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import Button, {ButtonSize, ButtonType} from "../../../components/button/Button";


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

    const handleUpdateUser = async () => {
        try {
            alert("Update profile")
            props.onClose(true)
        } catch (error) {
            console.log('error - update user')
        }
    }

    function getContent() {
        return (
            <div className={'modal-window-body'}>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleUpdateUser}>
                    {({
                          values,
                          errors,
                          touched,
                          isValid
                      }) => (
                        <Form className={'form'}>
                            <div>
                                <div>
                                    <div className={'form-input'}>
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

                                    <div className={'form-input'}>
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
                                    <div className={'form-input'}>
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

                                    <div className={'form-input'}>
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
                            </div>

                            <div className={'buttons'}>
                                <Button type={ButtonType[3].type}
                                        size={ButtonSize[1].size}
                                        onClick={props.onClose}
                                        label={'Cancel'}/>

                                <Button type={ButtonType[0].type}
                                        size={ButtonSize[1].size}
                                        onClick={handleUpdateUser}
                                        isDisabled={!isValid}
                                        label={'Save changes'}/>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }

    return (
        <ModalWindow show={props.show}
                     title={"Edit profile"}
                     content={getContent()}/>
    )
}
