import _ from 'lodash';
import Notiflix from 'notiflix';
const fetchCountries = require('./fetchCountries');
const debounce = _.debounce;
const searchBox = document.getElementById('searchBox');
const countriesList = document.getElementById('countries-list');
//Nasłuchiwacza na zdarzenie input
searchBox.addEventListener('input', debounce(handleInput, 300));
// Funkcja obsługująca zdarzenie input
async function handleInput() {
    const searchQuery = searchBox.value.trim();
    if (searchQuery === '') {
        countriesList.innerHTML = '';
        return;
    }

    try {
        const countries = await fetchCountries(searchQuery);
        displayCountries(countries);
    } catch (error) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
    }
}
// Funkcja wyświetlająca listę krajów
function displayCountries(countries) {
    if (countries.length === 0) {
        countriesList.innerHTML = '';
        return;
    }

    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        countriesList.innerHTML = '';
        return;
    }

    if (countries.length === 1) {
        const country = countries[0];
        // Wyświetla dane pojedynczego kraju
        countriesList.innerHTML = `
            <div class="country">
                <img src="${country.flags.svg}" alt="${country.name.official}" class="flag">
                <div>
                    <p><strong>${country.name.official}</strong></p>
                    <p>Capital: ${country.capital}</p>
                    <p>Population: ${country.population}</p>
                    <p>Languages: ${country.languages.join(', ')}</p>
                </div>
            </div>
        `;
    } else {
        // Wyświetla listy pasujących krajów
        const countriesHTML = countries.map(country => `
            <div class="country">
                <img src="${country.flags.svg}" alt="${country.name.official}" class="flag">
                <span class="country-name">${country.name.official}</span>
            </div>
        `).join('');
        countriesList.innerHTML = countriesHTML;
    }
}


    