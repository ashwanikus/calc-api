// index.js
const express = require('express');
const { add, subtract, multiply, divide, percentage } = require('./calculator');

const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send("Arithmatic operation api.")
});


app.get('/api/calculate/:operation', (req, res) => {
    const { operation } = req.params;
    const { a, b } = req.query;
    
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (isNaN(numA) || isNaN(numB)) {
        return res.status(400).send('Invalid numbers provided');
    }

    try {
        let result;
        switch (operation) {
            case 'add':
                result = add(numA, numB);
                break;
            case 'subtract':
                result = subtract(numA, numB);
                break;
            case 'multiply':
                result = multiply(numA, numB);
                break;
            case 'divide':
                result = divide(numA, numB);
                break;
            case 'percentage':
                result = percentage(numA, numB);
                break;
            default:
                return res.status(400).send('Invalid operation');
        }
        res.send({ result });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
