import React from 'react';
import Navbar from '../components/Navbar';
import { ChatBubbleLeftIcon, StarIcon, CheckBadgeIcon, ChartBarIcon } from '@heroicons/react/24/solid'
import Header from '../components/Header';
import Features from '../components/Features';
import GetStarted from '../components/GetStarted';
import Footer from '../components/Footer';
import HeadMeta from '../components/HeadMeta';

const featureData = [
  {
    icon: <ChatBubbleLeftIcon className="h-6 w-6 text-white" />,
    title: 'Diverse Topics',
    description:
      'From science and history to pop culture and geography, we cover it all. Our extensive library of quizzes ensures there’s something for everyone.',
  },
  {
    icon: <StarIcon className="h-6 w-6 text-white" />,
    title: 'Challenge Yourself',
    description:
      'Take on quizzes of varying difficulty levels. Whether you’re a beginner or a seasoned expert, theres a quiz waiting for you.',
  },
  {
    icon: <CheckBadgeIcon className="h-6 w-6 text-white" />,
    title: 'Compete and Connect',
    description:
      'Challenge your friends or make new ones through our interactive multiplayer quizzes. Connect with fellow knowledge seekers and quizzers worldwide.',
  },
  {
    icon: <ChartBarIcon className="h-6 w-6 text-white" />,
    title: 'Track Your Progress',
    description:
      'Monitor your performance, see how you stack up against others, and earn badges for your accomplishments.',
  },
];

function App() {
  return (
    <div >
      <HeadMeta/>
      <div className='container max-w-screen-xl mx-auto'>
        <Navbar />
        <Header />
        <Features />
        <GetStarted />
      </div>
      <Footer />
    </div>
  );
}

export default App;
