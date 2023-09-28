import React from 'react';
import Image from 'next/image';
import heroIllustration from '../../public/assets/Hero.png';
import Link from 'next/link';

function Header() {
  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="max-w-screen-sm lg:max-w-screen-lg xl:max-w-screen-xl">
          <Image
            src={heroIllustration}
            layout="responsive"
            width={500}
            height={300}
            alt={''}
            className="w-full"
          />
        </div>
        <div>
          <h1 className="text-5xl font-bold">Quizzopia!</h1>
          <p className="py-6">
            Are you ready to embark on a thrilling journey of knowledge,
            curiosity, and endless learning possibilities? Look no further
            than Quizzopia – your gateway to a world of exciting quizzes and
            intellectual adventures.
          </p>
          <Link className="btn btn-primary normal-case" href='/quiz'>Get Started</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
