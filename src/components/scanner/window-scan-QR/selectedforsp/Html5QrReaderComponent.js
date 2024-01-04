import React, {useEffect, useRef, useState} from "react";
import {Html5Qrcode} from "html5-qrcode";


const Html5QrReaderComponent = (props) => {

    const videoRef = useRef(null);
    const html5QrCodeRef = useRef(null);
    const [scannedCode, setScannedCode] = useState(null);

    useEffect(() => {
        const startScanner = async () => {
            try {
                html5QrCodeRef.current = new Html5Qrcode('qr-code-scanner', {});
                await html5QrCodeRef.current.start();
                html5QrCodeRef.current.onScan((qrCode) => {
                    setScannedCode(qrCode);
                    props.handleData(qrCode);
                });
            } catch (error) {
                console.error('Error starting QR code scanner:', error);
            }
        };

        startScanner();

        return () => {
            if (html5QrCodeRef.current) {
                try {
                    html5QrCodeRef.current.stop();
                } catch (error) {
                    console.error('Error stopping QR code scanner:', error);
                }
            }
        };
    }, [props.handleData]);

    return (
        <div>
            <video ref={videoRef}
                   id="qr-code-scanner"
                   style={{width: '100%'}}/>
        </div>
    );
};


export default Html5QrReaderComponent;