import React, {useEffect, useRef, useState} from "react";
import jsQR from 'jsqr';

/**
 * Component for real-time barcode detection using the device's webcam.
 */
const BarcodeDetector = () => {

    // State to store detected barcode results
    const [barcodeResults, setBarcodeResults] = useState([]);

    // References to the video and canvas elements
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [isScanning, setIsScanning] = useState(true);


    // useEffect hook to start the webcam and initiate barcode scanning on component mount
    useEffect(() => {

        // Check if the browser supports accessing the user's webcam
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const startVideo = async () => {
                try {
                    const videoStream = await navigator.mediaDevices.getUserMedia({video: true});
                    videoRef.current.srcObject = videoStream;
                    videoRef.current.addEventListener('loadedmetadata', () => {
                        videoRef.current.play().then(() => {
                            if (isScanning) {
                                scanBarcode();
                            }
                        }).catch(e => console.error(e));
                    });
                } catch (error) {
                    console.error('Error accessing the webcam', error);
                }
            };

            // Call the function to start the video stream
            startVideo();
        }
    }, [isScanning]);

    // Function to scan for barcodes in the current video frame
    const scanBarcode = async () => {
        // Check if video and canvas references exist
        if (videoRef.current && canvasRef.current && isScanning) {
            // Get the 2D rendering context of the canvas
            const context = canvasRef.current.getContext('2d');
            // Draw the current video frame on the canvas
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

            try {
                // Check if BarcodeDetector API is supported by the browser
                if ('BarcodeDetector' in window) {
                    // Use BarcodeDetector API to detect barcodes
                    const barcodeDetector = new BarcodeDetector({formats: ['qr_code']});
                    const barcodes = await barcodeDetector.detect(canvasRef.current);
                    if (barcodes.length > 0) {
                        setBarcodeResults(barcodes.map(barcode => `${barcode.format}: ${barcode.rawValue}`));
                        setIsScanning(false); // Stop scanning after detection
                    }
                    // Handle detected barcodes (not implemented in this code snippet)
                } else {
                    // Fallback using jsQR or another library
                    const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
                    // Use jsQR to decode the image data and get the barcode information
                    const code = jsQR(imageData.data, imageData.width, imageData.height);
                    // If a barcode is detected, update the state with the result
                    if (code) {
                        setBarcodeResults([`QR Code: ${code.data}`]);
                        setIsScanning(false); // Stop scanning after detection
                    }
                }
            } catch (error) {
                console.error('Barcode detection failed:', error);
            }
        }
        if (isScanning) {
            // Schedule the next scan after 100 milliseconds
            setTimeout(scanBarcode, 100);
        }
    };

    // Render the video, canvas, and detected barcode results
    return (
        <div>
            <video ref={videoRef}
                   style={{display: 'none'}}/>

            <canvas ref={canvasRef}
                    width="640"
                    height="480"/>

            {/* Display the detected barcode results */}
            {barcodeResults.map((result, index) => (
                <div key={index}>
                    {result}
                </div>
            ))}
        </div>
    );
};

export default BarcodeDetector;
