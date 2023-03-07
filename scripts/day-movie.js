const title = document.querySelector('h1.highlight__title');
const background = document.querySelector('.highlight__video');
const rating = document.querySelector('.highlight__rating');
const genres = document.querySelector('.highlight__genres');
const launch = document.querySelector('.highlight__launch');
const description = document.querySelector('.highlight__description');
const link = document.querySelector('.highlight__video-link');



async function loadDayMovie() {
    try {
        const { data } = await api.get('/movie/436969?language=pt-BR');
        const { data: keyData } = await api.get('/movie/436969/videos?language=pt-BR')

        title.innerText = data.original_title;
        background.style.backgroundImage = `url(${data.backdrop_path})`;
        background.style.backgroundSize = 'cover'
        rating.innerText = data.vote_average.toFixed(1);
        genres.innerText = data.genres.map(genre => genre.name).join(', ');
        description.innerText = data.overview;
        link.href = `https://www.youtube.com/watch?v=${keyData.results[0].key}`

        launch.innerText = new Date(data.release_date).toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
        });

    } catch (error) {

    }
}

loadDayMovie()