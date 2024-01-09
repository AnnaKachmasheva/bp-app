import React from "react";
import {QrReader} from "react-qr-reader";
import styles from './ScannerComponent.module.scss';


const QRReaderComponent = (props) => {

    return (
        <div className={styles.cameraWrapper}>
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        props.handleData(result?.text);
                    }
                    if (!!error) {
                        console.info(error);
                    }
                }}
                style={{width: '100%'}}
            />
        </div>
    );

}

export default QRReaderComponent;