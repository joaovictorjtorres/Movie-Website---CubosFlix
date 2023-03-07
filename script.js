const moviesContainer = document.querySelector('.movies');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const form = document.querySelector('.header__container-right');
const input = document.querySelector('.input');


let movies;
let currentPage = 0;
let filteredMovies;
let isSearching = false;


function renderItem({ img, title, rating, id }) {
    return `<div class="movie" onclick="renderMovieToModal(${id})" style="background-image: url(${img});">
            <div class="movie__info">
              <span class="movie__title">${title}</span>
              <span class="movie__rating">
              ${rating.toFixed(1)}
                <img src="./assets/estrela.svg" alt="Estrela">
              </span>
            </div>
          </div>`
};

function renderMovies(moviesToRender) {
    const indexPage = currentPage * 6;
    moviesContainer.innerHTML = '';
    moviesToRender.slice(indexPage, indexPage + 6).forEach(movie => {
        moviesContainer.innerHTML += renderItem({ img: movie.poster_path, title: movie.title, rating: movie.vote_average, id: movie.id })
    });;
}


async function loadMovieData() {
    try {
        const response = await api.get('/discover/movie?language=pt-BR&include_adult=false')
        movies = response.data.results
        renderMovies(movies)
    } catch (error) {
    }
}

btnNext.addEventListener('click', () => {
    if (isSearching) {
        if (currentPage < 2) {
            currentPage++;
            renderMovies(filteredMovies)
        } else if (currentPage === 2) {
            currentPage = 0;
            renderMovies(filteredMovies)
        }
        return;
    }

    if (currentPage < 2) {
        currentPage++;
        renderMovies(movies)
    } else if (currentPage === 2) {
        currentPage = 0;
        renderMovies(movies)
    }
})

btnPrev.addEventListener('click', () => {
    if (isSearching) {
        if (currentPage > 0) {
            currentPage--;
            renderMovies(filteredMovies)
        } else if (currentPage === 0) {
            currentPage = 2;
            renderMovies(filteredMovies)
        }
        return;
    }
    if (currentPage > 0) {
        currentPage--;
        renderMovies(movies)
    } else if (currentPage === 0) {
        currentPage = 2;
        renderMovies(movies)
    }
})

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (input.value.trim().length == 0) {
        isSearching = false;
        currentPage = 0;
        renderMovies(movies);
        return
    }

    try {
        const response = await api.get(`/search/movie?language=pt-BR&include_adult=false&query=${input.value}`)
        filteredMovies = response.data.results;
        isSearching = true;
        renderMovies(filteredMovies);
        input.value = '';

    } catch (error) {
    }
})



loadMovieData()