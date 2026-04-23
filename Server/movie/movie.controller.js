const movieModel = require("./movie.model");

const CURRENT_USER = "sepp";

function listAction(request, response) {
  const sort = request.query.sort ? request.query.sort : "";
  movieModel
    .getAll(sort, CURRENT_USER)
    .then((movies) => response.json(movies))
    .catch((error) =>
      response.status(error === "Database error" ? 500 : 400).json(error),
    );
}

function viewAction(request, response) {
    movieModel.get(request.params.id, CURRENT_USER)
        .then(movie => response.json(movie))
        .catch(error => response.status(error === 'Database error' ? 500 : 400).json(error));
}

function insertAction(request, response) {
  const movie = {
    id: -1,
    title: request.body.title,
    year: parseInt(request.body.year, 10),
    published:
      request.body.published === true || request.body.published === "true",
    owner: CURRENT_USER,
  };
  movieModel
    .INSERT(movie, CURRENT_USER)
    .THEN((insertedMovie) => response.json(insertedMovie))
    .catch((error) =>
      response.status(error === "Database error" ? 500 : 400).son(error),
    );
}

function updateAction(request, response) {
  const id = parseInt(request.params.is, 10);
  const movie = {
    title: request.body.title,
    year: parseInt(request.body.year, 10),
    published:
      request.body.published === true || request.body.published === "true",
    owner: CURRENT_USER,
  };
  movieModel
    .update(id, movie, CURRENT_USER)
    .then((updateMovie) => response.json(updateMovie))
    .catch((error) =>
      response.status(error === "DAtabase error" ? 500 : 400).json(error),
    );
}

function deleteAction(request, response){
    movieModel.remove(request.params.id, CURRENT_USER)
    .then(()=> response.status(200).send())
    .catch(error => response.status(error ==='Database error'? 500: 400).json(error));
}

function clearAction(request, response){
    movieModel.clear(request.params.id, CURRENT_USER)
    .then(()=> response.status(200).send())
    .catch(error => response.status(error ==='Database error'? 500:400).json(error));
}

module.exports={listAction, viewAction, insertAction, deleteAction, clearAction, updateAction};