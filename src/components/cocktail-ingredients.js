import { html, css } from "lit";
import { component } from "haunted";

const CocktailIngredients = ({ ingredients }) => {
  const styles = css`
    :host {
      width: 100%;
    }

    .ingredients-container {
      background-color: rgba(0, 0, 0, 0.1);
      color: black;
      font-size: 0.9rem;
      border-radius: 5px;
      margin-bottom: 1rem;
      padding: 0.8rem 1.5rem;

      @media screen and (min-width: 768px) {
        margin-bottom: 0;
      }

      ul {
        padding-left: 1rem;
      }
    }

    .heading {
      font-size: 1rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    .list {
      position: relative;

      ul {
        margin-bottom: 5rem;
      }
    }

    button {
      position: absolute;
      bottom: -4.5rem;
      right: -0.3rem;
      background-color: rgb(0, 0, 0);
      color: white;
      font-size: 1rem;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0.8rem 1rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        color: black;
        transition: all 0.2s ease-in-out;
      }
    }
  `;

  return html`<style>
      ${styles}
    </style>
    <div class="ingredients-container">
      <p class="heading">Shopping list</p>
      ${ingredients?.length > 0
        ? html`<div class="list">
            <ul id="list-content">
              ${ingredients.map((ingredient, _index) => {
                return html`<li>${ingredient}</li>`;
              })}
            </ul>
            <button type="button" @click=${() => window.print()}>Print</button>
          </div>`
        : html`<p>No ingredients added yet.</p>`}
    </div>`;
};

customElements.define("cocktail-ingredients", component(CocktailIngredients));
