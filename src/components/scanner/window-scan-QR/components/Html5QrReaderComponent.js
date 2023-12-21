import React, {useEffect} from "react";
import styles from './ReactQRReaderComponent.module.scss';
import {Html5Qrcode} from "html5-qrcode";


const Html5QrReaderComponent = (props) => {
    let html5QrCode;
    const qrcodeId = 'reader';
    const handleScan = (result) => {
        props.handleData(result?.message);
    };

    useEffect(() => {
        // Anything in here is fired on component mount.
        if (!html5QrCode?.getState()) {
            html5QrCode = new Html5Qrcode(qrcodeId);

            const qrCodeSuccessCallback = (decodedText, decodedResult) => {
                props.handleData(decodedText);
                props.onClose();
            };

            const config = {
                fps: 10,
                qrbox: {
                    width: 400,
                    height: 400
                },
            };

            // prefer back camera
            html5QrCode.start(
                {facingMode: "environment"},
                config,
                qrCodeSuccessCallback
            )
        }

        return () => {
            // Anything in here is fired on component unmount.

        };
    }, []);
    return (
        <div className={styles.cameraWrapper}
             id={qrcodeId}/>
    );

}

export default Html5QrReaderComponent;