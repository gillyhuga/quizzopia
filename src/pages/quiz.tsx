import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import QuestionCard from '../components/QuestionCard';
import he from 'he';

interface Question {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const getShuffledAnswers = (questions: Question[], currentQuestion: number) => {
  const shuffleAnswers = (answers: string[]) => {
    const shuffledAnswers = [...answers];
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [
        shuffledAnswers[j],
        shuffledAnswers[i],
      ];
    }
    return shuffledAnswers;
  };

  if (questions.length > 0) {
    const currentQuestionObj = questions[currentQuestion];
    const answers = [
      ...currentQuestionObj.incorrect_answers.map((answer) => he.decode(answer)),
      he.decode(currentQuestionObj.correct_answer),
    ];
    return shuffleAnswers(answers);
  }
  return [];
};

const QuizPage: React.FC = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [totalCorrect, setTotalCorrect] = useState<number>(0);
  const [totalWrong, setTotalWrong] = useState<number>(0);
  const [totalAnswered, setTotalAnswered] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(60);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple'
        );
        setQuestions(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const savedResult = Cookies.get('quizResult');
    if (savedResult) {
      const { totalCorrect, totalWrong, totalAnswered } = JSON.parse(savedResult);
      setTotalCorrect(totalCorrect);
      setTotalWrong(totalWrong);
      setTotalAnswered(totalAnswered);
    }

    const savedTimeRemaining = Cookies.get('timeRemaining');
    if (savedTimeRemaining) {
      setTimeRemaining(parseInt(savedTimeRemaining, 10));
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const newTime = prevTime - 1;
        Cookies.set('timeRemaining', newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      const result = {
        totalCorrect,
        totalWrong,
        totalAnswered,
      };
      Cookies.set('quizResult', JSON.stringify(result));
      router.push('/result');
      Cookies.remove('timeRemaining');
    }
  }, [timeRemaining]);

  const handleSelectAnswer = (answer: string) => {
    const currentQuestionObj = questions[currentQuestion];
    const isCorrect = currentQuestionObj.correct_answer === answer;
    setSelectedAnswers([...selectedAnswers, answer]);
    
    if (isCorrect) {
      setTotalCorrect(totalCorrect + 1);
    } else {
      setTotalWrong(totalWrong + 1);
    }
    
    setTotalAnswered(totalAnswered + 1);
    
    if (totalAnswered + 1 === 10) {
      const result = {
        totalCorrect: totalCorrect + (isCorrect ? 1 : 0),
        totalWrong: totalWrong + (isCorrect ? 0 : 1),
        totalAnswered: totalAnswered + 1,
      };
      Cookies.set('quizResult', JSON.stringify(result));
      router.push('/result');
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const result = {
        totalCorrect,
        totalWrong,
        totalAnswered,
      };
      Cookies.set('quizResult', JSON.stringify(result));
      Cookies.set('timeRemaining', timeRemaining.toString());
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [totalCorrect, totalWrong, totalAnswered, timeRemaining]);

  const shuffledAnswers = useMemo(() => getShuffledAnswers(questions, currentQuestion), [
    questions,
    currentQuestion,
  ]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex justify-between w-full md:w-3/5">
          <h2 className="text-lg mb-4">
            <span className="font-bold">Questions:</span> {totalAnswered}/{questions.length}
          </h2>
          <h2 className="text-lg mb-4">
            <span className="font-bold">Time Remaining:</span> {timeRemaining} seconds
          </h2>
        </div>
        {questions.length > 0 && currentQuestion < questions.length ? (
          <QuestionCard
            category={questions[currentQuestion].category}
            question={he.decode(questions[currentQuestion].question)}
            answers={shuffledAnswers}
            onSelectAnswer={handleSelectAnswer}
          />
        ) : (
          <span className="loading loading-spinner text-primary"></span>
        )}
      </div>
    </Layout>
  );
};

export default QuizPage;