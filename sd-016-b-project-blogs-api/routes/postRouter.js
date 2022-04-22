 const express = require('express');

 const { 
   create, 
   getAll, 
   getById, 
   update, 
   deletePost, 
   getByTerm,
  } = require('../controllers/postController');

 const authMiddleware = require('../middlewares/authMiddleware');

 const {
  isTitleValid,
  isContentValid,
  isCategoriesValid,
  authorizedField,
 } = require('../middlewares/postMiddleware');

 const route = express();

 route.post('/', isTitleValid, isContentValid, isCategoriesValid, authMiddleware, create);
 route.get('/', authMiddleware, getAll);
 route.get('/search', authMiddleware, getByTerm);
 route.get('/:id', authMiddleware, getById);
 route.put('/:id', isTitleValid,
 isContentValid, authMiddleware, authorizedField, update);
 route.delete('/:id', authMiddleware, deletePost);

module.exports = route;