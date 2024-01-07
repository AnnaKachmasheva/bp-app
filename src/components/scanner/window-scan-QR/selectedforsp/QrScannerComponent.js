import React, {useEffect, useRef} from 'react';
import QrScanner from 'qr-scanner';

const QrScannerComponent = (props) => {

    const videoRef = useRef(null);
    const qrScannerRef = useRef(null);

    useEffect(() => {
        // initialize the QR scanner
        qrScannerRef.current = new QrScanner(
            videoRef.current,
            (result) => {
                // pass the result to a parent component
                props.handleData(result);
            },
            (error) => {
                console.log('QR scanner error:', error);
            }
        );

        // start the scanner
        qrScannerRef.current.start();

        // cleanup function
        return () => {
            qrScannerRef.current.stop();
            qrScannerRef.current.destroy();
        };
    }, []);

    return (
        <video ref={videoRef}
               style={{width: '100%'}}/>
    );
};

export default QrScannerComponent;