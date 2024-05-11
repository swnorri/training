import { useState, useCallback } from 'react';

import QUESTIONS from '../data/questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';

export default function Quiz() {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const activeQuestionIdx =  selectedAnswers.length;
    const quizIsComplete = activeQuestionIdx === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
        setSelectedAnswers((prevState) => {
            return [
                ...prevState,
                answer
            ]
        });
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [
        handleSelectAnswer
    ]);

    if (quizIsComplete) {
        return (
            <Summary userAnswers={selectedAnswers}/>
        )
    }
    else {
        return (
            <div id="quiz">
                <Question
                    onSelectAnswer={handleSelectAnswer}
                    onSkipAnswer={handleSkipAnswer}
                    questionIndex={activeQuestionIdx}
                    key={activeQuestionIdx} />
            </div>
        );
    }
}