
/**
 * The root object of the library containing the higher-order functions.
 */
const _ = {
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