
import React from "react";
import { Link } from 'react-router-dom';
import image from './dog.png'

export default function LandingPage() {
    return(
        <div className="landing">
            <h1>Welcome!</h1>
            <img src={image} alt="image" />
            <Link to='/home'>
                <button>Enter</button>
            </Link>
        </div>
    )
};
