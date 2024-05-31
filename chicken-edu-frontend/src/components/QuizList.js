import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './QuizList.css';

function QuizList() {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [selectedChoice, setSelectedChoice] = useState('');
    const [result, setResult] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/quizzes')
            .then(response => {
                setQuizzes(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleQuizSelect = (quiz) => {
        setSelectedQuiz(quiz);
        setSelectedChoice('');
        setResult(null);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        axios.post('http://localhost:5000/api/submit_quiz', {
            user_id: user.user_id,
            quiz_id: selectedQuiz.id,
            answer: selectedChoice
        })
        .then(response => {
            setResult(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };

    return (
        <div className="quiz-list">
            <h2>Quizzes</h2>
            <ul>
                {quizzes.map(quiz => (
                    <li key={quiz.id} onClick={() => handleQuizSelect(quiz)}>
                        {quiz.question}
                    </li>
                ))}
            </ul>
            {selectedQuiz && (
                <div className="quiz-detail">
                    <h3>{selectedQuiz.question}</h3>
                    <form onSubmit={handleSubmit}>
                        {selectedQuiz.choices.map((choice, index) => (
                            <div key={index}>
                                <input
                                    type="radio"
                                    name="choice"
                                    value={choice}
                                    checked={selectedChoice === choice}
                                    onChange={(e) => setSelectedChoice(e.target.value)}
                                />
                                {choice}
                            </div>
                        ))}
                        <button type="submit">Submit Answer</button>
                    </form>
                    {result && (
                        <p>{result.correct ? 'Correct!' : 'Incorrect.'}</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default QuizList;
