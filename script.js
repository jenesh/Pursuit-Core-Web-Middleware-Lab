document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#animal-btn').addEventListener('click', checkAnimal);
    document.querySelector('#random-btn').addEventListener('click', randomNumber);
    document.querySelector('#peek').addEventListener('click', peek);
    document.querySelector('#enqueue').addEventListener('click', enqueue);
    document.querySelector('#dequeue').addEventListener('click', dequeue);
});

const checkAnimal = async () => {
    const animal = document.querySelector('#animal>input');
    const result = await axios.get(`http://localhost:5000/animal/${animal.value}`);
    console.log(result)
    animal.value = '';
    animal.setAttribute('placeholder', result.data.message);
}

const randomNumber = async () => {
    const floor = document.querySelector('#floor')
    const ceil = document.querySelector('#ceil')
    const result = await axios.get(`http://localhost:5000/random/${floor.value}/${ceil.value}`);
    floor.value = '';
    ceil.value = '';
    floor.setAttribute('placeholder', result.data.randPick);
    ceil.setAttribute('placeholder', result.data.randPick);
}

const peek = async () => {
    const result = await axios.get(`http://localhost:5000/queue/peek`);
    console.log(result);
    document.querySelector('#queue-input').setAttribute('placeholder', result.data.data);
}

const enqueue = async () => {
    const input = document.querySelector('#queue-input')
    const result = await axios.get(`http://localhost:5000/queue/enqueue?name=${input.value}`);
    console.log(result);
    document.querySelector('#queue-input').setAttribute('placeholder', result.data.data);
}

const dequeue = async () => {
    const result = await axios.get(`http://localhost:5000/queue/dequeue`);
    console.log(result);
    document.querySelector('#queue-input').setAttribute('placeholder', result.data.data);
}