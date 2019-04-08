const { _ } = require('../higher-order.js');

describe('_.map', () => {
    test('throws a typeError if the provided object to be mapped isn\'t an array', () => {
        let input = null;
        let inputMapper = null;

        expect(() => {
            _.map(input, inputMapper);
        }).toThrow();
    });

    test('throws a typeError if the provided mapper isn\'t a function value', () => {
        let input = [];
        let inputMapper = null;

        expect(() => {
            _.map(input, inputMapper);
        }).toThrow();
    });

    test('maps an empty array and returns an empty array object', () => {
        let input = [];
        let inputMapper = () => {};
        let expectedOutput = [];

        expect(_.map(input, inputMapper)).toEqual(expectedOutput);
    });

    test('maps every item in the provided array and returns the mapped output', () => {
        let input = [0, 1, 2, 3, 4, 5];
        let inputMapper = (value) => {
            let textBarUnit = '#';
            let textBar = ''

            for (let i = 0; i < value; i++) {
                textBar += textBarUnit;
            }

            return textBar;
        }
        let expectedOutput = ['', '#', '##', '###', '####', '#####'];

        expect(_.map(input, inputMapper)).toEqual(expectedOutput);
    });

    test('map passes the current value index as the second argument to the mapper closure', () => {
        let input = ['', '', '', '', ''];
        let mapperInput = (value, index) => {
            return index;
        }
        let expectedOutput = [0, 1, 2, 3, 4];

        expect(_.map(input, mapperInput)).toEqual(expectedOutput);
    });

    test('map passes the source array as the last argument to the mapper closure', () => {
        let input = [0, 1, 2, 3, 4, 5, 6];
        let mapperInput = (value, index, arr) => {
            switch (index) {
                case 0:
                    return '*';
                case arr.length - 1:
                    return '*';
                default:
                    return value;
            }
        }
        let expectedOutput = ['*', 1, 2, 3, 4, 5, '*'];

        expect(_.map(input, mapperInput)).toEqual(expectedOutput);
    });
});

describe('_.reduce', () => {
    test('throws an error if the passed array isn\'t a valid one', () => {

    });

    test('throws an error if the passed reducer isn\'t a valid function', () => {

    });

    test('returns the initial value if the passed array is empty', () => {

    });

    test('throws an error if no initial value is passed and the array to reduce is empty', () => {

    });
});
