/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/book-search/:id          ->  show
 */

'use strict';

var books = require('google-books-search');
const maxResults = 10;
const maxDescr = 100;

/* Function to retrieve book information from Google API */
function getBooks(bookToSearch){
  console.log("Received request to find book: "+bookToSearch);
  var options = {limit: maxResults};

  return new Promise((resolve, reject) => {
    books.search(bookToSearch, options, function(err, res) {
      if (err) return reject("Could not retrieve book info");

      // Filter recieved data
      var bookResult = [];
      for (var i = 0; i< res.length; i++){

        // Only accept books with description
        if (res[i].hasOwnProperty('description')){

          var shortDescr = '';
          if (res[i].description.length > maxDescr)
            shortDescr = res[i].description.substr(0, maxDescr) +'...';
          else
            shortDescr = res[i].description;

          bookResult.push({
            title: res[i].title,
            authors: res[i].authors,
            publishedDate: res[i].publishedDate,
            description: shortDescr,
            descriptionFull: res[i].description,
            categories: res[i].categories,
            averageRating: res[i].averageRating,
            thumbnail: res[i].thumbnail,
            allowAdd: "1" // This is for FE.. in PROD it would indicate if user already has book (to be done later)
          
          });
        }
      }
      return resolve(bookResult);
    });
  });
}; 

// Endpoint to search the google API for user requested books
export function show(req, res) {
  return getBooks(req.params.id)
    .then(respondWithResult(res))
    .catch(handleError(res));
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}