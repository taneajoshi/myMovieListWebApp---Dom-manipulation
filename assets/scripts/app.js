import {movieCard} from './movieCard.js';

const addMovieBtn = document.querySelector('header button');
const addModal = document.getElementById('add-modal');
const deleteConfirmationModal = document.getElementById('delete-modal');
const backdrop = document.getElementById('backdrop');
const cancleBtn = document.querySelector('.btn--passive');
const userInputs = addModal.querySelectorAll('input');
const modalAddBtn = addModal.querySelector('.btn--success');
const movieList = document.getElementById('movie-list');
const ratingInput = document.getElementById('rating');
const titleInput = document.getElementById('title');
const imageUrl = document.getElementById('image-url');
imageUrl.value = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png?20141107110902';


// Initially the movies array will be empty
const movies =  [];

//FUNCTIONS/ HANDLERS
function toggleBackDrop() {
    backdrop.classList.toggle('visible');
}
 
function toggleMovieModal() {
    addModal.classList.toggle('visible');
    toggleBackDrop();
}

function closeBackdrop() {
    backdrop.classList.remove('visible');
}

function closeMovieModal() {
    addModal.classList.remove('visible');
    closeBackdrop();
}

function clearMovieInputs () {
    for(const inputs of userInputs) {
        inputs.value = '';
    }
}

function closeConfirmationModal() {
    deleteConfirmationModal.classList.remove('visible');
    backdrop.classList.remove('visible');

}

const deleteMovieHandler = (movieId) => {
    let indexNumber = 0;
    for(const movie of movies) {
        if(movie.id == movieId) {
            break;
        }
        indexNumber++;
    }

    movies.splice(indexNumber, 1);
    console.log(movies);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[indexNumber].remove();
    closeConfirmationModal();
}

const cancleMoviedeletion = () => {
    closeConfirmationModal();
}

const startdeleteMovieHandler = (movieId) => {
    deleteConfirmationModal.classList.add('visible');
    toggleBackDrop();
    
    const cancleDelbtn = deleteConfirmationModal.querySelector('.btn--passive');
    let confirmDelbtn = deleteConfirmationModal.querySelector('.btn--danger');
   
    //Creating new cofirm btn to remove old events to the old listners again and again. Since we have used bind and it gives new function so removeEventListner will not work in confirmation case.
    confirmDelbtn.replaceWith(confirmDelbtn.cloneNode(true));
    confirmDelbtn = deleteConfirmationModal.querySelector('.btn--danger');

    //Removing old event listners before adding new one as these old event listners will still be there even if we click the cancle and all the cards we have clicked of confirmation of deletion will be deleted.
    cancleDelbtn.removeEventListener('click', cancleMoviedeletion);
     
    cancleDelbtn.addEventListener('click', cancleMoviedeletion); 
    confirmDelbtn.addEventListener('click', deleteMovieHandler.bind(null, movieId));

    // deleteMovie(movieId);
}
 
function renderCardUi(movieId) {
    const delCardIcon = document.createElement('button');
    delCardIcon.className = "del-btn";
    delCardIcon.innerHTML = '<img src="./images/del-icon.png" alt="delete icon">'
    delCardIcon.addEventListener('click', startdeleteMovieHandler.bind(null, movieId));
    for(let i=0; i<movieList.children.length; i++) {
        movieList.children[i].append(delCardIcon);
    }
}

function updateMovieList(id, title, image, rating) {
    movieList.appendChild(movieCard(id, title, image, rating));
   renderCardUi(id);
}

function addMovieHandler() {
    let ratingInputValue = ratingInput.value;
    let titleInputValue = titleInput.value;
    let imageUrlValue = imageUrl.value;
    const errorField = document.createElement('div');
    errorField.classList.add('text-red');
    errorField.textContent = "Please enter valid value";

    const ratingError = document.createElement('div');
    ratingError.classList.add('text-red');
    ratingError.textContent = "Please choose rating between 1 to 5";
    // for (let i = 0; i < userInputs.length; i++) { another alernative of this loop is to use value 'of' values
    for(const inputs of userInputs ) {
        let trimmedValue = inputs.value.trim();
        if (trimmedValue === '') {
            addModal.appendChild(errorField);
            return;
        } else if (+ratingInputValue < 1 || +ratingInputValue > 5) {
            addModal.appendChild(ratingError);
            return;
        }
    }

    // Creating new movie object and adding on DOM.
    const newMovie = {
        id: Math.random().toString(),
        title: titleInputValue,
        url: imageUrlValue,
        rating: ratingInputValue,
    };

    movies.push(newMovie);
    toggleMovieModal();
    clearMovieInputs();
    updateMovieList(newMovie.id, newMovie.title, newMovie.url, newMovie.rating);
}

// EVENT LISTNERS
addMovieBtn.addEventListener('click', () => {
    toggleMovieModal();
});

cancleBtn.addEventListener('click', () => {
    toggleMovieModal();
    clearMovieInputs();
});

backdrop.addEventListener('click', () => {
    closeMovieModal();
    clearMovieInputs();
    cancleMoviedeletion();
});

// ADD BUTTON FUNCTIONALITY 
modalAddBtn.addEventListener('click', addMovieHandler);