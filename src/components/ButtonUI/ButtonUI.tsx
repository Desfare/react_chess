import React, { FC } from 'react';
import classes from "./ButtonUI.module.css"

interface ButtonUiProps {
    children: string;
}

const ButtonUI: FC<ButtonUiProps> = ({children}) => {
    const rootClasses = [classes.buttonUI]
    return (
        <div className={rootClasses.join(' ')}>
            {children}
        </div>
    );
};

export default ButtonUI;