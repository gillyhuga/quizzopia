import React from 'react';
import { ChatBubbleLeftIcon, StarIcon, CheckBadgeIcon, ChartBarIcon } from '@heroicons/react/24/solid';

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
      'Take on quizzes of varying difficulty levels. Whether you’re a beginner or a seasoned expert, there’s a quiz waiting for you.',
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

function Features() {
  return (
    <div className="pb-20 pt-12">
      <div className="max-w-screen-sm load-hidden animate-fade-in animate-delay-200">
        <h2 className="w-80 font-semibold mx-auto mb-4 text-3xl text-center md:w-full md:text-4xl lg:text-left lg:ml-0">
          Why choose Quizzopia?
        </h2>
        <p className="text-center lg:text-left">
          Quizzopia is not just a website; it’s your personal playground for exploring, testing, and expanding your knowledge in a fun and engaging way.
        </p>
      </div>

      <div className="flex flex-wrap mt-10 md:mt-20">
        {featureData.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-5 p-5 w-full md:p-3 md:w-1/2 lg:w-1/4 lg:items-start load-hidden animate-slide-up animate-delay-200"
          >
            <button className="btn btn-primary mask mask-hexagon">
              {feature.icon}
            </button>
            <h3 className="text-[1.25em] md:text-[1.75em] text-center lg:text-left">
              {feature.title}
            </h3>
            <p className="text-center lg:text-left">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
