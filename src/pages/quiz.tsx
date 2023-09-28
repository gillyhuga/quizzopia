import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import QuestionCard from '../components/QuestionCard';
import he from 'he';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  AnsweredQuestion,
  setAnsweredQuestions,
  setTotalCorrect,
  setTotalWrong,
} from '../store/answer';
import {
  setQuestions,
  setCurrentQuestion,
} from '../store/question';
import HeadMeta from '../components/HeadMeta';

interface Question {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const getShuffledAnswers = (questions: Question[], currentQuestion: number): string[] => {
  const shuffleAnswers = (answers: string[]): string[] => {
    const shuffledAnswers = [...answers];
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
    }
    return shuffledAnswers;
  };

  const currentQuestionObj = questions[currentQuestion];

  if (currentQuestionObj && currentQuestionObj.incorrect_answers) {
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
  const dispatch = useDispatch();
  const { questions, currentQuestion } = useSelector((state: RootState) => state.questions);
  const { totalCorrect, totalWrong, answeredQuestions } = useSelector((state: RootState) => state.answers);
  const [timeRemaining, setTimeRemaining] = useState<number>(60);

  useEffect(() => {
    const fetchData = async () => {
      if (currentQuestion === 0 && questions.length === 0) {
        try {
          const response = await axios.get(
            'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple'
          );
          dispatch(setQuestions(response.data.results));
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();

    const savedTimeRemaining = Cookies.get('timeRemaining');
    if (savedTimeRemaining) {
      setTimeRemaining(parseInt(savedTimeRemaining, 10));
    }

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const newTime = prevTime - 1;
        Cookies.set('timeRemaining', newTime.toString());
        return newTime;
      });
    }, 1000);

    if (timeRemaining === 0) {
      router.push('/result');
      Cookies.remove('timeRemaining');
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      Cookies.set('timeRemaining', timeRemaining.toString());
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [dispatch, currentQuestion, questions.length, timeRemaining, router]);

  const handleSelectAnswer = (answer: string) => {
    const currentQuestionObj = questions[currentQuestion];

    if (currentQuestionObj && currentQuestionObj.correct_answer) {
      const isCorrect = currentQuestionObj.correct_answer === answer;

      const newAnsweredQuestion: AnsweredQuestion = {
        category: currentQuestionObj.category,
        question: currentQuestionObj.question,
        correct_answer: currentQuestionObj.correct_answer,
        selected_answer: answer,
      };

      dispatch(setAnsweredQuestions([...answeredQuestions, newAnsweredQuestion]));

      if (isCorrect) {
        dispatch(setTotalCorrect(totalCorrect + 1));
      } else {
        dispatch(setTotalWrong(totalWrong + 1));
      }

      if (answeredQuestions.length + 1 === 10) {
        router.push('/result');
      } else {
        dispatch(setCurrentQuestion(currentQuestion + 1));
      }
    }
  };

  const shuffledAnswers = useMemo(() => getShuffledAnswers(questions, currentQuestion), [
    questions,
    currentQuestion,
  ]);

  return (
    <Layout>
      <HeadMeta title='Quiz'/>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex justify-between w-full md:w-3/5">
          <h2 className="text-lg mb-4">
            <span className="font-bold">Questions:</span> {answeredQuestions.length}/{questions.length}
          </h2>
          <h2 className="text-lg mb-4">
            <span className="font-bold">Time Remaining:</span> {timeRemaining} seconds
          </h2>
        </div>
        {questions.length > 0 && currentQuestion < questions.length ? (
          <QuestionCard
            category={questions[currentQuestion]?.category}
            question={he.decode(questions[currentQuestion]?.question)}
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
