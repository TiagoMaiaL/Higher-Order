const { _ } = require('../higher-order.js');

describe('_.reduce', () => {
    test('throws an error if the passed array isn\'t a valid one', () => {
        const input = null;
        const reducerInput = (previous, current) => previous + current;

        expect(() => {
            _.reduce(input, reducerInput);
        }).toThrow(TypeError);
    });

    test('throws an error if the passed reducer isn\'t a valid function', () => {
        const input = [0, 1, 2, 3, 4, 5];
        const reducerInput = null;

        expect(() => {
            _.reduce(input, reducerInput);
        }).toThrow(TypeError);
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
        }).toThrow(Error);
    });

    test('reduces an array into a value',() => {
        const input = [0, 1, 2, 3, 4, 5];
        const reducerInput = (previous, current) => previous + current;
        const expectedOutput = 15;

        expect(_.reduce(input, reducerInput)).toEqual(expectedOutput);
    });

    test('reduce passes the index argument into the reducer callback', () => {
        const input = [0, 1, 2, 3];
        const reducerInput = (previous, current, index) => previous + (current * index);
        const expectedOutput = 14;

        expect(_.reduce(input, reducerInput)).toEqual(expectedOutput);
    });

    test('reduce passes the array argument into the reducer callback', () => {
        const input = [0, 1, 2, 3];
        const reducerInput = (previous, current, index, array) => {
            // Sum only the values between the beginning and end of the array. 
            return (index == 0 || index == array.length - 1) ? previous : previous + current;
        };
        const expectedOutput = 3;

        expect(_.reduce(input, reducerInput)).toEqual(expectedOutput);
    });

    test('reduce passes the 1st and 2nd array values to the reducer in the first run, if the initial value is null', () => {
        const input = [5, 6, 7, 8];
        const reducerInput = (previous, current) => previous + current;
        const expectedOutput = 26;

        expect(_.reduce(input, reducerInput)).toEqual(expectedOutput);
    });

    test('reduce passes the initial value and the 1st array value to the reducer in the first run, if the initial value is provided', () => {
        const input = [5, 6, 7, 8];
        const reducerInput = (previous, current) => previous + current;
        const initialValueInput = 4;
        const expectedOutput = 30;

        expect(_.reduce(input, reducerInput, initialValueInput)).toEqual(expectedOutput);
    });

    test('reduce uses the initial value unless it\'s undefined or null', () => {
        const input = [true];
        const reducerInput = (x, y) => x && y;
        const initialValueInput = false;

        expect(_.reduce(input, reducerInput, initialValueInput)).toEqual(false);
    });
});

describe('_.map', () => {
    test('throws a typeError if the provided object to be mapped isn\'t an array', () => {
        const input = null;
        const inputMapper = null;

        expect(() => {
            _.map(input, inputMapper);
        }).toThrow(TypeError);
    });

    test('throws a typeError if the provided mapper isn\'t a function value', () => {
        const input = [];
        const inputMapper = null;

        expect(() => {
            _.map(input, inputMapper);
        }).toThrow(TypeError);
    });

    test('maps an empty array and returns an empty array object', () => {
        const input = [];
        const inputMapper = () => {};
        const expectedOutput = [];

        expect(_.map(input, inputMapper)).toEqual(expectedOutput);
    });

    test('maps every item in the provided array and returns the mapped output', () => {
        const input = [0, 1, 2, 3, 4, 5];
        const inputMapper = (length) => '#'.repeat(length);
        const expectedOutput = ['', '#', '##', '###', '####', '#####'];

        expect(_.map(input, inputMapper)).toEqual(expectedOutput);
    });

    test('map passes the current value index as the second argument to the mapper closure', () => {
        const input = ['', '', '', '', ''];
        const mapperInput = (_value, index) => index;
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
