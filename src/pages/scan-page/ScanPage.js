import React, {useState} from "react";
import {QRScanLibraries} from "../../utils/Constants";
import {ModalScanQRCode} from "../../components/scanner/window-scan-QR/ModalScanQRCode";
import {toStringForQRCode} from "../../utils/Common";
import styles from './Scan.module.scss';

const ScanPage = () => {

    const [showModalScanQr, setShowModalScanQr] = useState(false);
    const [scanMethod, setScanMethod] = useState(QRScanLibraries[0]);

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleSelectScanLibrary = (library) => {
        setScanMethod(library);
        setShowModalScanQr(true);
    };

    const handleData = data => {
        setData(data);

        // check data
        if (data != null) {
            // get uuid
            const uuid = getuuid(data);
            if (uuid == null) {
                handleError('UUID not found in scanned data')
            } else {

                // get variant by uuid
                const variant = getVariantByUUID(uuid);
                if (variant == null) {
                    handleError('Not found variant by uuid: ' + uuid)
                } else {
                    // check parameters
                    const foundVariantStr = toStringForQRCode(variant);

                    // check if data valid
                    if (foundVariantStr === data) {
                        handleError('Found variant: ' + variant)
                    } else {
                        handleError('QR code contains invalid data')
                    }
                }
            }
        }
    }

    const handleError = errorMessage => {
        setError(errorMessage)
    }

    function getuuid(data) {
        // Define a regular expression to match the UUID
        const uuidRegex = /uuid:(.+)/;

        // Use the regex to find the UUID in the string
        const match = data.match(uuidRegex);

        // Extract the UUID if a match is found
        return match ? match[1] : null;
    }

    function getVariantByUUID(uuid) {
        // for (const category of mocData.categories) {
        //     for (const item of category.items) {
        //         for (const variant of item.variants) {
        //             if (variant.uuid === uuid) {
        //                 return variant;
        //             }
        //         }
        //     }
        // }
        // If variant is not found
        return null;
    }

    return (
        <div className={'content'}>
            <ModalScanQRCode onClose={() => setShowModalScanQr(false)}
                             show={showModalScanQr}
                             data={data}
                             error={error}
                             handleData={handleData}
                             scanMethod={scanMethod}/>


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