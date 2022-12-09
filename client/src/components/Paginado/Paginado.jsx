import './paginado.css'
import React from "react";

export default function Paginado ({dogsPerPage, allDogs, paginado}){
    const pageNumber = [];
    for( let i = 0; i <= Math.ceil(allDogs/dogsPerPage); i++){
        pageNumber.push(i+1)
    }

    return(
        <div className="paginado">
        <nav>
            <ul>
                {pageNumber && 
                pageNumber.map(number =>(
                    <li className="paginado" key={number}>
                    <a onClick={()=>paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
        </div>
    )
}
