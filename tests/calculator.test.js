// tests/calculator.test.js
const { add, subtract, multiply, divide, percentage } = require('../calculator');

describe('Calculator', () => {
    test('adds two numbers', () => {
        expect(add(1, 2)).toBe(3);
    });

    test('subtracts two numbers', () => {
        expect(subtract(5, 3)).toBe(2);
    });

    test('multiplies two numbers', () => {
        expect(multiply(4, 3)).toBe(12);
    });

    test('divides two numbers', () => {
        expect(divide(10, 2)).toBe(5);
    });

    test('throws an error when dividing by zero', () => {
        expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
    });

    test('calculates percentage', () => {
        expect(percentage(50, 200)).toBe(25);
    });
});

