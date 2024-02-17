import { html, css } from "lit";
import { component } from "haunted";

const StatusMessage = ({ status }) => {
  const styles = css`
    :host {
      width: 100%;
    }

    .status-container {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background-color: rgba(0, 0, 0, 0.06);
      color: black;
      font-size: 0.9rem;
      border-radius: 5px;
      padding: 0.5rem 1rem;
      animation: fadeIn 0.1s ease-in forwards;

      @media screen and (min-width: 768px) {
        top: 1rem;
        right: 1rem;
      }

      p {
        margin: 0;
      }
    }

    p {
      font-size: 1rem;
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `;

  return html`<style>
      ${styles}
    </style>
    <div class="status-container">
      <p>${status}</p>
    </div>`;
};

customElements.define("status-message", component(StatusMessage));
