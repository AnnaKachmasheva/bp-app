import React from "react";
import HeaderModal from "../../../components/modal/ModalWindow";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {UserRole} from "../../../utils/Constants";
import Button, {ButtonSize, ButtonType} from "../../../components/button/Button";


export const ModalAddUser = (props) => {
    if (!props.show)
        return null;

    const initialValues = {
        firstName: props.firstName,
        lastName: props.lastName,
        email: props.email,
        phone: props.phone,
        userRole: props.userRole

    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email')
    });


    return (

        <div className={'modal'}
             onClick={props.onClose}>

            <div className={'content'}
                 onClick={(e) => e.stopPropagation()}>

                <HeaderModal title={'New user'}/>

                <div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={console.log('new user')}>
                        {({
                              values,
                              errors,
                              touched,
                          }) => (
                            <Form className={'form'}>

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

                                    <div className={'form-group select'}>
                                        <label>User role</label>
                                        <select onChange={e => values.userRole = e.target.value}>
                                            <option value={UserRole.USER}>{UserRole.USER}</option>
                                            <option value={UserRole.ADMIN}>{UserRole.ADMIN}</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
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

                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                <div className={'buttons'}>
                    <Button type={ButtonType[3].type}
                            size={ButtonSize[1].size}
                            label={'Cancel'}/>

                    <Button type={ButtonType[0].type}
                            size={ButtonSize[1].size}
                            label={'Save'}/>
                </div>

            </div>
        </div>
    )
}
