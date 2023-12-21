import React from "react";
import styles from './ModalAddTag.module.scss';


export const ModalAddTag = (props) => {
    if (!props.show)
        return null;

    return (
        <div className={'modal'}
             onClick={props.onClose}>

            <div className={styles.container.concat(" content")}
                 onClick={(e) => e.stopPropagation()}>

                add tag

            </div>
        </div>
    )
}
