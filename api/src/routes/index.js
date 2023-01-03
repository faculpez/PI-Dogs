const { Router, } = require('express');
const { Dog, Temperament } = require('../db');
const { getDogs, getApiInfo } = require('./modules');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req,res) => {
    const name = req.query.name
    let response = await getDogs();
    if(name){
        try {
            let dogName = await response.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
        res.status(200).json(dogName) 
    } catch (error) {
        res.status(404).send('Perro no encontrado');
        }
    }else{
        res.status(200).send(response);
    }
});


router.post('/dogs', async (req,res) => {
    try {
        const { name, image, weight, height, life_span, temperament } = req.body;
        await Dog.create({name, image, weight, height, life_span, temperament});
        res.status(201).send('Creado con exito.');
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
            prev = prev.split(', '); 
        }
        if(!curr){
            return prev
        }
        const currToArray = curr.split(', ');
        
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

router.get('/dogs/:id', async (req,res) => {
    const id = req.params.id;
    const dogsTotal = await getDogs();
    if(id){
        let dogId = await dogsTotal.filter(item => item.id === id)
        dogId.length?
        res.status(200).send(dogId) :
        res.status(404).send('Perro no encontrado')
    }
})


module.exports = router;
