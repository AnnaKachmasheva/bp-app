import React from "react";
import styles from './ModalAddItem.module.scss';


export const ModalAddItem = (props) => {
    if (!props.show)
        return null;

    return (
        <div className={'modal'}
             onClick={props.onClose}>

            <div className={styles.container.concat(" content")}
                 onClick={(e) => e.stopPropagation()}>

                add item

            </div>
        </div>
    )
}
