import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterByValue, getAllDogs, getTemperaments, orderByName, } from "../../redux/actions";
import DogCard from '../DogCard/DogCard.jsx';
import Nav from "../Nav/Nav";
import Paginado from '../Paginado/Paginado.jsx'
import { MenuItem, Select } from "@mui/material";
import './home.css'


export default function Home () {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const temperaments = useSelector((state) => state.temperaments)
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const [orden, setOrden] = useState('');
    const indexOfLastDogs = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDogs - dogsPerPage;
    const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDogs);
    const paginado = (pageNumber) => { setCurrentPage(pageNumber) };
    
    function handleSort(e){
        e.preventDefault();
        dispatch( orderByName(e.target.value) )
        setCurrentPage(1);
        setOrden(`${e.target.value}`)
    }
    
    function handleFilterTemps(e){
            dispatch(filterByValue(e.target.value))
    }
    
    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);
    
    useEffect(() => {
        dispatch(getAllDogs());
    },[dispatch]);
    
    console.log(allDogs);
    return(
        <div>
            <Nav/>
            <h1>DOGS</h1>
            <h3>...</h3>
            <div className="select">
            <strong> Ordenar:</strong>
            <Select  variant='standard' onChange={e => handleSort(e)}>
                <MenuItem value="asc">A-z</MenuItem>
                <MenuItem value="desc">Z-a</MenuItem>
            </Select>
            <strong>  Filtrar por:</strong>
            <Select variant='standard' onChange={e => handleFilterTemps(e)}>
                <MenuItem value="All">All</MenuItem>
                {temperaments?.map(item =>(<MenuItem value={item.name} key={item.id} >{item.name}</MenuItem>))} 
            </Select>
        </div>

            
                
            
            
            <div className="container">
            {currentDog?.map((item)=>{
                return (
                    <div className="cards" key={item.id} >
                    <Link to={`/home/`+ item.id}>
                        <DogCard name={item.name} image={item.image} temperament={item.temperament} />
                    </Link>
                    </div>
                    )
                })}
                </div>

                <Paginado dogsPerPage ={dogsPerPage} allDogs = {allDogs.length} paginado = {paginado}/>
        </div>
    )
};
