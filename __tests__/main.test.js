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

    test('maps every item in the provided array based on its index', () => {
        let input = ['', '', '', '', ''];
        let mapperInput = (value, index) => {
            return index;
        }
        let expectedOutput = [0, 1, 2, 3, 4];

        expect(_.map(input, mapperInput)).toEqual(expectedOutput);
    });
});
