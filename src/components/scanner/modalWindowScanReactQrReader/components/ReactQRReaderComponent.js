import React from "react";
import {QrReader} from "react-qr-reader";
import styles from './ReactQRReaderComponent.module.scss';


const ReactQRReaderComponent = (props) => {

    const handleScan = (result, error) => {
        if (!!result) {
            props.handleData(result?.text);
        }

        if (!!error) {
            console.info(error);
        }

    };

    // const qrStyle = {
    //     width: "400px",
    //     height: "100%",
    //     top: "0",
    //     left: "0",
    //     overflowY: "hidden",
    //     overflowX: "hidden",
    //     objectFit: "cover"
    // }

    return (
        <div className={styles.cameraWrapper}>
            <QrReader
                onResult={(result, error) => handleScan(result, error)
                }
                className={styles.cameraContainer}
                // videoContainerStyle={qrStyle}
            />
        </div>
    );

}

export default ReactQRReaderComponent;