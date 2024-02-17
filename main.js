import { html, render, css } from "lit";
import { component, useEffect, useState } from "haunted";
import "./src/components/result-list";
import "./src/components/cocktail-ingredients";
import "./src/components/status-message";

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [result, setResult] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [ingredients, setIngredients] = useState(
    JSON.parse(sessionStorage.getItem("ingredients"))
  );

  useEffect(() => {
    const handleIngredientAdded = (event) => {
      setIngredients(event.detail.ingredients);
      setStatusMessage("Ingredients added to shopping list");
    };

    window.addEventListener("ingredientAdded", handleIngredientAdded);

    return () => {
      window.removeEventListener("ingredientAdded", handleIngredientAdded);
    };
  }, []);

  const handleSearch = () => {
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchWord}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.drinks === null) {
          setStatusMessage("No results found");
          return;
        }

        setResult(data.drinks);
        setStatusMessage("Here are the results!");
      });
  };

  const styles = css`
    .wrapper {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding-top: 4rem;
    }

    .lists-wrapper {
      width: 85%;
      display: grid;
      grid-template-columns: 1fr;
      margin-top: 1rem;

      @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 35%;
        column-gap: 2rem;
        margin-top: 2rem;
      }
    }

    h1 {
      font-weight: 500;
      margin: 0 0 50px;
    }

    .search-container {
      width: 85%;
      display: flex;
      margin: 0 auto;

      @media screen and (min-width: 768px) {
        width: 50%;
      }
    }

    .search-container input {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.1);
      color: black;
      font-size: 0.9rem;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0.8rem 1rem;
      margin-right: 4.5%;
    }

    ::-webkit-input-placeholder {
      color: black;
    }

    button {
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

  return html`
    <style>
      ${styles}
    </style>
    <div class="wrapper">
      <h1>Cocktail assistant</h1>

      ${statusMessage !== ""
        ? html`<status-message .status=${statusMessage}></status-message>`
        : null}

      <div class="search-container">
        <input
          type="text"
          placeholder="Search for cocktail recipes"
          .value=${searchWord}
          @input=${(e) => setSearchWord(e.target.value)}
        />
        <button type="button" id="search-btn" @click=${handleSearch}>
          Search
        </button>
      </div>

      <div class="lists-wrapper">
        <result-list
          .searchResult=${result}
          .status=${statusMessage}
        ></result-list>
        <cocktail-ingredients
          .ingredients=${ingredients}
        ></cocktail-ingredients>
      </div>
    </div>
  `;
}

customElements.define("my-app", component(App));

const appRoot = document.getElementById("app");
render(html`<my-app></my-app>`, appRoot);
