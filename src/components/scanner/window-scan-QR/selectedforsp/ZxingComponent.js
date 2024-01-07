import React from "react";
import styles from './ReactQRReaderComponent.module.scss';
import {useZxing} from "react-zxing";

const ZxingComponent = (props) => {

    const {ref} = useZxing({
        onDecodeResult(result) {
            props.handleData(result.getText());
        },
    });

    return (
        <div className={styles.cameraWrapper}>
            <video ref={ref}
                   className={styles.cameraContainer}
            />
        </div>
    );

}

export default ZxingComponent;