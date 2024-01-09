import React from "react";
import {useLocation, useParams} from "react-router-dom";
import styles from './VariantPage.module.scss';
import QRCode from "qrcode.react";
import {formatNumberWithSpaces, toStringForQRCode} from "../../utils/Common";
import Button, {ButtonSize, ButtonType} from "../../components/button/Button";


function VariantPage() {

    const {idProduct} = useParams();
    const {idVariant} = useParams();
    const {state} = useLocation();

    let qrCodeSize = 230;
    const variant = state.variant;

    return (
        <div className={'content'}>
            <div className={styles.container}>
                <img src={variant.photo}
                     alt={variant.photo}/>

                <div className={styles.main}>

                    <div className={styles.mainInfo}>
                        <h3>Main information</h3>
                        <h4>Quantity: <span>{formatNumberWithSpaces(variant.quantity)}</span></h4>
                        <h4>Min quantity: <span>{formatNumberWithSpaces(variant.minQuantity)}</span></h4>
                        <h4>Price: <span>{formatNumberWithSpaces(variant.price)}</span></h4>
                        <h4>Value: <span>{formatNumberWithSpaces(variant.price * variant.quantity)}</span></h4>
                    </div>

                    <div className={styles.mainInfo}>
                        <h3>Optional information</h3>

                        {variant.options.map((option, index) => {
                            const key = Object.keys(option)[0];
                            const value = option[key];
                            const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize the first letter

                            return (
                                <h4 key={index}>
                                    {capitalizedKey} : <span>{value}</span>
                                </h4>
                            )
                        })
                        }
                    </div>
                </div>

                <div className={styles.columnInfo}>
                    <QRCode value={toStringForQRCode(state.variant)}
                            size={qrCodeSize}
                            className={'code'}
                    />

                    <Button type={ButtonType[2].type}
                            size={ButtonSize[1].size}
                            label={'Print code'}/>
                </div>
            </div>

            <div className={styles.buttonsContainer}>
                <Button type={ButtonType[2].type}
                        size={ButtonSize[1].size}
                        label={'Edit'}/>

                <Button type={ButtonType[0].type}
                        size={ButtonSize[1].size}
                        label={'Copy'}/>

                <Button type={ButtonType[4].type}
                        size={ButtonSize[1].size}
                        label={'Delete'}/>
            </div>
        </div>
    )
}

export default VariantPage;