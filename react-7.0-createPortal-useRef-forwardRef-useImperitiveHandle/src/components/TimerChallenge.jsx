import { useState, useRef } from 'react';
import ResultModal from './ResultModal';

export default function TimerChallenge({ title, tgtTime }) {
    const [timeRemaining, setTimeRemaining] = useState(tgtTime * 1000);
    const timer = useRef();
    const dialog = useRef();
    const timerIsActive = timeRemaining > 0 && timeRemaining < tgtTime * 1000;

    if (timeRemaining <= 0) {
        handleTimerStop();
        dialog.current.open();
    }
    function handleReset() {
        setTimeRemaining(tgtTime * 1000);
    }
    function handleTimerStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(remTime => remTime - 10);
        }, 10);
    }
    function handleTimerStop() {
        dialog.current.open();
        clearInterval(timer.current);
    }

    return (
        <>
            <ResultModal
                ref={dialog}
                tgtTime={tgtTime}
                remainingTime={timeRemaining}
                onReset={handleReset}
            />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {tgtTime} second{tgtTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button
                        onClick={timerIsActive ? handleTimerStop : handleTimerStart}
                    >{timerIsActive ? 'Stop' : 'Start'} Challenge</button>
                </p>
                <p className={timerIsActive ? 'active' : ''}>
                    {timerIsActive ? 'Time is running' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}