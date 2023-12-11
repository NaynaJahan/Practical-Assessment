const apiUrl = 'https://api.punkapi.com/v2/beers';

window.onload = function() {
    fetchAllBeers();
};

function fetchAllBeers() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayAllBeers(data))
        .catch(error => console.error('Error:', error));
}

function displayAllBeers(beers) {
    const beerList = document.getElementById('beerList');
    beerList.innerHTML = '';

    beers.forEach(beer => {
        const beerItem = document.createElement('div');
        beerItem.className = `beer-item`;
        beerItem.innerHTML = `
            <span class="beer-name">${beer.name}</span>
            <button onclick="addToFavorites('${beer.name}')">Favourite</button>
        `;
        beerList.appendChild(beerItem);
    });
}

function searchBeers() {
    const searchInput = document.getElementById('searchInput').value;
    fetch(`${apiUrl}?beer_name=${searchInput}`)
        .then(response => response.json())
        .then(data => displaySearchedBeers(data))
        .catch(error => console.error('Error:', error));
}

function displaySearchedBeers(beers) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    beers.forEach(beer => {
        const beerDiv = document.createElement('div');
        beerDiv.innerHTML = `
            <h2>${beer.name}</h2>
            <h3>${beer.tagline}</h3>
            <p>${beer.description}</p>
        `;
        searchResults.appendChild(beerDiv);
    });
}

function addToFavorites(beerName) {
    const favoritesList = document.getElementById('favoritesList');
    const favItem = document.createElement('li');
    favItem.textContent = beerName;
    favoritesList.appendChild(favItem);
}
