import React, { useState, useEffect } from 'react';

const QuizApp = () => {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const apiUrl = 'https://opentdb.com/api.php?amount=10';

    const fetchQuestions = async () => {
        try {
            const response = await fetch(apiUrl);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch data');
            // }

            const data = await response.json();
            setQuestions(data.results.map((question) => ({
                question: question. question,
                options:
                    [...question.incorrect_answers,
                    question.correct_answer],
                correct_answer: question.correct_answer,
            })));
            setLoading(false);
        } catch (error) {
            console.error('Error ', error);
        }
    };
    console.log(userAnswers[currentQuestionIndex]);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleAnswerSelect = (selectedAnswer) => {
        const newAnswers = [...userAnswers];
        // console.log([...userAnswers]);
        console.log(selectedAnswer);
        newAnswers[currentQuestionIndex] = selectedAnswer;
        setUserAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            calculateScore();
        }
    };

    const calculateScore = () => {
        let newScore = 0;
        questions.forEach((question, index) => {
            if (question.correct_answer === userAnswers[index]) {
                newScore += 1;
            }
        });
        setScore(newScore);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Quiz App</h1>

            <div>
                <p>{questions[currentQuestionIndex].question}</p>
                {
                    questions[currentQuestionIndex].options.map((option, i) => (
                        <div key={i}>
                            <input
                                type="radio"
                                name={`question-${currentQuestionIndex}`}
                                value={option}
                                checked={userAnswers[currentQuestionIndex] === option}
                                onChange={() => handleAnswerSelect(option)}
                            />
                            <label>{option}</label>
                        </div>
                    ))
                }
                <button onClick={handleNextQuestion}>Next</button>

                <div>
                    <p>Your Score: {score}/{questions.length}</p>
                </div>
            </div>

        </div>
    );
};

export default QuizApp;