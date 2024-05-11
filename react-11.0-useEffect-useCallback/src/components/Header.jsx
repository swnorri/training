import quizlogo from '../assets/quiz-logo.png';

export default function Header(){

    return (
        <header>
            <img src={quizlogo} alt="Logo for the React Quiz"/>
            <h1>
                React Quiz
            </h1>
        </header>
    )
}