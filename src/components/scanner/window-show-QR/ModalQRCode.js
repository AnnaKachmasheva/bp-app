import React from "react";
import styles from './ModalQRCode.module.scss';
import {AiOutlineClose} from "react-icons/ai";
import QRCode from "qrcode.react";


export const ModalQRCode = (props) => {
    if (!props.show)
        return null;

    let qrCodeSize =  230;

    return (
        <div className={'modal'}
             onClick={props.onClose}>

            <div className={styles.container.concat(" content")}
                 onClick={(e) => e.stopPropagation()}>

                <AiOutlineClose
                    className={styles.icon}
                    onClick={props.onClose}
                    size={40}
                />

                <QRCode value={props.data}
                        size={qrCodeSize}
                        className={styles.code}
                />

                <p>Data: <span>{props.data}</span></p>


                <button type={'submit'}
                        className={'btn btn-lg btn-success '.concat(styles.btnPrint)}
                        >
                    Show item
                </button>

            </div>
        </div>
    )
}
