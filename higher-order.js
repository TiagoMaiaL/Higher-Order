
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
        if (!Array.isArray(arr)) {
            throw new TypeError('The passed array argument must be a valid one.');
        }

        if (typeof reducer != 'function') {
            throw new TypeError('The passed reducer argument must be avalid function.');
        }

        if (arr.length == 0 && !initialValue) {
            throw new Error('If the passed array argument is empty, an initial value argument must be provided.');
        }

        // If there's an initial value, the current value to reduce should be the first array value.
        let i = 0
        let result;

        // If there's an initial value, it's used in the reduction, and reduce starts at index 0.
        if (initialValue !== null && initialValue !== undefined) {
            result = initialValue;
        } else {
            // Otherwise, reduce uses the two first arguments as values:
            i = 1;
            result = arr[0];
        }

        for (; i < arr.length; i++) {
            result = reducer(result, arr[i], i, arr);
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
        if (typeof mapper != 'function') {
            throw new TypeError('The passed mapper closure must be a valid one.');
        }

        return this.reduce(arr, (previous, current, index, array) => {
            previous.push(mapper(current, index, array));
            return previous;
        }, []);
    }
}

module.exports = { _ };
