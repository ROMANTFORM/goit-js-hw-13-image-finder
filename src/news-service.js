export default class NewServiceApi {
    constructor() {
        this.searchQuery = "";
        this.page = 1;
    }

    fetchImages() {
        const BASE_URL = 'https://pixabay.com/api/';
        const KEY = '21338809-8e79b9b5850d2aac12371ada0';
        
       return fetch(
            `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`
        )
            .then(res => res.json())
            .then(({hits}) => {
                this.page += 1
                return hits;
            })
           .catch(error => console.log(error));
        
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}