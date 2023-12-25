import React from "react";
import styles from './Button.module.scss';

const Button = ({onClick, label, type, size, icon, isDisabled}) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    const getButtonType = () => {
        const buttonType = ButtonType.find(item => item.type === type);
        const buttonSize = ButtonSize.find(item => item.size === size);
        return `${buttonType ? buttonType.style : ''} ${buttonSize ? buttonSize.style : ''}`;
    };

    return (
        <button className={getButtonType()}
                onClick={handleClick}
                disabled={isDisabled}>
            {icon && React.cloneElement(icon, {className: 'button-icon'})}
            {label}
        </button>
    );
};

export default Button;

export const ButtonType = [
    {type: 'primary', style: styles.primary},
    {type: 'primaryOutline', style: styles.primaryOutline},
    {type: 'secondary', style: styles.secondary},
    {type: 'secondaryOutline', style: styles.secondaryOutline},
    {type: 'danger', style: styles.danger},
    {type: 'dangerOutline', style: styles.dangerOutline}
]

export const ButtonSize = [
    {size: 'small', style: styles.small},
    {size: 'default', style: styles.default},
    {size: 'large', style: styles.large}
]