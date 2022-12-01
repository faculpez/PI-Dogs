const { Router, } = require('express');
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const API_KEY = process.env.API_KEY
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

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

const getAllDogs = async () => {
    const dbDog = await getDbInfo();
    const apiDog = await getApiInfo();
    const allDog = apiDog.concat(dbDog);
    return allDog;
}


router.get('/', async (req,res) => {
    let aaa = await getAllDogs()
    console.log(aaa);
    res.send(aaa)
})


router.get('/dogs', async (req,res) => {
    const name = req.query.name
    const response = await getAllDogs();
    if(name){
        let dogName = await response.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
        res.status(200).json(dogName) :
        res.status(404).send('Perro no encontrado');
    }else{
        res.status(200).send(response);
    }
});


router.post('/dogs', async (req,res) => {
    try {
        const { name, image, weight, height, life_span, temperament } = req.body;
        await Dog.create({name, image, weight, height, life_span, temperament});
        res.status(201).send('Creado con exito.');
        console.log();
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.get('/temperaments', async (req,res) => {
    const api = await getApiInfo();
    const apiInfo= await api
    const temps = await apiInfo.map((i) => i.temperament);
    const tempEach = temps.reduce((prev, curr, index) =>{
        if(index === 1 ){
            prev = prev.split(",");
        }
        if(!curr){
            return prev
        }
        const currToArray = curr.split(',');
        
        currToArray.forEach((item) => {
            if(!prev.includes(item)){
                prev.push(item)
        }});
        return prev;
    })
        tempEach.forEach( (e) => {
            Temperament.findOrCreate({
            where : { name: e }
        })
    });
    const allTemps = await Temperament.findAll();
    res.status(200).send(allTemps);
});


module.exports = router;
