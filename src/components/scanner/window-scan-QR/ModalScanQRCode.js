import React from "react";
import styles from './ModalScanQRCode.module.scss';
import {AiOutlineClose} from "react-icons/ai";
import Html5QrReaderComponent from "./selectedforsp/Html5QrReaderComponent";
import {QRScanLibraries} from "../../../utils/Constants";
import QrScannerComponent from "./selectedforsp/QrScannerComponent";
import ZxingComponent from "./selectedforsp/ZxingComponent";
import QuaggaComponent from "./selectedforsp/QuaggaComponent";
import InstascanComponent from "./selectedforsp/InstascanComponent";

export const ModalScanQRCode = (props) => {
    if (!props.show)
        return null;

    const handleData = data => {
        props.handleData(data);
    }

    const renderContent = () => {
        switch (props.scanMethod.name) {

            case QRScanLibraries[0].name:
                return <Html5QrReaderComponent handleData={handleData}/>
            case QRScanLibraries[1].name:
                return <QrScannerComponent handleData={handleData}
                                           fps={10}
                                           qrbox={250}
                                           disableFlip={false}/>
            case QRScanLibraries[2].name:
                return <ZxingComponent handleData={handleData}/>
            case QRScanLibraries[3].name:
                return <QuaggaComponent handleData={handleData}/>
            case QRScanLibraries[4].name:
                return <InstascanComponent handleData={handleData}/>

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
