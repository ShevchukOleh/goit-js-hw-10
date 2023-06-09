import './css/styles.css';
import Notiflix from 'notiflix';
import API from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

let seekedCountry;

function onSearch (e) {
  e.preventDefault();

  seekedCountry = e.target.value.trim();
  
  resetMarkup();
  
  if (seekedCountry === '') {
    return
  };
  
  API.fetchCountries(seekedCountry)
    .then(renderMarkup)
    .catch(onFetchError);
};

function renderMarkup(country) { 

if (country.length > 10) {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

} else if (country.length <= 10 && country.length >= 2) {
  const createdElements = country.map(el => {
    const createdElement = `
      <li class="country-list__item">
          <div class="country-list__container">
              <img class="country-list__img" src="${el.flags.svg}" alt="${el.flags.alt}">
              <p class="country-list__text"><b>${el.name.official}</b></p>
          </div>
      </li>`;
    return createdElement;
  }).join('')
      
  countryList.innerHTML = createdElements;

  } else if (country.length == 1) {
      countryInfo.innerHTML = `
      <div class="country-info__imgContainer">
          <img class="country-info__img" src="${country[0].flags.svg}" alt="${country[0].flags.alt}">
          <h1 class="country-info__name">${country[0].name.official}</h1>
      </div>
      <div class="country-info__body">
          <p class="country-info__title"><b>Capital:</b> ${country[0].capital}</p>
          <p class="country-info__text"><b>Population:</b> ${country[0].population}</p>
          <p class="country-info__text"><b>Languages:</b> ${Object.values(country[0].languages)}</p>
      </div>`;
    }
}

function onFetchError() { 
  Notiflix.Notify.failure('Oops, there is no country with that name');
};

function resetMarkup() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}