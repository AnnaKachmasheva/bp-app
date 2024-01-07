import React from "react";
import styles from '../selectedforsp/ScannerComponent.module.scss';
import {QrScanner} from "@yudiel/react-qr-scanner";

const ReactQRReaderComponent = (props) => {

    const handleScan = (result, error) => {
        props.handleData(result?.message);
    };

    return (
        <div className={styles.cameraWrapper}>
            <QrScanner
                onDecode={(result) => handleScan(result)}
                onError={(error) => console.log(error?.message)}
            />

        </div>
    );

}

export default ReactQRReaderComponent;