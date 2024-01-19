import React from "react";
import {QrReader} from "react-qr-reader";
import styles from "./ScannerComponent.module.scss";


const QRReaderComponent = (props) => {

    return (
        <div>
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        props.handleData(result?.text);
                    }
                    if (!!error) {
                        // console.info(error);
                    }
                }}

                className={styles.qrReaderCameraContainer}
            />
        </div>
    );

}

export default QRReaderComponent;