const express = require("express");
const router = express.Router();
const {
  listAction,
  viewAction,
  insertAction,
  updateAction,
  deleteAction,
  clearAction,
} = require('./movie.controller');

router.delete('/clear', clearAction);
router.get('/', listAction);
router.get('/:id',viewAction);
router.post('/', insertAction);
router.put('/:id', updateAction);
router.delete('/:id', deleteAction);

module.exports = router;
