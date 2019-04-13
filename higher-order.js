'use strict';

const guardType = typeIdentifier => errorMessage => value => { 
    if (typeof value !== typeIdentifier) {
        throw new TypeError(errorMessage) 
    }
};
const guardObjectType = objectValidator => errorMessage => object => { 
    if (!objectValidator(object)) {
        throw new TypeError(errorMessage);
    }
}

/**
 * Given a value, checks if its a valid function and throws an error if it isn't.
 * @param {Function} function - the function to be checked.
 */
const guardFunction = guardType('function')('The passed argument must be a valid function.');

/**
 * Given a value, checks if it's a valid array and throws an error if it isn't.
 * @param {Array} arr - the array to be checked.
 */
const guardArray = guardObjectType((array) => Array.isArray(array))('The passed argument must be a valid array.');

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
        guardArray(arr);
        guardFunction(reducer);

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
        guardFunction(mapper);
        
        return this.reduce(arr, (previous, current, index, array) => {
            previous.push(mapper(current, index, array));
            return previous;
        }, []);
    },

    /**
     * Given an array and a closure applying a filter, returns an array with the filtered elements of the original passed array.
     * @param {Array} arr - The array to be filtered.
     * @param {Function} filterApplier - The function in charge of deciding if a value should be included in the filtered array.
     * @returns {Array} filteredArray - The filtered array.
     */
    filter: function(arr, filterApplier) {
        guardFunction(filterApplier);
        
        return this.reduce(arr, (previous, element) => {
            if (filterApplier(element)) {
                previous.push(element);
            }

            return previous;
        }, []);
    },

    /**
     * Given an array and filter, returns a new array with elements of the original array that don't apply to the rejection closure.
     * @param {Array} arr - The array to be filtered.
     * @param {Function} rejectionApplier - The function in charge of deciding if a value should be included in the filtered array.
     * @returns {Array} filteredArray - The filtered array.
     */
    reject: function(arr, rejectionApplier) {
        return this.filter(arr, (val) => !rejectionApplier(val));
    },

    /**
     * Given an array, returns the largest element of it.
     * @param {Array} arr - the array with the elements to be compared.
     */
    max: function(arr) {
        if (arr.length === 0) {
            return undefined;
        }

        return this.reduce(arr, (previous, current) => previous > current ? previous : current);
    },

    /**
     * Given an array, returns the smallest element of it.
     * @param {Array} arr - the array with the elements to be compared.
     */
    min: function(arr) {
        
    },

    /**
     * Given an array and a function, runs the given function on every element and returns true if all elements are accounted.
     * @param {Array} arr - The array to be checked.
     * @param {Function} accounter - The function in charge of checking if a value should be considered.
     * @returns {Boolean} - The result of applying accounter on every element.
     */
    all: function(arr, accounter) {
        guardArray(arr);
        
        if (arr.length === 0) {
            return false;
        }

        guardFunction(accounter);

        return this.reduce(arr, (previous, current) => {
            return previous && accounter(current);
        }, true)
    },

    /**
     * Given an array and a function, runs the given function on every element and returns true if any element can be accounted.
     * @param {Array} arr - The array to be checked.
     * @param {Function} accounter - The function in charge of checking if a value should be considered.
     * @returns {Boolean} - returns true if any element in the array is accounted.
     */
    any: function(arr, accounter) {
        guardArray(arr);
        guardFunction(accounter);

        return this.reduce(arr, (previous, current) => {
            return previous || accounter(current);
        }, false)
    }

}

module.exports = { _ };
