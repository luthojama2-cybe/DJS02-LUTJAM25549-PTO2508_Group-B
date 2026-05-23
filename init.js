import { podcasts, genres } from "./js-files/data.js";

import { openModal } from "./js-files/modal.js";


// MAIN CONTAINER
const podcastContainer = document.querySelector(
    ".main_podcast_data_container"
);


// RENDER PODCASTS
function renderPodcasts() {

    podcastContainer.innerHTML = "";

    podcasts.forEach((podcast) => {

        // CREATE CARD
        const card = document.createElement("article");

        card.classList.add("card");


        // GENRES
        const genreHTML = podcast.genres.map((genreId) => {

            const matchedGenre = genres.find(
                (genre) => genre.id === genreId
            );

            return `
                <p>${matchedGenre.title}</p>
            `;

        }).join("");


        // CARD CONTENT
        card.innerHTML = `
        
            <div class="img_cover">

                <img 
                    src="${podcast.image}" 
                    alt="${podcast.title}"
                    class="podcast_cover_img"
                >

            </div>

            <div class="podcast_data">

                <h3>${podcast.title}</h3>

                <p class="season_description">
                    <i class="fa-solid fa-calendar fa-sm"></i>
                    ${podcast.seasons} Seasons
                </p>

                <div class="genre_box">
                    ${genreHTML}
                </div>

                <p class="season_update">
                    Updated ${new Date(
                        podcast.updated
                    ).toLocaleDateString()}
                </p>

            </div>
        `;


        // OPEN MODAL
        card.addEventListener("click", () => {

            openModal(podcast);
        });


        // APPEND CARD
        podcastContainer.appendChild(card);

    });
}


// INITIALIZE APP
renderPodcasts();