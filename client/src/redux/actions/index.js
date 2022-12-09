import axios from 'axios';


export function getAllDogs(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/dogs'); 
        return dispatch({
            type: 'GET_ALL_DOGS',
            payload: json.data
        })
    }};

export function getDetail(id){
    return async function(dispatch){
        let json = await axios.get(`http://localhost:3001/dogs/${id}`)
        console.log(json);
        return dispatch({
            type: 'GET_DETAIL',
            payload: json.data
        })
    }};

export function getNameDog(name){
    return async function(dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            return dispatch({
                type: 'GET_NAME_DOG',
                paload: json.data
            })
            
        } catch (error) {
            console.log('ERROR',error);
        }
    }
}

export function getTemperaments(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/temperaments');
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        })
}};

export function orderByName (payload) {
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
};

export function filterByValue (payload){
    return {
        type: 'FILTER_BY_VALUE',
        payload
    }
}

export function createDog (payload){
    return async function (dispatch){
        let response = await axios.post(`http://localhost3001/dogs`, payload);
        console.log(response);
        return dispatch ({
            type:'CREATE_DOG',
            payload
        });
    }
}