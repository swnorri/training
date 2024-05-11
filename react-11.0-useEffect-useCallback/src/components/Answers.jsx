import { useRef } from 'react';

export default function Answers({
    answers,
    selectedAnswer,
    answerState,
    onSelect
}) {
    const shuffledAnswers = useRef();
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers].sort((a, b) =>
            Math.random() - 0.5
        );
    }

    return (
        <ul id="answers">
            {shuffledAnswers.current.map(item => {
                const isSelected = selectedAnswer === item;
                let cssClass = '';
                if (answerState === 'answered' && isSelected) {
                    cssClass = 'selected';
                }
                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClass = answerState;
                }
                return (
                    <li key={item} className="answer">
                        <button
                            onClick={() => onSelect(item)}
                            className={cssClass}
                            disabled={answerState !== ''}
                        >{item}</button>
                    </li>
                )
            })}
        </ul>
    )
}