import React  from 'react';
import classes from './LoseModal.module.css'
import { FC } from 'react';

interface LoseModalProps {
    children: string;
    visible: boolean;
    setVisible: (setModal: boolean) => void;
    handleRestart: () => void;
}


const LoseModal: FC<LoseModalProps> = ({children , visible, setVisible, handleRestart}) => {
    const rootClasses = [classes.loseModal]

    if(visible) {
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={function() {setVisible(false); handleRestart()}}>
            <div className={classes.loseModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default LoseModal;