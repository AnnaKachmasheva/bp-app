import React from "react";

const ModalWindow = (props) => {
    if (!props.show)
        return null;


    return (
        <div className={'modal'}>
            <div className={'modal-window-content'}>
                <p className={'modal-header'}>
                    {props.title}
                </p>
                {props.content}
            </div>
        </div>
    );
};


export default ModalWindow;