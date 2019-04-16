'use strict';

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

describe('_.filter', () => {
    test('throws an error if the filter applier is not a valid function.', () => {
        expect(() => _.filter([1, 2, 3], null)).toThrow(TypeError);
    });

    test('returns an empty array if an empty one is passed to filter', () => {
        const input = [];
        const filterApplier = x => true;
        expect(_.filter(input, filterApplier)).toEqual([]);
    });

    test('filters the passed array based on the passed applier closure.', () => {
        const input = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const filterApplier = x => x > 5;

        expect(_.filter(input, filterApplier)).toEqual([6, 7, 8, 9, 10]);
    });
});

describe('_.reject', () => {
    test('throws an error if the rejection applier is not a valid function.', () => {
        expect(() => _.reject([1], null)).toThrow(TypeError);
    });

    test('returns an empty array if an empty one is passed', () => {
        const input = [];
        const rejectionApplier = x => true;
        expect(_.reject(input, rejectionApplier)).toEqual([]);
    });

    test('filters the passed array based on the passed rejection closure.', () => {
        const input = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const rejectionApplier = x => x > 5;

        expect(_.reject(input, rejectionApplier)).toEqual([0, 1, 2, 3, 4, 5]);
    });
});

describe('_.max', () => {
    test('throws an error if the array is not a valid one.', () => {
        expect(() => _.max(null)).toThrow(TypeError);
    });

    test('returns undefined if an empty array is passed.', () => {
        expect(_.max([])).toEqual(undefined);
    });

    test('returns the largest element out of numbers.', () => {
        expect(_.max([0, 1, 2, 3, 4, 5])).toEqual(5);
    });

    test('returns the largest repeated element out of numbers.', () => {
        expect(_.max([0, 0, 0, 0, 0])).toEqual(0);
    });

    test('returns the largest string out of strings', () => {
        expect(_.max(['s', 'st', 'str', 'string'])).toEqual('string');
    });

    test('returns true element out of booleans.', () => {
        expect(_.max([true, false, true])).toEqual(true);
    });

    test('returns null if null and undefined are compared.', () => {
        expect(_.max([null, undefined, null])).toEqual(null);
    });
});

describe('_.min', () => {
    test('throws an error if the array is not a valid one.', () => {
        expect(() => _.min(null)).toThrow(TypeError);
    });

    test('returns undefined if an empty array is passed.', () => {
        expect(_.min([])).toEqual(undefined);
    });

    test('returns the smallest element out of numbers.', () => {
        expect(_.min([0, 1, 2, 3, 4, 5])).toEqual(0);
    });

    test('returns the smallest repeated element out of numbers.', () => {
        expect(_.min([0, 5, 4, 0, 0])).toEqual(0);
    });

    test('returns the smallest string out of strings', () => {
        expect(_.min(['s', 'st', 'str', 'string'])).toEqual('s');
    });

    test('returns the false element out of booleans.', () => {
        expect(_.min([true, false, true])).toEqual(false);
    });

    test('returns null if null and undefined are compared.', () => {
        expect(_.min([null, undefined, null])).toEqual(null);
    });
});

describe('_.maxBy', () => {
    test('throws an error if the array is not a valid one.', () => {
        expect(() => _.maxBy(null)).toThrow(TypeError);
    });

    test('throws an error if the comparator function isn\'t valid.', () => {
        expect(() => _.maxBy([1, 2], null)).toThrow(TypeError);
    });

    test('returns undefined if an empty array is passed.', () => {
        expect(_.maxBy([], () => true)).toEqual(undefined);
    });

    test('returns the maximum value from the array by using the closure.', () => {
        expect(_.maxBy([{val: 120}, {val: 121}, {val: 20}], element => element.val)).toEqual(121);
    });
});

describe('_.minBy', () => {
    test('throws an error if the array is not a valid one.', () => {
        expect(() => _.minBy(null)).toThrow(TypeError);
    });

    test('throws an error if the comparator function isn\'t valid.', () => {
        expect(() => _.minBy([1, 2], null)).toThrow(TypeError);
    });

    test('returns undefined if an empty array is passed.', () => {
        expect(_.minBy([], () => true)).toEqual(undefined);
    });

    test('returns the minimum value from the array by using the closure.', () => {
        expect(_.minBy([{val: 120}, {val: 121}, {val: 20}], element => element.val)).toEqual(20);
    });
});

describe('_.all', () => {
    test('returns true if the array is empty.', () => {
        expect(_.all([], () => false)).toEqual(true);
    });

    test('throws an error if the array to be checked isn\'t a valid one.', () => {
        expect(() => {
            _.all(null, () => true);
        }).toThrow(TypeError);
    });

    test('throws an error if the accounter argument isn\'t a valid function.', () => {
        expect(() => { 
            _.all([0], null); 
        }).toThrow(TypeError);
    });

    test('returns false if at least one element isn\'t accounted', () => {
        const input = [0, 1, 2, 3, 4, 5];
        const accounterInput = (element) => element !== 0;

        expect(_.all(input, accounterInput)).toEqual(false);
    });

    test('returns true if all elements are accounted', () => {
        const input = [5, 6, 7, 8, 9, 10];
        const accounterInput = (element) => element >= 5;

        expect(_.all(input, accounterInput)).toEqual(true);
    });
});

describe('_.any', () => {
    test('returns true if the array is empty.', () => {
        expect(_.all([], () => false)).toEqual(true);
    });

    test('throws an error if the array to be checked isn\'t a valid one.', () => {
        expect(() => {
            _.any(null, () => true);
        }).toThrow(TypeError);
    });

    test('throws an error if the accounter argument isn\'t a valid function.', () => {
        expect(() => { 
            _.any([0], null); 
        }).toThrow(TypeError);
    });

    test('returns true if any element is accounted', () => {
        const input = [5, 6, 7, 8, 9, 10];
        const accounterInput = (element) => element === 10;

        expect(_.any(input, accounterInput)).toEqual(true);
    });

    test('returns false if no element can be accounted', () => {
        const input = [5, 6, 7, 8, 9, 10];
        const accounterInput = (element) => element < 5;

        expect(_.any(input, accounterInput)).toEqual(false);
    });
});

describe('_.sortBy', () => {
    test('throws an error if an unvalid array is passed.', () => {
        expect(() => _.sortBy()).toThrow(TypeError);
    });

    test('throws an error if the passed callback isn\'t a function', () => {
        expect(() => _.sortBy([0], null)).toThrow(TypeError);
    });

    test('returns an empty array if an empty array is passed.', () => {
        expect(_.sortBy([], val => val)).toEqual([]);
    });
    
    test('it returns an array in sorted order, by using the callback to return the desired value', () => {
        const input = [
            {val: 210},
            {val: 10},
            {val: 2},
            {val: 120}
        ];
        const expectedOutput = [
            {val: 2},
            {val: 10},
            {val: 120},
            {val: 210}
        ];
        expect(_.sortBy(input, element => element.val)).toEqual(expectedOutput);
    });
});

describe('_.sort', () => {
    test('returns an empty array if an empty array is passed.', () => {
        expect(_.sort([])).toEqual([]);
    });

    test('throws an error if an unvalid array is passed.', () => {
        expect(() => _.sort()).toThrow(TypeError);
    });
    
    test('it returns an array in sorted order', () => {
        expect(_.sort([1, 5, 2, 0, 200, 129, 3])).toEqual([0, 1, 2, 3, 5, 129, 200]);
    });

    test('it returns an array of strings in sorted order', () => {
        const input = [
            'a'.repeat(10),
            'a'.repeat(5),
            'a'
        ];
        const expectedOutput = input.reverse();

        expect(_.sort(input)).toEqual(expectedOutput);
    });

    test('it returns an array of booleans in sorted order', () => {
        expect(_.sort([false, true, false])).toEqual([false, false, true]);
    });
});
