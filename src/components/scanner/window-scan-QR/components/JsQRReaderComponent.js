import React from "react";
import styles from '../selectedforsp/ScannerComponent.module.scss';


const JsQRReaderComponent = (props) => {

    const handleScan = (result) => {
        props.handleData(result?.message);
    };


    return (
        <div className={styles.cameraWrapper}>

        </div>
    );

}

export default JsQRReaderComponent;