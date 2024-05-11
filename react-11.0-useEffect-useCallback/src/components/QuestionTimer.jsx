import { useState, useEffect } from 'react';


export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [progressValue, setProgressValue] = useState(timeout);

    useEffect(() => {
        const progressTime = setTimeout(onTimeout, timeout);

        return () => {
            clearTimeout(progressTime);
        }
    }, [timeout, onTimeout]);

    useEffect(() => {
        const progressValue = setInterval(() => {
            setProgressValue(prevVal => prevVal - 100);
        }, 100);

        return () => {
            clearInterval(progressValue);
        }
    }, []);

    return (
        <progress
            id="question-time"
            value={progressValue}
            max={timeout}
            className={mode}
        ></progress>
    );
}