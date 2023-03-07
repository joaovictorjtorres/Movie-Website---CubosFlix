const modal = document.querySelector('.modal')
const close = document.querySelector('.modal__close')

const modalTitle = document.querySelector('.modal__title');
const modalImg = document.querySelector('.modal__img');
const modalDescription = document.querySelector('.modal__description');
const modalAverage = document.querySelector('.modal__average');




async function renderMovieToModal(id) {
    try {
        const { data } = await api.get(`/movie/${id}?language=pt-BR`);

        modalTitle.innerText = data.title;
        modalImg.src = data.backdrop_path;
        modalDescription.innerText = data.overview;
        modalAverage.innerText = data.vote_average.toFixed(1);
        modal.classList.remove('hidden')


    } catch (error) {

    }
}

close.addEventListener('click', (event) => {
    modal.classList.add('hidden')
})

modal.addEventListener('click', (event) => {
    modal.classList.add('hidden')
})



