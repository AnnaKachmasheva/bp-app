import React, {useState} from "react";
import {QRScanLibraries} from "../../utils/Constants";
import {ModalScanQRCode} from "../../components/scanner/window-scan-QR/ModalScanQRCode";
import {fromStringForQRCode, toStringForQRCode} from "../../utils/Common";
import styles from './Scan.module.scss';
import {ModalQRCode} from "../../components/scanner/window-show-QR/ModalQRCode";
import {useNavigate} from "react-router-dom";
import {ModalInvalidCode} from "./modalWindowInvalidCode/ModalInvalidCode";

const ScanPage = () => {

    const [showModalScanQr, setShowModalScanQr] = useState(false);
    const [showModalQr, setShowModalQr] = useState(false);
    const [scanMethod, setScanMethod] = useState(QRScanLibraries[0]);
    const [showInvalidCode, setShowInvalidCode] = useState(false);

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    const navigate = useNavigate();

    const handleSelectScanLibrary = (library) => {
        setScanMethod(library);
        setShowModalScanQr(true);
    };

    const handleData = data => {

        if (data != null) {
            setData(data);
            setShowModalScanQr(false)
            const variant = fromStringForQRCode(data)
            if (variant != null) {
                setShowModalQr(true)
            } else {
                setShowInvalidCode(true)
            }
        }
    }

    const handleError = errorMessage => {
        setError(errorMessage)
    }

    const goToVariantPage = (data) => {
        const idProduct = data.product.id;
        const idVariant = data.id;
        navigate(`/app/inventory/product/${idProduct}/variant/${idVariant}`, {state: {data: data}});
    }

    function rescanHandle() {
        setData(null)
    }

    return (
        <div className={'content'}>
            <ModalScanQRCode onClose={() => setShowModalScanQr(false)}
                             show={showModalScanQr}
                             data={data}
                             error={error}
                             handleData={handleData}
                             scanMethod={scanMethod}/>

            <ModalQRCode onClose={() => setShowModalQr(false)}
                         data={data}
                         showVariant={() => goToVariantPage(data)}
                         show={showModalQr}/>

            <ModalInvalidCode onClose={() => setShowInvalidCode(false)}
                              rescan={() => rescanHandle()}
                              data={data}
                              show={showInvalidCode}/>

            <h4>Select a library to scan</h4>

            {QRScanLibraries.map((library, index) =>
                <div className={styles.libraryContainer}>
                    <li value={library.name}
                        onClick={() => handleSelectScanLibrary(library)}>
                        {library.name} - Version {library.version}
                    </li>
                </div>
            )}
        </div>
    );
};

export default ScanPage;