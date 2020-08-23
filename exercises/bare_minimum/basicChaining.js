/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');

var nodeStyle = require('./callbackReview.js');
Promise.promisifyAll(nodeStyle);
Promise.promisifyAll(fs);

const myFunctions = require('./promisification.js');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return nodeStyle.pluckFirstLineFromFileAsync(readFilePath)
    .then((firstLine) => firstLine) //(1)
    .then((gitHubHandle) => {
      return myFunctions.getGitHubProfileAsync(gitHubHandle);
    }) //(2)
    .then((body) => {
      stringbody = JSON.stringify(body);
      return fs.writeFileAsync(writeFilePath, stringbody, 'utf8');
    }); //(3)
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
