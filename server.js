const express = require('express');
const cors = require('cors');
const body = require('body-parser');

const app = express();

app.use(cors());
app.use(body.urlencoded({extended: false}));

const animalArr = ['lion', 'penguin', 'bear', 'zebra', 'tiger', 'shark'];

const animalExists = (req, res, next) => {
    const animal = req.params.name;
    if (animalArr.includes(animal)) {
        res.status(200).json({
            status: 'success',
            message: true
        })
    } else {
        res.status(200).json({
            status: 'success',
            message: false
        })
    }
}

const randomNumber = (req, res, next) => {
    const floor = Number(req.params.floor);
    const ceil = Number(req.params.ceil);
    const num = generateSpread(floor, ceil);

    res.status(200).json({
        status: 'success',
        range: [floor, ceil],
        randPick: num
    })
}

const generateSpread = (floor, ceil) => {
    let arr = [];
    for (let i = floor; floor < ceil; i++) {
        arr.push(i);
        floor++;
    }
    let num = Math.floor(Math.random() * arr.length);
    return arr[num];
}

const queue = ['john', 'cena', 'mike', 'blake', 'jake'];

const peek = (req, res, next) => {
    if (req.params.method === 'peek') {
        res.status(200).json({
            status: 'success',
            data: queue[queue.length - 1]
        })
    } else {
        next();
    }
}

const enqueue = (req, res, next) => {
    if (req.params.method === 'enqueue') {
        queue.push(req.query.name)
        res.status(200).json({
            status: 'success',
            data: queue[0]
        })
    } else {
        next();
    }
}

const dequeue = (req, res, next) => {
    if (req.params.method === 'dequeue') {
        res.status(200).json({
            status: 'success',
            data: queue[queue.length - 1]
        })
    } else {
        next();
    }
}

app.get('/animal/:name', animalExists);

app.get('/random/:floor/:ceil', randomNumber);

app.get('/queue/:method', peek, enqueue, dequeue);

const port = 5000;

app.listen(port, () => {
    console.log(`Live at http://localhost:${port}`);
})