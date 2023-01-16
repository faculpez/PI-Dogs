import './createDog.css';

import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { createDog, getTemperaments } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import { Button, Select } from '@mui/material';

export default function CreateDog(){
    const [input,setInput] = useState({
        name:'',
        weight:'',
        height:'',
        image:'',
        temperament:[]
    });
    const [errors,setErrors]= useState({});
    
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperaments);
    
    
    useEffect((e) => {
        dispatch(getTemperaments(e))
    },[dispatch]);
    
    const validateInput = (input) => {
        const errors = {};
        if(!input.name.length) errors.name ='Debe ingresar un nombre';
        if(!input.height.length) errors.height = 'Debe ingresar altura';
        if(!input.image.length) errors.image = 'Debe ingresar una imagen';
        if(!input.weight.length) errors.weight = 'Debe ingresar peso';
        return errors;
    };

    useEffect(()=>{
        setErrors(validateInput(input))
    },[input]);
    
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    };


    function handleSubmit(e){
        e.preventDefault();
        dispatch(createDog(input))
        alert('Create successful!')
        setInput({
            name:'',
            weight:'',
            height:'',
            image:'',
            temperament:[]
        })
        history.push('/home')
    };

    return (
        <div className='createDog'>
    <h3>Create your dog!</h3>
    <form onSubmit={(e) => handleSubmit(e)}>
        <div>
        <label >Name: </label>
        <input type='text' name='name' value={input.name} onChange={handleChange} />
        <p>{errors.name && errors.name}</p>
        </div>
        <div>
        <label >Weight: </label>
        <input type='text' name='weight' value={input.weight} onChange={handleChange} />
        <p>{errors.weight && errors.weight}</p>
        </div>
        <div>
        <label >Height: </label>
        <input type='text' name='height' value={input.height} onChange={handleChange} />
        <p>{errors.height && errors.height}</p>
        </div>
        <div>
        <label >Image: </label>
        <input type='text' name='image' value={input.image} onChange={handleChange} />
        <p>{errors.image && errors.image}</p>
        </div>
        
        <label >Temperaments: </label>
        <Select>
            {temperaments && temperaments.map(item =>(<option value ={item.name} key ={item.id} >{item.name}</option>))} 
        </Select>

        <Button variant='contained' color='success' type='submit'>Create</Button>
    </form>
    </div>
);
}
