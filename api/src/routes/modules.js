const axios = require('axios');
const { Dog, Temperament } = require('../db');
const API_KEY = process.env.API_KEY;


const apiData = async() => {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const data = await response.data
    return data
}

const getApiInfo = async()=>{
    const apiInfo = await apiData();
    const dataMap = apiInfo.map((item) => {
        return{
            id: item.id,
            name: item.name,
            image: item.image.url,
            weight: item.weight,
            height: item.height,
            life_span: item.life_span,
            temperament: item.temperament,
        }
    });
    return dataMap;
}

const getDbInfo = async () =>{
    return await Dog.findAll({
        includes:{
            model: Temperament,
            attributes:['name'],
            though:{
                attributes: [],
            },
        }
    })
}

const getDogs = async () => {
    const dbDog = await getDbInfo();
    const apiDog = await getApiInfo();
    const allDog = await apiDog.concat(dbDog);
    return allDog;
}

module.exports = { getDogs, getApiInfo }