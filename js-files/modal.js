// IMPORT DATA
import { genres, seasons } from "./data.js";


// MODAL CONTENT
const modalOverlay = document.querySelector(".podcast_modal_overlay");

const modalCloseBtn = document.querySelector(".modal_close_btn");

const modalImg = document.querySelector(".modal_img");

const modalTitle = document.querySelector(".modal_title");

const modalDescription = document.querySelector(".modal_description");

const modalGenres = document.querySelector(".modal_genres");

const modalSeasonsList = document.querySelector(".modal_seasons_list");



// OPEN MODAL FUNCTION
export function openModal(podcast) {

    // IMAGE
    modalImg.src = podcast.image;

    modalImg.alt = podcast.title;

    // TITLE
    modalTitle.textContent = podcast.title;

    // DESCRIPTION
    modalDescription.textContent = podcast.description;

    // GENRES
    modalGenres.innerHTML = "";

    podcast.genres.forEach((genreId) => {

        const matchedGenre = genres.find(
            (genre) => genre.id === genreId
        );

        if (matchedGenre) {

            const genreTag = document.createElement("p");

            genreTag.classList.add("modal_genre_tag");

            genreTag.textContent = matchedGenre.title;

            modalGenres.appendChild(genreTag);
        }
    });


    // SEASONS
    modalSeasonsList.innerHTML = "";

    const matchedSeasonData = seasons.find(
        (season) => season.id === podcast.id
    );

    if (matchedSeasonData) {

        matchedSeasonData.seasonDetails.forEach((season) => {

            const seasonCard = document.createElement("div");

            seasonCard.classList.add("modal_season_card");

            seasonCard.innerHTML = `
                <h4>${season.title}</h4>
                <p>${season.episodes} Episodes</p>
            `;

            modalSeasonsList.appendChild(seasonCard);
        });
    }


    // SHOW MODAL
    modalOverlay.classList.remove("hidden");
}


// CLOSE MODAL FUNCTION
export function closeModal() {

    modalOverlay.classList.add("hidden");
}


// CLOSE EVENTS
modalCloseBtn.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (event) => {

    if (event.target === modalOverlay) {

        closeModal();
    }
});