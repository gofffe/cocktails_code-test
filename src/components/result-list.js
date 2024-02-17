import { html, css } from "lit";
import { component } from "haunted";

const ResultList = ({ searchResult, status }) => {
  const addIngredientsToSession = (cocktail) => {
    const filteredIngredients = [];
    let sessionIngredients =
      JSON.parse(sessionStorage.getItem("ingredients")) || [];

    for (const key in cocktail) {
      if (key.startsWith("strIngredient") && cocktail[key] !== null) {
        filteredIngredients.push(cocktail[key]);
      }
    }

    const mergedIngredients = [
      ...new Set(sessionIngredients.concat(filteredIngredients)),
    ];

    sessionStorage.setItem("ingredients", JSON.stringify(mergedIngredients));

    const event = new CustomEvent("ingredientAdded", {
      detail: { ingredients: mergedIngredients },
    });

    window.dispatchEvent(event);
  };

  const styles = css`
    :host {
      width: 100%;
    }

    .list-container {
      background-color: rgba(0, 0, 0, 0.1);
      color: black;
      font-size: 0.9rem;
      border-radius: 5px;
      margin: 1rem 0;
      padding: 0.8rem 1.5rem;

      @media screen and (min-width: 768px) {
        margin-top: 0;
      }
    }

    .heading {
      font-size: 1rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    .cocktail {
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 2rem 0;

      @media screen and (min-width: 768px) {
        flex-direction: row;
      }

      &:first-of-type {
        padding-top: 0.5rem;
      }

      &:not(:last-of-type) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }

      img {
        width: 85%;
        height: 150px;
        object-fit: cover;
        object-position: center 20%;
        border-radius: 3px;
        box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.1);

        @media screen and (min-width: 768px) {
          width: 100px;
          height: 100px;
        }
      }

      .description {
        padding: 1rem 0 0;

        @media screen and (min-width: 768px) {
          padding: 0 2.8rem 0 2rem;
        }
      }

      h2 {
        font-size: 1.2rem;
        text-transform: uppercase;
        margin: 0;
      }

      p {
        margin: 0;
      }

      button {
        position: absolute;
        top: 2.2rem;
        right: 0;
        background-color: rgb(0, 0, 0);
        color: white;
        font-size: 1rem;
        border: none;
        border-radius: 5px;
        outline: none;
        padding: 0.2rem 0.5rem;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
          color: black;
          transition: all 0.2s ease-in-out;
        }
      }
    }
  `;

  return html`<style>
      ${styles}
    </style>
    <div class="list-container">
      <p class="heading">Your search results</p>
      ${searchResult &&
      searchResult.length > 0 &&
      !status.toLowerCase().includes("found")
        ? searchResult.map(
            (cocktail) => html`
              <div class="cocktail">
                <img
                  src="${cocktail.strDrinkThumb}"
                  alt="${cocktail.strDrink}"
                />
                <div class="description">
                  <h2>${cocktail.strDrink}</h2>
                  <p>${cocktail.strInstructions}</p>
                </div>
                <button @click=${() => addIngredientsToSession(cocktail)}>
                  +
                </button>
              </div>
            `
          )
        : status.toLowerCase().includes("found")
        ? html`<p>${status}</p>`
        : html`<p>Make a cocktail recipe search</p>`}
    </div>`;
};

customElements.define("result-list", component(ResultList));
