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
     * Given an array of length n, calls callback n times and passes the value of the current iteration to callback, 
     * the current index, and the array.
     * @param {Array} arr 
     * @param {Function} callback 
     */
    each: function(arr, callback) {
        guardArray(arr);
        guardFunction(callback);

        for (let i = 0; i < arr.length; i++) {
            callback(arr[i], i, arr);
        }
    },

    /**
     * Given an array and a reducer function, returns the single value from calling 
     * reducer on each element of the array and accumulating the result.
     * @param {Array} arr - the array to be reduced to a single value.
     * @param {Function} callback - the function in charge of reducing the passed arguments to a single value.
     * @param {Any} initialValue - the optional initial value of the reduction
     */
    reduce: function(arr, callback, initialValue) {
        guardArray(arr);
        guardFunction(callback);

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
            result = callback(result, arr[i], i, arr);
        }

        return result;
    },

    /**
     * Given an array and a callback, returns a transformed array based on the callback being applied to each original array elements.
     * @param {Array} arr - The array to be mapped into another array of mapped values. 
     * @param {Function} callback - The function being applied to map each value of the original array.
     * @returns {Array} mappedArray - The mapped array.
     */
    map: function(arr, callback) {
        guardFunction(callback);
        
        return this.reduce(arr, (previous, current, index, array) => {
            previous.push(callback(current, index, array));
            return previous;
        }, []);
    },

    /**
     * Given an array and a callback, runs the callback on each element and returns an array with the filtered elements.
     * @param {Array} arr - The array to be filtered.
     * @param {Function} callback - The function in charge of deciding if a value should be included in the filtered array.
     * @returns {Array} filteredArray - The filtered array.
     */
    filter: function(arr, callback) {
        guardFunction(callback);
        
        return this.reduce(arr, (previous, element) => {
            if (callback(element)) {
                previous.push(element);
            }

            return previous;
        }, []);
    },

    /**
     * Given an array and filter, returns a new array with elements of the original array that don't apply to the callback.
     * @param {Array} arr - The array to be filtered.
     * @param {Function} callback - The function in charge of deciding if a value should be included in the filtered array.
     * @returns {Array} filteredArray - The filtered array.
     */
    reject: function(arr, callback) {
        return this.filter(arr, (val) => !callback(val));
    },

    /**
     * Given an array and a closure, runs the closure in each element and returns the criterion by which the element is 
     * ranked as the maximum value.
     * @param {Array} arr - the array with the elements to be compared.
     * @param {Function} callback - the function in charge of returning the criterion by which the element is ranked as the maximum value.
     */
    maxBy: function(arr, callback) {
        guardFunction(callback);

        if (arr.length === 0) {
            return undefined;
        }

        return this.reduce(arr, (previous, current) => {
            const previousValue = callback(previous);
            const currentValue = callback(current);            

            return previousValue > currentValue ? previous : current;
        });
    },

    /**
     * Given an array and a closure, runs the closure in each element and returns the criterion by which the element is 
     * ranked as the minimum value.
     * @param {Array} arr - the array with the elements to be compared.
     * @param {Function} callback - the function in charge of returning the criterion by which the element is ranked as the minimum value.
     */
    minBy: function(arr, callback) {
        guardFunction(callback);

        if (arr.length === 0) {
            return undefined;
        }

        return this.reduce(arr, (previous, current) => {
            const previousValue = callback(previous);
            const currentValue = callback(current);

            return previousValue < currentValue ? previous : current;
        });
    },

    /**
     * Given an array, returns the largest element of it.
     * @param {Array} arr - the array with the elements to be compared.
     */
    max: function(arr) {
        return this.maxBy(arr, val => val);
    },

    /**
     * Given an array, returns the smallest element of it.
     * @param {Array} arr - the array with the elements to be compared.
     */
    min: function(arr) {
        return this.minBy(arr, val => val)
    },

    /**
     * Given an unsorted array and a callback, runs the closure in each element to get its value to rank and sort the array.
     * @param {Array} arr - the with the elements to be sorted.
     * @param {Function} callback - the function in charge of returning the criterion by which the element is ranked in the sort.
     * @returns {Array} - the sorted array.
     */
    sortBy: function(arr, callback) {
        guardFunction(callback);

        const arrCopy = arr.slice();

        return this.reduce(arr, (previous) => {
            const minimum = this.minBy(arrCopy, callback);

            arrCopy.splice(arrCopy.indexOf(minimum), 1);
            previous.push(minimum)

            return previous;
        }, []);
    },

    /**
     * Given an unsorted array, returns the same array with its elements in a sorted order.
     * @param {Array} arr - the with the elements to be sorted.
     * @returns {Array} - the sorted array.
     */
    sort: function(arr) {
        return this.sortBy(arr, val => val);
    },

    /**
     * Given an array and a function, runs the given function on every element and returns true if all elements are accounted.
     * Given an array and a callback, runs the given callback on every element and returns true if all elements are accounted.
     * @param {Array} arr - The array to be checked.
     * @param {Function} callback - The function in charge of checking if a value should be considered.
     * @returns {Boolean} - The result of applying accounter on every element.
     */
    all: function(arr, callback) {
        guardFunction(callback);

        return this.reduce(arr, (previous, current) => {
            return previous && callback(current);
        }, true)
    },

    /**
     * Given an array and a callback, runs the given callback on every element and returns true if any element can be accounted.
     * @param {Array} arr - The array to be checked.
     * @param {Function} callback - The function in charge of checking if a value should be considered.
     * @returns {Boolean} - returns true if any element in the array is accounted.
     */
    any: function(arr, callback) {
        guardArray(arr);
        guardFunction(callback);

        if (arr.length === 0) {
            return true;
        }

        return this.reduce(arr, (previous, current) => {
            return previous || callback(current);
        }, false);
    },

    /**
     * Given an array of functions, returns a function that composes them by successively 
     * calling each one and passing the result of the previous to the next.
     * @param {Array} arr - the array containing the functions to be composed.
     */
    flow: function(arr) {
        guardArray(arr);

        return function() {
            return this.reduce(arr, (previous, current) => {
                return current(previous);
            }, arr.shift().apply(this, arguments));
        }.bind(this);
    }
}

module.exports = { _ };
