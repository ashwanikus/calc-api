const supertest = require('supertest');
const express = require('express');
const { add, subtract, multiply, divide, percentage } = require('../calculator');
const app = express();

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

describe('API /api/calculate/:operation', () => {
    test('GET /api/calculate/add?a=1&b=2', async () => {
        const response = await supertest(app).get('/api/calculate/add').query({ a: 1, b: 2 });
        expect(response.statusCode).toBe(200);
        expect(response.body.result).toBe(3);
    });

    test('GET /api/calculate/subtract?a=5&b=3', async () => {
        const response = await supertest(app).get('/api/calculate/subtract').query({ a: 5, b: 3 });
        expect(response.statusCode).toBe(200);
        expect(response.body.result).toBe(2);
    });

    test('GET /api/calculate/multiply?a=4&b=3', async () => {
        const response = await supertest(app).get('/api/calculate/multiply').query({ a: 4, b: 3 });
        expect(response.statusCode).toBe(200);
        expect(response.body.result).toBe(12);
    });

    test('GET /api/calculate/divide?a=10&b=2', async () => {
        const response = await supertest(app).get('/api/calculate/divide').query({ a: 10, b: 2 });
        expect(response.statusCode).toBe(200);
        expect(response.body.result).toBe(5);
    });

    test('GET /api/calculate/divide?a=10&b=0', async () => {
        const response = await supertest(app).get('/api/calculate/divide').query({ a: 10, b: 0 });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Cannot divide by zero');
    });

    test('GET /api/calculate/percentage?a=50&b=200', async () => {
        const response = await supertest(app).get('/api/calculate/percentage').query({ a: 50, b: 200 });
        expect(response.statusCode).toBe(200);
        expect(response.body.result).toBe(25);
    });

    test('GET /api/calculate/invalid?a=1&b=2', async () => {
        const response = await supertest(app).get('/api/calculate/invalid').query({ a: 1, b: 2 });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Invalid operation');
    });

    test('GET /api/calculate/add?a=foo&b=2', async () => {
        const response = await supertest(app).get('/api/calculate/add').query({ a: 'foo', b: 2 });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Invalid numbers provided');
    });
});

