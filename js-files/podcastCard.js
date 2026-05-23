/**
 * Custom podcast card web component.
 * 
 * This component uses Shadow DOM so its HTML and CSS
 * are encapsulated and protected from global CSS conflicts.
 */
class PodcastCard extends HTMLElement {
    constructor() {
        super();

        /**
         * Stores podcast data passed from the parent file.
         * @type {Object | null}
         */
        this.podcast = null;

        /**
         * Creates a Shadow DOM for this component.
         * mode: "open" allows JavaScript to access this.shadowRoot.
         */
        this.attachShadow({ mode: "open" });
    }

    /**
     * Receives podcast data from the parent.
     * 
     * @param {Object} podcast - Podcast data object.
     */
    set data(podcast) {
        this.podcast = podcast;
        this.render();
    }

    /**
     * Returns the current podcast data.
     * 
     * @returns {Object | null}
     */
    get data() {
        return this.podcast;
    }

    /**
     * Renders the podcast card inside the Shadow DOM.
     */
    render() {
        if (!this.podcast) return;

        const genreHTML = this.podcast.genreTitles
            .map((genre) => `<p>${genre}</p>`)
            .join("");

        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    display: flex;
                    flex-direction: column;
                    gap: 1em;
                    padding: 1.2em;
                    width: 100%;
                    background-color: #fff;
                    cursor: pointer;
                }

                .img_cover {
                    width: 100%;
                    aspect-ratio: 1 / 0.8;
                    border-radius: 10px;
                    background-color: #666;
                    overflow: hidden;
                }

                .podcast_cover_img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 10px;
                }

                .podcast_data {
                    display: flex;
                    flex-direction: column;
                    gap: .8em;
                }

                h3 {
                    margin: 0;
                    font-size: 1.1rem;
                }

                .genre_box {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    gap: 1em;
                }

                .genre_box p {
                    background-color: #D3D3D3;
                    padding: .4em;
                    margin: 0;
                }

                .season_description,
                .season_update {
                    color: #666;
                    margin: 0;
                }
            </style>

            <article class="card">
                <div class="img_cover">
                    <img 
                        src="${this.podcast.image}" 
                        alt="${this.podcast.title}"
                        class="podcast_cover_img"
                    >
                </div>

                <div class="podcast_data">
                    <h3>${this.podcast.title}</h3>

                    <p class="season_description">
                        <i class="fa-solid fa-calendar fa-sm"></i>
                        ${this.podcast.seasons} Seasons
                    </p>

                    <div class="genre_box">
                        ${genreHTML}
                    </div>

                    <p class="season_update">
                        Updated ${new Date(this.podcast.updated).toLocaleDateString()}
                    </p>
                </div>
            </article>
        `;
    }
}

/**
 * Registers the custom element.
 * 
 * After this, we can use:
 * <podcast-card></podcast-card>
 */
customElements.define("podcast-card", PodcastCard);