import React, { FC } from "react";
import './button.css';

interface ButtonProps {
    onClick: Function,
    isCompact?: boolean,
    disabled?: boolean
}

const Button: FC<ButtonProps> = (props) => {
    return (
        <div 
            onClick={() => props.onClick()} 
            className={
                `button 
                ${props.isCompact ? 'button-compact' : ''}
                ${props.disabled ? 'button-disabled' : ''}`}>
            {props.children}
        </div>
    );
}

export default Button;