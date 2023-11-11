import React, {useState} from "react";
import {ModalScanQRCode} from "./modalWindowScanReactQrReader/ModalScanQRCode";
import {ModalQRCode} from "./modalWindowQRCode/ModalQRCode";


function ScanComponent() {

    const scanMethodOptions = [
        {value: 'react-qr-reader', label: 'react-qr-reader'},
        {value: 'react-zxing', label: 'react-zxing'},
        {value: 'react-qr-scanner', label: 'react-qr-scanner'},
        {value: 'html5-qrcode', label: 'html5-qrcode'},
        {value: 'quagga', label: 'quagga'},
        {value: 'jsqr', label: 'jsqr'}
    ];

    const [showModalScanReactQrReader, setShowModalScanReactQrReader] = useState(false);
    const [showModalQRCode, setShowModalQRCode] = useState(false);

    const [data, setData] = useState(null);
    const [scanMethod, setScanMethod] = useState(scanMethodOptions[0].value);


    const handleChange = (e) => {
        setScanMethod(e.target.value);
    };

    const handleData = data => {
        setData(data);
    }

    const handleClickScanBtn = () => {
        setData(null);
        setShowModalScanReactQrReader(true);
    }


    return (
        <div className={'contentContainer'}>
            <ModalScanQRCode onClose={() => setShowModalScanReactQrReader(false)}
                             show={showModalScanReactQrReader}
                             data={data}
                             handleData={handleData}
                             scanMethod={scanMethod}/>

            <ModalQRCode onClose={() => setShowModalQRCode(false)}
                         show={showModalQRCode}
                         data={data}
                         rescanData={() => setData(null)}
            />

            {data !== null ?
                <div>
                    <p>data: {data}</p>
                    <button type={'submit'}
                            className={'btn btn-outline-success'}
                            onClick={() => setShowModalQRCode(true)}>
                        Show code
                    </button>
                </div>
                : null
            }

            <div className={'content'}>
                <p>Select scan method:</p>
                <select onChange={handleChange}>>
                    {scanMethodOptions.map((method, i) =>
                        <option value={method.value}>
                            {method.label}
                        </option>)}
                </select>

                <button type={'submit'}
                        className={'btn btn-outline-success'}
                        onClick={handleClickScanBtn}>
                    Scan
                </button>

            </div>

        </div>
    )
}

export default ScanComponent