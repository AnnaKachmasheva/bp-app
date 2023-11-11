import React from "react";
import styles from './Header.module.scss';

const Header = (props) => (
    <div className={styles.header}>
        <p>{props.title}</p>
    </div>
);

export default Header;