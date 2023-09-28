import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import Image from 'next/image';
import resultIllustration from '../../public/assets/Illustration.png';
import {
  resetState,
} from '../store/answer';
import {resetQuestion} from '../store/question';
import { RootState } from '../store';
import HeadMeta from '../components/HeadMeta';

const ResultPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { totalCorrect, totalWrong, answeredQuestions } = useSelector((state: RootState) => state.answers);

  const handleLogout = () => {
    dispatch(resetState());
    dispatch(resetQuestion());
    Cookies.remove('timeRemaining');
    router.push('/quiz');
  };

  const score = totalCorrect * 10;

  return (
    <Layout>
      <HeadMeta title='Result'/>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold mb-4">Quiz Results</h1>
        <Image src={resultIllustration} alt="Quiz Results Illustration" width={300} height={300} />
        <div className="bg-white p-4 rounded shadow w-full md:w-96">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="flex justify-between mb-4">
            <p>Total Correct:</p>
            <p>{totalCorrect}</p>
          </div>
          <div className="flex justify-between mb-4">
            <p>Total Wrong:</p>
            <p>{totalWrong}</p>
          </div>
          <div className="flex justify-between mb-4">
            <p>Total Answered:</p>
            <p>{answeredQuestions.length}</p>
          </div>
          <div className="flex justify-between mb-4">
            <p>Score:</p>
            <p>{score}</p>
          </div>
        </div>

        <button className="btn btn-primary normal-case mt-8" onClick={handleLogout}>
          Play Again
        </button>
      </div>
    </Layout>
  );
};

export default ResultPage;
