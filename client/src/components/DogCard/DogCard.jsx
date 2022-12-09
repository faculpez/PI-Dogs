import './dogCard.css'
import React from "react";
import { Link } from 'react-router-dom';


export default function DogCard( props ){
    return(
        <div className="container">
                <div className="slideContent">
                    <div className="box-wrapper">
                        <div className='box'>
                            <div className="box-image">
                                <img src={props.image} alt={props.name} />
                            </div>
                            {/* <h3>{props.name}</h3> */}
                            <Link to={`/dogs/${props.id}`}>{props.name}</Link>
                            <p>Temperaments:  {props.temperament}</p>
                        </div>
                        </div>
                    </div>
                </div>
    )
}