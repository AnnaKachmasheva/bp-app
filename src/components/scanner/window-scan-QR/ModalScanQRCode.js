import React from "react";
import ReactQRReaderComponent from "./components/ReactQRReaderComponent";
import styles from './ModalScanQRCode.module.scss';
import {AiOutlineClose} from "react-icons/ai";
import ReactZxingComponent from "./components/ReactZxingComponent";
import Html5QrReaderComponent from "./selectedforsp/Html5QrReaderComponent";
import QuaggaComponent from "./components/QuaggaComponent";
import JsQRReaderComponent from "./components/JsQRReaderComponent";
import {QRScanLibraries} from "../../../utils/Constants";
import QrScannerComponent from "./selectedforsp/QrScannerComponent";

export const ModalScanQRCode = (props) => {
    if (!props.show)
        return null;

    const handleData = data => {
        props.handleData(data);
    }


    const renderContent = () => {
        switch (props.scanMethod.name) {

            case QRScanLibraries[0].name:
                return <Html5QrReaderComponent handleData={handleData} />


            case QRScanLibraries[1].name:
                return <QrScannerComponent handleData={handleData} />


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
                    <p>Selected library: <span>{props.scanMethod.name} {props.scanMethod.version}</span></p>

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
