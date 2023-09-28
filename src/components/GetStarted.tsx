import React from 'react';
import Image from 'next/image';
import startedIllustration from '../../public/assets/Started.png';
import Link from 'next/link';

function GetStarted() {
    return (
        <div className="lg:px-24 md:px-16 sm:px-8 px-4 pb-20 pt-12">
            <div className="flex lg:flex-row flex-col -m-4 bg-primary rounded-xl">
                <div className="p-4 w-full">
                    <div className="card-header h-full flex lg:flex-row flex-col p-7 rounded-xl lg:space-x-3.5 md:space-x-3.5 space-x-0">
                        <div className="text-center mx-auto">
                            <Image
                                src={startedIllustration}
                                width={300}
                                alt=""
                            />
                        </div>
                        <div className="flex-grow my-auto lg:w-3/4 w-full lg:text-left text-center lg:my-auto md:my-auto py-6">
                            <h4 className="text-2xl font-semibold mb-2.5 text-medium-black">
                                Ready to Get Started?
                            </h4>
                            <p className="text-base font-light tracking-wide w-full text-gray">
                                It’s time to embrace the challenge, test your limits,{' '}
                                <br className="lg:block hidden" /> and become a true Quizzopia champion!
                            </p>
                        </div>
                        <div className="items-center my-auto text-center">
                            <Link className="m-2 btn normal-case px-4 py-2" href='/quiz'>Play Now!</Link>
                            <button className="m-2 btn btn-outline normal-case px-4 py-2">Demo</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetStarted;
