const movieModel = require('./movie.model');
const jwt = require('jsonwebtoken'); // [cite: 125]

const EXPIRES_IN = 3600; // 1 Stunde Gültigkeit (in Sekunden)
const PASSWORD = 'secret'; // [cite: 127]
const ALGORITHM = 'HS256'; // [cite: 128]

// --- NEU: Login Aktion ---
function loginAction(request, response) {
    const user = request.body; // [cite: 131]
    movieModel.getUser(user.username, user.password)
        .then(result => {
            // JWT erstellen mit Benutzername als Payload [cite: 135-136]
            const jwtToken = jwt.sign(
                { username: result.username }, 
                PASSWORD, 
                { expiresIn: EXPIRES_IN, algorithm: ALGORITHM }
            );
            response.send({ jwt: jwtToken }); // [cite: 137]
        })
        .catch(error => response.status(401).send('unauthorized')); // [cite: 138]
}

// --- NEU: Nur veröffentlichte Filme (Für nicht angemeldete Benutzer) ---
function publishedAction(request, response) {
    const sort = request.query.sort ? request.query.sort : '';
    // Wir übergeben null für den username, da der Benutzer nicht angemeldet ist
    movieModel.getAll(sort, null)
        .then(movies => response.json(movies))
        .catch(error => response.status(error === 'Database error' ? 500 : 400).json(error));
}

// --- NEU: Filme Importieren ---
function importAction(request, response) {
    // Hier kommt später die Logik für den Datei-Upload (Phase 4)
    // Vorerst schicken wir nur einen leeren 200 OK Status zurück [cite: 874]
    response.status(200).send();
}

// --- ANGEPASSTE AKTIONEN (Nutzen request.auth.username) ---
function listAction(request, response) {
    const sort = request.query.sort ? request.query.sort : '';
    movieModel.getAll(sort, request.auth.username) // 
        .then(movies => response.json(movies))
        .catch(error => response.status(error === 'Database error' ? 500 : 400).json(error));
}

function viewAction(request, response) {
    movieModel.get(request.params.id, request.auth.username)
        .then(movie => response.json(movie))
        .catch(error => response.status(error === 'Database error' ? 500 : 400).json(error));
}

function insertAction(request, response) {
    const movie = {
        id: -1,
        title: request.body.title,
        year: parseInt(request.body.year, 10),
        published: request.body.published === true || request.body.published === "true",
        owner: request.auth.username // Aus JWT [cite: 874]
    };

    movieModel.insert(movie, request.auth.username)
        .then(insertedMovie => response.json(insertedMovie))
        .catch(error => response.status(error === 'Database error' ? 500 : 400).json(error));
}

function updateAction(request, response) {
    const id = parseInt(request.params.id, 10);
    const movie = {
        title: request.body.title,
        year: parseInt(request.body.year, 10),
        published: request.body.published === true || request.body.published === "true",
        owner: request.auth.username // Aus JWT
    };

    movieModel.update(id, movie, request.auth.username)
        .then(updatedMovie => response.json(updatedMovie))
        .catch(error => response.status(error === 'Database error' ? 500 : 400).json(error));
}

function deleteAction(request, response) {
    movieModel.remove(request.params.id, request.auth.username)
        .then(() => response.status(200).send())
        .catch(error => response.status(error === 'Database error' ? 500 : 400).json(error));
}

function clearAction(request, response) {
    movieModel.clear(request.auth.username)
        .then(() => response.status(200).send())
        .catch(error => response.status(error === 'Database error' ? 500 : 400).json(error));
}

module.exports = { 
    listAction, viewAction, insertAction, updateAction, deleteAction, clearAction, loginAction, publishedAction, importAction 
};