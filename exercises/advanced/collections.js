/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
var Promise = require('bluebird');
var fs = require('fs');
const promiseConstructor = require('../bare_minimum/promiseConstructor');
Promise.promisifyAll(fs);

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  var pluck = promiseConstructor.pluckFirstLineFromFileAsync;

  return Promise.all([
    pluck(filePaths[0]),
    pluck(filePaths[1]),
    pluck(filePaths[2]),
  ])
    .then((resolved) => {
      // console.log(resolved);
      // console.log(JSON.stringify(resolved, null, 2));
      resolved = resolved.join('\n');
      // console.log(resolved);
      // console.log(fs.writeFileAsync(writePath, 'test', 'utf8'));
      return fs.writeFileAsync(writePath, resolved, 'utf8');
    })
    .catch(console.log.bind(console));
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};