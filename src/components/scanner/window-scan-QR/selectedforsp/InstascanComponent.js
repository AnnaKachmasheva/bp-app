import React, {useEffect, useRef} from "react";
import Instascan from 'instascan-umd';

const InstascanComponent = (props) => {

    const videoRef = useRef(null);
    let scanner;

    useEffect(() => {
        scanner = new Instascan.Scanner({ video: videoRef.current });
        scanner.addListener('scan', handleScan);

        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                scanner.start(cameras[0]);
            } else {
                console.error('No cameras found.');
            }
        }).catch(function (e) {
            console.error(e);
        });

        return () => {
            scanner.stop();
        };
    }, []);

    const handleScan = content => {
        props.handleData(content);
    };

    return (
        <div>
            <video ref={videoRef}/>
        </div>
    );
}

export default InstascanComponent;