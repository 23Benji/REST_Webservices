// Temporäre Mock-Datenbank für Aufgabe 1, bis die MySQL-Anbindung steht
let movies = [
    { id: 1, title: 'Iron Man', year: 2008, published: true, owner: 'sepp', fullname: 'Sepp Hintner' },
    { id: 2, title: 'Thor', year: 2011, published: true, owner: 'Resi Rettich', fullname: 'Resi Rettich' },
    { id: 3, title: 'Captain America', year: 2001, published: false, owner: 'sepp', fullname: 'Sepp Hintner' }
];
let nextId = 4;

async function getAll(sort = null, username = null) {
    return new Promise((resolve, reject) => {
        let result = movies.filter(m => m.owner === username || m.published === true);
        
        if (sort === 'asc') result.sort((a, b) => a.title.localeCompare(b.title));
        if (sort === 'desc') result.sort((a, b) => b.title.localeCompare(a.title));

        if (result.length === 0) reject('No movies found');
        else resolve(result);
    });
}

async function get(id, username) {
    return new Promise((resolve, reject) => {
        if (!username) return reject('User not set');
        const movie = movies.find(m => m.id == id && (m.owner === username || m.published === true));
        if (!movie) reject('Movie not found');
        else resolve(movie);
    });
}

async function insert(movie, username) {
    return new Promise((resolve, reject) => {
        if (!username) return reject('User not set');
        if (movies.find(m => m.title === movie.title)) return reject('Title exists');
        
        movie.id = nextId++;
        movie.fullname = username === 'sepp' ? 'Sepp Hintner' : username;
        movies.push(movie);
        resolve(movie);
    });
}

async function update(id, updatedMovie, username) {
    return new Promise((resolve, reject) => {
        if (!username) return reject('User not set');
        const index = movies.findIndex(m => m.id == id);
        
        if (index === -1) return reject('Movie not found');
        if (movies[index].owner !== username) return reject('Movie not found'); // Darf nur eigene ändern
        
        movies[index] = { ...movies[index], ...updatedMovie, id: id };
        resolve(movies[index]);
    });
}

async function remove(id, username) {
    return new Promise((resolve, reject) => {
        if (!username) return reject('User not set');
        const index = movies.findIndex(m => m.id == id);
        
        if (index === -1 || movies[index].owner !== username) return reject('Movie not found');
        
        movies.splice(index, 1);
        resolve();
    });
}

async function clear(username) {
    return new Promise((resolve, reject) => {
        if (!username) return reject('User not set');
        const initialLength = movies.length;
        movies = movies.filter(m => m.owner !== username);
        
        if (initialLength === movies.length) reject('Movies not found');
        else resolve();
    });
}

module.exports = { getAll, get, insert, update, remove, clear };