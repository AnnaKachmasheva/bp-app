import React, {useEffect, useRef} from "react";
import jsQR from "jsqr";


const JsQRComponent = (props) => {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {

        // Request access to the webcam
        navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}})
            .then(stream => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch(err => {
                console.error("Error accessing the webcam", err);
            });

        // Set up a loop to continuously scan for QR codes
        const scanningLoop = setInterval(() => {
            if (videoRef.current && canvasRef.current) {
                const context = canvasRef.current.getContext('2d');
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);

                if (code) {
                    props.handleData(code.data);
                    clearInterval(scanningLoop);
                }
            }
        }, 100);

        return () => clearInterval(scanningLoop);
    }, []);


    return (
        <div>
            <video
                ref={videoRef}
                style={{width: '100%'}}
                autoPlay
                playsInline
            />
            <canvas ref={canvasRef}
                    style={{display: 'none'}}/>

        </div>
    );

}

export default JsQRComponent;