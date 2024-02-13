import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

const { breedSelect, catInfo, loader, error } = elements;
catInfo.classList.add('is-hidden');
breedSelect.addEventListener('change', createMarkup);

updateBreedSelect();

function updateBreedSelect(data) {
  fetchBreeds(data).then(breedsData => {
    loader.classList.replace('loader', 'is-hidden');

    const optionsMarkup = breedsData.map(({ name, id }) => {
      return `<option value='${id}'>${name}</option>`;
    });

    breedSelect.insertAdjacentHTML('beforeend', optionsMarkup);

    new SlimSelect({ select: breedSelect });
  }).catch(handleFetchError);
}

function createMarkup(event) {
  loader.classList.replace('is-hidden', 'loader');
  breedSelect.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');

  const selectedBreedId = event.currentTarget.value;

  fetchCatByBreed(selectedBreedId).then(catData => {
    loader.classList.replace('loader', 'is-hidden');
    breedSelect.classList.remove('is-hidden');

    const { url, breeds } = catData[0];

    catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="500"/>
                              <div class="box">
                                <h2>${breeds[0].name}</h2>
                                <p>${breeds[0].description}</p>
                                <p><strong>Temperament:</strong> ${breeds[0].temperament}</p>
                              </div>`;
    catInfo.classList.remove('is-hidden');
  }).catch(handleFetchError);
}

function handleFetchError() {
  breedSelect.classList.remove('is-hidden');
  loader.classList.replace('loader', 'is-hidden');

  Notify.failure('Oops! Something went wrong! Try reloading the page or selecting another cat breed!');
}
