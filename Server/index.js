const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const movieRouter = require('./movie/movie.router.js');
app.use('/movie', movieRouter);
app.get('/', (request, response) => response.redirect('/movie'));
app.use ((error, request, response,next)=>{
    if(error.name ==='UnauthorizedError'){
        response.status(401).send(error);
    }else{
        response.status(500).send(error);
    }
});

app.listen(8080,() => console.log('Web-Service listens on port 8080'));