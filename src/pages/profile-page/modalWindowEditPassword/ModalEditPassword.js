import React from "react";
import ModalWindow from "../../../components/modal/ModalWindow";
import {Field, Form, Formik} from "formik";
import Button, {ButtonSize, ButtonType} from "../../../components/button/Button";
import * as Yup from "yup";


export const ModalEditPassword = (props) => {
    if (!props.show)
        return null;

    const initialValues = {
        password: '',
        confirmPassword: '',
        email: props.email
    };

    // todo
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .email('Password email'),
        confirmPassword: Yup.string()
            .required('Confirm password is required')
            .email('Confirm password email')
    });
    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        try {
            console.log('change password')
            //todo save changed password, show alert and reload page
        } catch (error) {
            console.log('error - change password')
        }
    }

    function getContent() {
        return (
            <div className={'modal-window-body'}>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleUpdatePassword}>
                    {({
                          values,
                          errors,
                          touched,
                          isValid
                      }) => (
                        <Form className={'form'}>
                            <div className={'form-column'}>
                                <div className={'form-row'}>
                                    <div className={'form-input'}>
                                        <label>New password</label>
                                        <Field
                                            type={'text'}
                                            className={'form-control '
                                                + (values.password === '' && !touched.password ?
                                                    null :
                                                    (touched.password && errors.password ?
                                                        'is-invalid' :
                                                        'is-valid'))}
                                            placeholder={'******'}
                                            name={'password'}
                                        />
                                        <div className={'invalid-feedback'}>
                                            {errors.password}
                                        </div>
                                    </div>

                                    <div className={'form-input'}>
                                        <label>Confirm password</label>
                                        <Field
                                            type={'text'}
                                            className={'form-control '
                                                + (values.confirmPassword === '' && !touched.confirmPassword ?
                                                    null :
                                                    (touched.confirmPassword && errors.confirmPassword ?
                                                        'is-invalid' :
                                                        'is-valid'))}
                                            placeholder={'******'}
                                            name={'confirmPassword'}
                                        />
                                        <div className={'invalid-feedback'}>
                                            {errors.confirmPassword}
                                        </div>
                                    </div>
                                </div>
                                <div className={'form-column'}>
                                    <div className={'form-input'}>
                                        <label>Email</label>
                                        <Field
                                            type={'email'}
                                            className={'form-control '
                                                + (values.email === '' && !touched.email ?
                                                    null :
                                                    (touched.email && errors.email ?
                                                        'is-invalid' :
                                                        'is-valid'))}
                                            placeholder={'mail@gmail.com'}
                                            name={'email'}
                                        />
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
                                        onClick={handleUpdatePassword}
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
