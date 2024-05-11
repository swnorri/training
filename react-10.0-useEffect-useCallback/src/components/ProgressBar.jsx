import { useEffect, useState } from 'react';


export default function ProgressBar({ timer }) {
    const [remainingTime, setRemainingTime] = useState(timer);

    useEffect(() => {
        const progressInt = setInterval(() => {
            setRemainingTime(prevVal => prevVal - 10);
        }, 10);
        return () => {
            clearInterval(progressInt);
        }
    }, []);

    return (
        <progress value={remainingTime} max={timer} />
    )
}