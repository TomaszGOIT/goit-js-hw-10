import fetchCountries from './fetchCountries.js';
import Notiflix from 'notiflix';
import _ from 'lodash';

const searchBox = document.getElementById('searchBox'); // Corrected the ID here
const countriesList = document.getElementById('countries-list');

searchBox.addEventListener('input', debounce(handleInput, 300));

// Funkcja obsługująca zdarzenie wprowadzania tekstu
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

// Funkcja wyświetlająca kraje na stronie

function displayCountries(countries) {
    console.log('Countries:', countries);
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
        const languageNames = country.languages.map(language => language.name).join(', ');

        countriesList.innerHTML = `
            <div class="country">
                <img src="${country.flags.svg}" alt="${country.name.official}" class="flag">
                <div>
                    <p><strong>${country.nativeName}</strong></p>
                    <p>Capital: ${country.capital}</p>
                    <p>Population: ${country.population}</p>
                    <p>Languages: ${languageNames}</p>
                </div>
            </div>
        `;
    } else {
        const countriesHTML = countries.map(country => `
            <div class="country">
                <img src="${country.flags.svg}" alt="${country.nativeName}" class="flag">
                <span class="country-name">${country.nativeName}</span>
            </div>
        `).join('');
        countriesList.innerHTML = countriesHTML;
    }
}

// Funkcja opóźniająca wywołanie funkcji

function debounce(func, timeout) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}