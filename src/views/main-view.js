import { html } from "lit-element";
import { getVisibleQuotes } from "../redux/reducer.js";
import { connect } from "pwa-helpers";
import { store } from "../redux/store.js";
import { BaseView } from "./base-view.js";
import "../components/my-quote.js";
import { selectRoom } from "../redux/actions.js";

class MainView extends connect(store)(BaseView) {
  static get properties() {
    return {
      quotes: { type: Array }
    };
  }

  stateChanged(state) {
    this.quotes = getVisibleQuotes(state);
  }

  updateQuotes() {
    if (this.location.params.room) {
      store.dispatch(selectRoom(this.location.params.room));
    } else {
      store.dispatch(selectRoom(null));
    }
  }

  render() {
    this.updateQuotes();

    return html`
      <style>
        button {
          background-color: inherit;
          color: #333;
          border: none;
          opacity: 0.3;
        }

        button:hover {
          opacity: 1;
        }

        a {
          text-decoration: none;
          opacity: 0.3;
        }

        a:hover {
          opacity: 1;
        }

        .container {
          margin: 5rem auto;
        }

        .panel-quote {
          position: absolute;
          top: 80%;
          left: 50%;
          transform: translate(-50%, -50%);
          min-width: 400px;
          margin: auto;
          box-sizing: border-box;
          background-color: #fff;
        }

        .social-share {
          text-align: center;
        }

        .social-share i {
          color: #333;
        }

        .quote-progress {
          width: 0;
          height: 3px;
          background-color: #333;
        }

        blockquote {
          padding: 30px;
          font-size: 1.4em;
        }

        .quote {
          font-family: "Crimson Text", serif;
          font-style: italic;
        }

        .author {
          font-size: 0.6em;
          font-weight: lighter;
          text-align: right;
        }

        /* Quote Navigation */
        .quote-nav {
          display: flex;
          align-items: stretch;
          width: 100%;
          padding-bottom: 30px;
        }

        .previous {
          margin: auto;
        }

        .next {
          margin: auto;
        }

        /* Media Queries */
        @media screen and (max-width: 460px) {
          .panel-quote {
            min-width: 100%;
          }

          blockquote {
            font-size: 1.1em;
          }
        }
      </style>

      <div class="container">
        <div class="panel-quote">
          <div class="quote-progress"></div>
          <div>
            ${this.quotes.map(
              quote => html`
                <blockquote>
                  <p class="quote">${quote.quote}</p>
                  <p class="author">
                    - ${quote.author}<span class="author-name"></span>
                  </p>
                </blockquote>
                <div class="quote-nav">
                  <button class="previous">
                    <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                  </button>
                  <button class="random">
                    <i class="fa fa-random" aria-hidden="true"></i>
                  </button>
                  <button class="next">
                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                  </button>
                </div>
              `
            )}
          </div>
        </div>
      </div>
      <ul></ul>
    `;
  }
}

customElements.define("main-view", MainView);
