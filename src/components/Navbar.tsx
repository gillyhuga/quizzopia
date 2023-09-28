import Link from 'next/link';
import React from 'react';

function Navbar() {
    return (
        <div className="navbar min-w-screen bg-base-100">
            <div className="navbar-start">
                <a className="btn btn-ghost normal-case text-xl">Quizzopia</a>
            </div>
            <div className="navbar-end">
                <Link className="btn btn-primary normal-case" href='/quiz'>Lets Play!</Link>
            </div>
        </div>
    );
}

export default Navbar;
