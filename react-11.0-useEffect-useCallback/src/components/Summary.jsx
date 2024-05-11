import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../data/questions.js';

export default function Summary({
    userAnswers
}) {
    const skippedAnswers = userAnswers.filter(answer => answer === null);
    const correctAnswers = userAnswers.filter((answer, index) => {
        return answer === QUESTIONS[index].answers[0]
    });

    const skippedShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
    const correctShare = Math.round((correctAnswers.length / userAnswers.length) * 100);

    return (
        <div id="summary">
            <img src={quizCompleteImg} alt="Quiz completed image" />
            <h2>Quiz is completed.</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{skippedShare}%</span>
                    <span className="text">Skipped</span>
                </p>
                <p>
                    <span className="number">{correctShare}%</span>
                    <span className="text">Answered correctly</span>
                </p>
                <p>
                    <span className="number">{100 - skippedShare - correctShare}%</span>
                    <span className="text">Answered incorrectly</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((item, index) => {
                    let cssClass = 'user-answer';
                    if(item === null){
                        cssClass += ' skipped';
                    } 
                    else if (item === QUESTIONS[index].answers[0]){
                        cssClass += ' correct';
                    }
                    else{
                        cssClass += ' wrong';
                    }

                    return (
                        <li key={index + 1}>
                            <h3>{index + 1}</h3>
                            <p className="question">{QUESTIONS[index].text}</p>
                            <p className={cssClass}>{item ?? "No Answer Selected"}</p>
                        </li>
                    )
                })}
            </ol>
        </div>
    );
}