import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import Image from 'next/image';
import resultIllustration from '../../public/assets/Illustration.png';

const ResultPage: React.FC = () => {
  const router = useRouter();
  const [totalCorrect, setTotalCorrect] = useState<number>(0);
  const [totalWrong, setTotalWrong] = useState<number>(0);
  const [totalAnswered, setTotalAnswered] = useState<number>(0);

  useEffect(() => {
    const resultString = Cookies.get('quizResult');
    if (resultString) {
      const result = JSON.parse(resultString);
      setTotalCorrect(result.totalCorrect);
      setTotalWrong(result.totalWrong);
      setTotalAnswered(result.totalAnswered);
    } else {
      router.push('/quiz');
    }
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('quizResult');
    Cookies.remove('timeRemaining');
    router.push('/quiz');
  };

  const score = totalCorrect * 10;

  return (
    <Layout>
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
            <p>{totalAnswered}</p>
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
