const { _ } = require('../higher-order.js');

describe('_.map', () => {
    test('throws a typeError if the provided object to be mapped isn\'t an array', () => {

    });

    test('throws a typeError if the provided mapper isn\'t a function value', () => {

    });

    test('maps an empty array and returns an empty array object', () => {
        let input = [];
        let inputMapper = () => {};
        let expectedOutput = [];

        expect(_.map(input, inputMapper)).toEqual(expectedOutput);
    });

    test('maps every item in the provided array and returns the mapped output', () => {

    });
});
