import { podcasts, genres } from "./js-files/data.js";

import { openModal } from "./js-files/modal.js";

import "./js-files/podcastCard.js";


// MAIN CONTAINER
const podcastContainer = document.querySelector(
    ".main_podcast_data_container"
);


// RENDER PODCASTS
function renderPodcasts() {
    podcastContainer.innerHTML = "";

    podcasts.forEach((podcast) => {
        const genreTitles = podcast.genres.map((genreId) => {
            const matchedGenre = genres.find((genre) => genre.id === genreId);
            return matchedGenre ? matchedGenre.title : "";
        });

        const podcastCard = document.createElement("podcast-card");

        podcastCard.data = {
            ...podcast,
            genreTitles,
        };

        podcastCard.addEventListener("podcast-selected", (event) => {
    openModal(event.detail);
});

        podcastContainer.appendChild(podcastCard);
    });
}


// INITIALIZE APP
renderPodcasts();