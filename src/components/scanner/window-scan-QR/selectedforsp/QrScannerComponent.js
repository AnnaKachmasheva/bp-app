import React, {useEffect, useRef, useState} from 'react';
import QrScanner from 'qr-scanner';

const QrScannerComponent = (props) => {

    const videoRef = useRef(null);
    const qrScannerRef = useRef(null);

    useEffect(() => {
        // Initialize the QR scanner
        qrScannerRef.current = new QrScanner(
            videoRef.current,
            (result) => {
                console.log('decoded qr code:', result);
                // You can also pass the result to a parent component or handle it here
                props.handleData(result);
            },
            (error) => {
                console.log('QR scanner error:', error);
            }
        );

        // Start the scanner
        qrScannerRef.current.start();

        // Cleanup function
        return () => {
            qrScannerRef.current.stop();
            qrScannerRef.current.destroy();
        };
    }, []);

    return (
        <div>
            <video ref={videoRef}
                   style={{ width: '100%' }} />
        </div>
    );
};

export default QrScannerComponent;