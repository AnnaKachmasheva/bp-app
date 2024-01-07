import React, {useEffect} from "react";
import Quagga from "quagga";


//TODO
const ZxingComponent = (props) => {

    useEffect(() => {
        const videoElement = document.getElementById('video');
        const canvasElement = document.createElement('canvas');
        canvasElement.setAttribute('willReadFrequently', 'true')

        Quagga.init(
            {
                inputStream: {
                    name: 'Live',
                    type: 'LiveStream',
                    target: videoElement,
                },
                decoder: {
                    readers: ['code_128_reader', 'ean_reader', 'ean_8_reader'],
                },
            },
            function (err) {
                if (err) {
                    console.error('Quagga init error: ' + err);
                    return;
                }
                Quagga.start();
            }
        );

        Quagga.onDetected(function (result) {
            props.handleData(result.codeResult.code)
        });

        // Clean up the Quagga instance when the component unmounts
        return () => {
            Quagga.stop();
        };
    }, []);

    return (
        <div>
            <video id="video"
                   width="300"
                   height="200"></video>
        </div>
    );
}

export default ZxingComponent;