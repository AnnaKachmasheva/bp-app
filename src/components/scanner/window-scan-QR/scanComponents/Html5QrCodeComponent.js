import React, {useEffect} from "react";
import {Html5QrcodeScanner} from "html5-qrcode";
import styles from "./ScannerComponent.module.scss";

const qrcodeRegionId = "html5qr-code-full-region";

const createConfig = (props) => {
    let config = {};
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    return config;
};

const Html5QrCodeComponent = (props) => {

    useEffect(() => {
        // when component mounts
        const config = createConfig(props);
        const verbose = props.verbose === true;
        // Suceess callback
        if (!(props.handleData)) {
            props.handleData("")
            // throw "qrCodeSuccessCallback is required callback.";
        }
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);

        const container = document.getElementById(qrcodeRegionId);
        if (html5QrcodeScanner && container?.innerHTML === "") {
            html5QrcodeScanner.render(props.handleData, null);
        }
        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch(error => {
                // console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);

    return (
        <div id={qrcodeRegionId}
             className={styles.cameraContainer}/>
    );
};


export default Html5QrCodeComponent;