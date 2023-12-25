import React from "react";
import ModalWindow from "../../../components/modal/ModalWindow";
import Button, {ButtonSize, ButtonType} from "../../../components/button/Button";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import styles from './ModalProduct.module.scss';


// create/update/clone product
export const ModalProduct = (props) => {

    if (!props.show)
        return null;

    const handleSaveButton = async () => {

        try {
            alert("Save product")
            props.onClose(true)
        } catch (error) {
            console.log('error - save product')
        }
    }

    function getForm(props) {

        const initialValues = {
            name: props.product == null ? '' : props.product.name,
            description: props.product == null ? '' : props.product.description,
        };

        const validationSchema = Yup.object().shape({
            email: Yup.string()
                .required('Email is required')
                .email('Invalid email')
        });

        function handleSaveProduct() {
            //todo
        }

        let numberVariants = 1

        function handleAddVariant() {
            numberVariants += 1
        }

        function handleAddAttribute() {

        }

        return (
            <div className={'modal-window-body'}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSaveProduct}>
                    {({
                          values,
                          errors,
                          touched,
                          isValid
                      }) => (
                        <Form className={'form'}>

                            {/* main info */}
                            <div className={'form-column'}>
                                <div className={'form-row'}>
                                    <div className={'form-input'}>
                                        <label>Category</label>
                                        <Field as="select"
                                               id="category"
                                               className={'form-control'}
                                               name="category">
                                            {props.categories.map(category =>
                                                <option value={category.name}>{category.name}</option>
                                            )}
                                        </Field>
                                    </div>

                                    <div className={'form-input'}>
                                        <label>Name</label>
                                        <Field type={'text'}
                                               className={'form-control '
                                                   + (values.name === '' && !touched.name ?
                                                       null :
                                                       (touched.name && errors.name ?
                                                           'is-invalid' :
                                                           'is-valid'))}
                                               placeholder={'Enter name'}
                                               name={'name'}
                                        />
                                    </div>
                                </div>

                                <div className={'form-row'}>
                                    <div className={'form-input'}>
                                        <label>Description</label>
                                        <Field className={'form-control'}
                                               as="textarea"
                                               id="description"
                                               name="description"
                                               rows="4"
                                               cols="50"
                                        />
                                    </div>
                                </div>

                                {/*variants*/}
                                <p className={'modal-subtitle '.concat('form-row')}>Variants</p>

                                // todo
                                {/*{Array.from({length: numberVariants}, (_, index) => index)*/}
                                {/*    .map((index) =>*/}

                                {/*        <div className={styles.formColumn.concat(' '.concat(styles.variant))}>*/}

                                {/*            <div className={styles.formRow}>*/}
                                {/*                <div className={'form-input'}>*/}
                                {/*                    <label>Quantity</label>*/}
                                {/*                    <Field*/}
                                {/*                        type={'number'}*/}
                                {/*                        step={1}*/}
                                {/*                        className={'form-control'}*/}
                                {/*                        placeholder={'Enter quantity'}*/}
                                {/*                        name={'quantity'}*/}
                                {/*                        required*/}
                                {/*                    />*/}
                                {/*                </div>*/}

                                {/*                <div className={'form-input'}>*/}
                                {/*                    <label>Min quantity</label>*/}
                                {/*                    <Field*/}
                                {/*                        type={'number'}*/}
                                {/*                        step={1}*/}
                                {/*                        className={'form-control'}*/}
                                {/*                        placeholder={'Enter min quantity'}*/}
                                {/*                        name={'minQuantity'}*/}
                                {/*                        required*/}
                                {/*                    />*/}
                                {/*                </div>*/}
                                {/*            </div>*/}

                                {/*            <div className={styles.formRow}>*/}
                                {/*                <div className={'form-input'}>*/}
                                {/*                    <label>Price</label>*/}
                                {/*                    <Field*/}
                                {/*                        type={'number'}*/}
                                {/*                        step={0.1}*/}
                                {/*                        className={'form-control'}*/}
                                {/*                        placeholder={'Enter price'}*/}
                                {/*                        name={'price'}*/}
                                {/*                        required*/}
                                {/*                    />*/}
                                {/*                </div>*/}
                                {/*                <div className={'form-input'}></div>*/}
                                {/*            </div>*/}

                                {/*        </div>*/}
                                {/*    )}*/}


                                <div className={'form-row'}>
                                    <Button type={ButtonType[3].type}
                                            onClick={() => handleAddAttribute()}
                                            size={ButtonSize[1].size}
                                            label={'Add attribute'}/>

                                    <Button type={ButtonType[3].type}
                                            onClick={() => handleAddVariant()}
                                            size={ButtonSize[1].size}
                                            label={'Add variant'}/>
                                </div>

                            </div>

                            <div className={'buttons'}>
                                <Button type={ButtonType[1].type}
                                        size={ButtonSize[1].size}
                                        onClick={props.onClose}
                                        label={'Cancel'}/>

                                <Button type={ButtonType[0].type}
                                        onClick={handleSaveButton}
                                        size={ButtonSize[1].size}
                                        label={'Save'}/>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }

    return (
        <ModalWindow show={props.show}
                     title={props.title}
                     content={getForm(props)}/>
    )
}
