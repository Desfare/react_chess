import React, { FC, useState, useRef, useEffect } from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';
import ButtonUI from './ButtonUI/ButtonUI';
import LoseModal from './LoseModal/LoseModal';

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(1000)
    const [whiteTime, setWhiteTime] = useState(1000)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)
    const [modal, setModal] = useState(false)
   
    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    function startTimer() {
        if(timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setBlackTime(prev => {
            if(prev === 0) {
                setModal(true)
                return prev = 0
            } else return prev - 1
        })
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => {
            if(prev === 0) {
                setModal(true)
                return prev = 0 
            } else return prev - 1
        })
    }

    const handleRestart = () => {
        setWhiteTime(1000)
        setBlackTime(1000)
        restart()
    }


    return (
        <div className="timer">
           <div onClick={handleRestart}>
                <ButtonUI>Restart game</ButtonUI>
            </div> 
            <h2 className="textUI">
                Black - {blackTime === 0 ? <LoseModal handleRestart={handleRestart} visible={modal} setVisible={setModal}>Black was destroyed</LoseModal> : blackTime} sec
            </h2>
            <h2 className="textUI">
                White - {whiteTime === 0 ? <LoseModal handleRestart={handleRestart} visible={modal} setVisible={setModal}>White was destroyed</LoseModal> : whiteTime} sec
            </h2>
            <h2 className="textUI">Now is {currentPlayer?.color} turn</h2>
        </div>
    );
};

export default Timer;