import { throttle } from "lodash";
import tamplate from './tamplates/cardPhoto.hbs';
import NewsServiceApi from './news-service';

const refs = {
    formEl: document.querySelector('#search-form'),
    containerEl: document.querySelector('.gallery'),
    searchBtnEl: document.querySelector('.search-btn'),
    loadMoreBtn: document.querySelector('.load-more_btn'),
    pageNumberEl: document.querySelector('.page-number'),
    modalEl: document.querySelector('.modal'), 
};

const newsServiceApi = new NewsServiceApi();

refs.formEl.addEventListener('input', throttle(inputValue, 1000));
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function inputValue(e) {
    newsServiceApi.query = e.target.value;
    
    clearImagesContainer();
    newsServiceApi.resetPage();
    newsServiceApi.fetchImages().then(appendImagesMarkUp);
};

function onLoadMore() {
    newsServiceApi.fetchImages().then(appendImagesMarkUp);
};

function appendImagesMarkUp(hits) {
    refs.containerEl.insertAdjacentHTML('beforeend', tamplate(hits));
};

function clearImagesContainer() {
    refs.containerEl.innerHTML = '';
}



// Modal Window =================================================================================
refs.containerEl.addEventListener('click',  onClickModal)

const bigImg = document.createElement('img');

function onClickModal(e) {
    if (e.target.localName === 'img') {
        refs.modalEl.style.display = 'block';

        bigImg.setAttribute('src', e.target.dataset.newsrc);
        bigImg.classList.add('modal-img');
        bigImg.style.width = '700px'
        refs.modalEl.appendChild(bigImg);
    }
};

window.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (e.key === 'Escape') {
        refs.modalEl.style.display = 'none';
        refs.modalEl.removeChild(bigImg);
    }
});

refs.modalEl.addEventListener('click', (e) => {
    if (e.target.localName !== 'img') {
        refs.modalEl.style.display = 'none';
        refs.modalEl.removeChild(bigImg);
    }
});