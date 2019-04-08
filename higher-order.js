
/**
 * The root object of the library containing the higher-order functions.
 */
const _ = {
    /**
     * Given an array and a reducer function, returns the single value from calling 
     * reducer on each element of the array and accumulating the result.
     * @param {Array} arr 
     * @param {Function} reducer 
     * @param {Any} initialValue 
     */
    reduce: function(arr, reducer, initialValue) {
        if (typeof arr != 'object' || !(arr instanceof Array)) {
            throw new TypeError('The passed array argument must be a valid one.');
        }

        if (typeof reducer != 'function') {
            throw new TypeError('The passed reducer argument must be avalid function.');
        }

        let result = initialValue || arr[0];

        if (arr.length == 0 && !result) {
            throw new Error('If the passed array argument is empty, an initial value argument must be provided.');
        }

        for (let i = 0; i < arr.length; i++) {
            result = reducer(result, arr[i]);
        }

        return result;
    },

    /**
     * Given an array and a mapper closure, returns a transformed array based the mapper being applied to each original array elements.
     * @param {Array} arr - The array to be mapped into another array of mapped values. 
     * @param {Function} mapper - The function being applied to map each value of the original array.
     * @returns {Array} mappedArray - The mapped array.
     */
    map: function(arr, mapper) {
        if (typeof arr != 'object' || !Array.isArray(arr)) {
            throw new TypeError('The passed array to be mapped must be a valid one.');
        }

        if (typeof mapper != 'function') {
            throw new TypeError('The passed mapper closure must be a valid one.');
        }

        let mapped = [];

        for (let i = 0; i < arr.length; i++) {
            mapped.push(mapper(arr[i], i, arr));
        }

        return mapped;
    }
}

module.exports = { _ };