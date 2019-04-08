const { _ } = require('../higher-order.js');

describe('_.map', () => {
    test('throws a typeError if the provided object to be mapped isn\'t an array', () => {
        const input = null;
        const inputMapper = null;

        expect(() => {
            _.map(input, inputMapper);
        }).toThrow();
    });

    test('throws a typeError if the provided mapper isn\'t a function value', () => {
        const input = [];
        const inputMapper = null;

        expect(() => {
            _.map(input, inputMapper);
        }).toThrow();
    });

    test('maps an empty array and returns an empty array object', () => {
        const input = [];
        const inputMapper = () => {};
        const expectedOutput = [];

        expect(_.map(input, inputMapper)).toEqual(expectedOutput);
    });

    test('maps every item in the provided array and returns the mapped output', () => {
        const input = [0, 1, 2, 3, 4, 5];
        const inputMapper = (value) => {
            const textBarUnit = '#';
            let textBar = ''

            for (let i = 0; i < value; i++) {
                textBar += textBarUnit;
            }

            return textBar;
        }
        const expectedOutput = ['', '#', '##', '###', '####', '#####'];

        expect(_.map(input, inputMapper)).toEqual(expectedOutput);
    });

    test('map passes the current value index as the second argument to the mapper closure', () => {
        const input = ['', '', '', '', ''];
        const mapperInput = (value, index) => index;
        const expectedOutput = [0, 1, 2, 3, 4];

        expect(_.map(input, mapperInput)).toEqual(expectedOutput);
    });

    test('map passes the source array as the last argument to the mapper closure', () => {
        const input = [0, 1, 2, 3, 4, 5, 6];
        const mapperInput = (value, index, arr) => {
            switch (index) {
                case 0:
                    return '*';
                case arr.length - 1:
                    return '*';
                default:
                    return value;
            }
        }
        const expectedOutput = ['*', 1, 2, 3, 4, 5, '*'];

        expect(_.map(input, mapperInput)).toEqual(expectedOutput);
    });
});

describe('_.reduce', () => {
    test('throws an error if the passed array isn\'t a valid one', () => {
        const input = null;
        const reducerInput = (previous, current) => previous + current;

        expect(() => {
            _.reduce(input, reducerInput);
        }).toThrow();
    });

    test('throws an error if the passed reducer isn\'t a valid function', () => {
        const input = [0, 1, 2, 3, 4, 5];
        const reducerInput = null;

        expect(() => {
            _.reduce(input, reducerInput);
        }).toThrow();
    });

    test('returns the initial value if the passed array is empty', () => {
        const input = [];
        const reducerInput = () => {};
        const initialValueInput = 'this should be returned.';

        expect(_.reduce(input, reducerInput, initialValueInput)).toEqual(initialValueInput);
    });

    test('throws an error if no initial value is passed and the array to reduce is empty', () => {
        const input = [];
        const reducerInput = () => {};
        
        expect(() => {
            _.reduce(input, reducerInput);
        }).toThrow();
    });
});
