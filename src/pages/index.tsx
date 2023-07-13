import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Quizzopia</h1>
          <p className="py-6">Unlock your knowledge, embrace the challenge!</p>
          <Link href="/quiz">
            <button className="btn btn-primary normal-case">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
