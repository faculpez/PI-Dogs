import "./nav.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getNameDog } from "../../redux/actions";



export default function Nav () {
    const dispatch = useDispatch;
    const [name, setName] = useState('');


    function handleInputChange (e){
        e.preventDefault();
        setName(`${e.target.value}`);
        console.log(name);
    }

    function handlesubmit(e){
        e.preventDefault();
        dispatch(getNameDog(name))
    }

    return (
    <div className="nav">
        <Link to='/home'>Home</Link>
        <div className="search">
            <input type="text" placeholder="Search..." onChange={(e) => handleInputChange(e)}/>
            <button type='submit' onClick={(e) => handlesubmit(e)}>Search</button>
        </div>
        <Link to='/dogs/create'>Crear Perro</Link>
    </div>
    );

}
