const express = require("express");
const router = express.Router();
const { expressjwt } = require("express-jwt");
const {
  listAction,
  viewAction,
  insertAction,
  updateAction,
  deleteAction,
  clearAction,
  loginAction,
  publishedAction,
  importAction
} = require("./movie.controller");

const PASSWORD = "secret";
const ALGORITHM = "HS256";

const checkAuth = expressjwt({ secret: PASSWORD, algorithms: [ALGORITHM] });

// --- ÖFFENTLICHE ROUTEN ---
// WICHTIG: Die Schrägstriche bei /login und /published wurden hinzugefügt!
router.post('/login', loginAction);
router.get('/published', publishedAction);

// --- GESCHÜTZTE ROUTEN ---
router.delete("/clear", checkAuth, clearAction);
router.post("/import", checkAuth, importAction); // <-- Dieser Endpunkt fehlte für Aufgabe 3! 
router.get("/", checkAuth, listAction);
router.get("/:id", checkAuth, viewAction);
router.post("/", checkAuth, insertAction);
router.put("/:id", checkAuth, updateAction);
router.delete("/:id", checkAuth, deleteAction);

module.exports = router;