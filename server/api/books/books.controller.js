/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/books              ->  index
 * POST    /api/books              ->  create
 * GET     /api/books/:id          ->  show
 * PUT     /api/books/:id          ->  upsert
 * PATCH   /api/books/:id          ->  patch
 * DELETE  /api/books/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Books from './books.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Bookss
export function index(req, res) {
  return Books.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Books from the DB
export function show(req, res) {
  var books = new Books({ ownerId: req.params.id });

  if (req.params.id === 'count') 
    return Books.count().exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  else
    return books.findByUser().lean().exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
      
}

// Creates a new Books in the DB
export function create(req, res) {
  return Books.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Books in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Books.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Books in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Books.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Books from the DB
export function destroy(req, res) {
  return Books.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
