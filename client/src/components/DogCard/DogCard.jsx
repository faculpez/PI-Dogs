// import './dogCard.css'
import React from "react";
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


export default function DogCard( props ){
    return(
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
        <CardMedia
            component="img"
            height="140"
            image={props.image}
            alt={props.name} 
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {props.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Temperaments:  {props.temperament}
            </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
        <Button size="small" color="primary">
        Share
        </Button>
    </CardActions>
    </Card>
);
    //     <div className="container">
    //             <div className="slideContent">
    //                 <div className="box-wrapper">
    //                     <div className='box'>
    //                         <div className="box-image">
    //                             <img src={props.image} alt={props.name} />
    //                         </div>
    //                         {/* <h3>{props.name}</h3> */}
    //                         <Link to={`/dogs/${props.id}`}>{props.name}</Link>
    //                         <p>Temperaments:  {props.temperament}</p>
    //                     </div>
    //                     </div>
    //                 </div>
    //             </div>
    // )
}