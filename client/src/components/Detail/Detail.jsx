import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";



const Detail = (props) => {

    const dog = useSelector((state) => state.dogDetail);
    const dispatch = useDispatch();
    console.log('DOG',dog);
    
    useEffect(() =>(
        dispatch(getDetail(props.match.params.id))
    ),[dispatch])

    return (
        <div>
            <h1>{dog.name}</h1>
            <img src={dog.image} alt={dog.name} />
            <p>{dog.height}</p>
            <p>{dog.weight}</p>
            <p>{dog.temperament}</p>
        </div>
    );
}

export default Detail;