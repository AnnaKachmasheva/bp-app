import React from "react";
import ReactQRReaderComponent from "./components/ReactQRReaderComponent";
import styles from './ModalScanQRCode.module.scss';
import {AiOutlineClose} from "react-icons/ai";
import ReactZxingComponent from "./components/ReactZxingComponent";
import Html5QrReaderComponent from "./components/Html5QrReaderComponent";
import QuaggaComponent from "./components/QuaggaComponent";
import JsQRReaderComponent from "./components/JsQRReaderComponent";
import {QRScanLibraries} from "../../../utils/Constants";

export const ModalScanQRCode = (props) => {
    if (!props.show)
        return null;

    const handleData = data => {
        props.handleData(data);
    }


    const renderContent = () => {
        switch (props.scanMethod) {

            case QRScanLibraries[0].name.toLowerCase():
                return <Html5QrReaderComponent handleData={handleData} />


            // case 'react-qr-reader':
            //     return <ReactQRReaderComponent
            //         handleData={handleData}
            //     />;

            case 'react-zxing':
                return <ReactZxingComponent
                    handleData={handleData}
                />
            case 'react-qr-scanner':
                return <ReactQRReaderComponent
                    handleData={handleData}
                />
            case 'quagga':
                return <QuaggaComponent
                    handleData={handleData}
                />
            case 'jsqr':
                return <JsQRReaderComponent
                    handleData={handleData}
                />
            default:
                return null;

        }
    }

    return (
        <div className={'modal'}
             onClick={props.onClose}>

            <div className={styles.contentFullScreen}
                 onClick={(e) => e.stopPropagation()}>

                <AiOutlineClose
                    className={styles.icon}
                    onClick={props.onClose}
                    size={40}
                />

                <h2>Scan</h2>

                <div className={styles.scanContainer}>
                    <p>Selected library: <span>{props.scanMethod}</span></p>

                    {renderContent()}

                    {props.data == null ?
                        null :
                        <p>Data: <span>{props.data}</span></p>
                    }

                </div>

            </div>
        </div>
    )
}
