import React, {useEffect} from "react";
import {Html5QrcodeScanner} from "html5-qrcode";


const Html5QrReaderComponent = (props) => {

    // id of the HTML element
    const qrcodeRegionId = "html5qr-code-full-region";

    // configuration
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

    useEffect(() => {
        // extra configurations to tune the code scanner
        const config = createConfig(props);
        // if true, all logs would be printed to console
        const verbose = props.verbose === true;

        // success callback is required
        if (!(props.handleData)) {
            throw "qrCodeSuccessCallback is required callback.";
        }

        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(props.handleData, null);

        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);


    return (
        <div id={qrcodeRegionId}/>
    );
};


export default Html5QrReaderComponent;