// You should only use the `new Promise` constructor from bluebird
var Promise = require('bluebird');

/**
 * Return a function that wraps `nodeStyleFn`. When the returned function is invoked,
 * it will return a promise which will be resolved or rejected, depending on
 * the execution of the now-wrapped `nodeStyleFn`
 *
 * In other words:
 *   - If `nodeStyleFn` succeeds, the promise should be resolved with its results
 *   - If nodeStyleFn fails, the promise should be rejected with the error
 *
 * Because the returned function returns a promise, it does not and should not
 * expect a callback function as one of its arguments
 */

var promisify = function(nodeStyleFn) {
  return (...args) => {
    // console.log(args);
    return new Promise(function (resolve, reject) {
      customCallback = (err, ...results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length === 1 ? results[0] : results);
        }
      };
      args.push(customCallback);
      // console.log(args);
      nodeStyleFn.call(this, ...args);
    });
  };
};


/**
 * Given an array which contains promises, return a promise that is
 * resolved if and when all the items in the array are resolved.
 *
 * The promise's resolve value should be an array that maps to the
 * respective positions in the original array of promises.
 *
 * If any promise in the array rejects, the returned promise
 * is rejected with the rejection reason.
 */

var all = function(arrayOfPromises) {
  let resultArr = [];
  let completedPromises = 0;

  return new Promise(function (resolve, reject) {
    arrayOfPromises.forEach((promise, index) => {
      promise
        .then(value => {
          resultArr[index] = value;
          completedPromises += 1;
          if (completedPromises === arrayOfPromises.length) {
            resolve(resultArr);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  });
};

// var all = function(arrayOfPromises) {
//   let resultArr = [];

//   let merged = arrayOfPromises.reduce(
//     (accumulator, promise) => {
//       return accumulator
//         .then(() => {
//           return promise;
//         })
//         .then((result) => {
//           return resultArr.push(result);
//         });
//     },
//     Promise.resolve(null)
//   );

//   return merged
//     .then(() => {
//       return resultArr;
//     });
// };


/**
 * Given an array of promises, return a promise that is resolved or rejected,
 * resolving with whatever the resolved value or rejection reason was from
 * the first to be resolved/rejected promise in the passed-in array
 */

var race = function(arrayOfPromises) {
  return new Promise(function (resolve, reject) {
    arrayOfPromises.forEach(promise =>
      promise
        .then(resolve)
        .catch(reject)
    );
  });
};

// Export these functions so we can unit test them
module.exports = {
  all: all,
  race: race,
  promisify: promisify
};
