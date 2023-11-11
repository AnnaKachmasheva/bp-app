import React, {useEffect} from "react";
import styles from './ReactQRReaderComponent.module.scss';
import Quagga from "quagga";
import conf from "./config.json";

const QuaggaComponent = (props) => {

    const {onDetected} = props;

    useEffect(() => {
        Quagga.init(conf, err => {
            if (err) {
                console.log(err, "error msg");
            }
            Quagga.start();
            return () => {
                Quagga.stop()
            }
        });

        //detecting boxes on stream
        Quagga.onProcessed(result => {
            let drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(
                        0,
                        0,
                        Number(drawingCanvas.getAttribute("width")),
                        Number(drawingCanvas.getAttribute("height"))
                    );
                    result.boxes
                        .filter(function (box) {
                            return box !== result.box;
                        })
                        .forEach(function (box) {
                            Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {
                                color: "green",
                                lineWidth: 2
                            });
                        });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {
                        color: "#00F",
                        lineWidth: 2
                    });
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(
                        result.line,
                        {x: "x", y: "y"},
                        drawingCtx,
                        {color: "red", lineWidth: 3}
                    );
                }
            }
        });

        Quagga.onDetected(detected);
    }, []);

    const detected = result => {
        onDetected(result.codeResult.code);
    };

    return (
        <div className={styles.cameraWrapper}>
            <div className={styles.cameraContainer}
                 id="interactive"
            />
        </div>
    );
}

export default QuaggaComponent;