import { html } from "lit-html";
import { getQuotesSelector } from "../redux/reducer.js";
import { connect } from "pwa-helpers";
import { store } from "../redux/store.js";
import { BaseView } from "./base-view.js";
import "../components/my-quote.js";
import { HttpService } from "../redux/service";

class MainView extends connect(store)(BaseView) {
  constructor() {
    super();

    this.httpService = new HttpService();
    this.loaded = false;

    this.currentQuote = 0;
    this.progressWidth = 0;
    this.progress = setInterval(this.timerProgress(), 40);
  }

  static get properties() {
    return {
      quotes: { type: Array }
    };
  }

  stateChanged(state) {
    this.quotes = getQuotesSelector(state);
  }

  loadQuotes() {
    if (this.loaded) {
      return;
    }
    const board = this.location.params.board;
    if (board) {
      this.httpService.getQuotes(board);
    } else {
      this.httpService.getQuotes(null);
    }
    this.loaded = true;
  }

  timerProgress() {
    // document.querySelector(".quote-progress").width(progressWidth + "%");

    console.log(document.querySelector(".quote-progress"));

    if (this.progressWidth < 100) {
      this.progressWidth += 0.1;
    } else {
      this.changeQuote();
      this.progressWidth = 0;
    }
  }

  setQuote() {
    document
      .querySelector(".quote")
      .html('"' + this.quotes[this.currentQuote].quote + '"');
    document
      .querySelector(".author-name")
      .html(this.quotes[this.currentQuote].author);
    tweetQuote();
  }

  getRandomQuote() {
    this.currentQuote = Math.round(Math.random() * listQuotes.length);
    console.log(this.currentQuote);
    this.progressWidth = 0;
  }

  changeQuote() {
    // $("blockquote").fadeToggle( "slow", "linear" );
    if (this.currentQuote < this.quotes.length - 1) {
      this.currentQuote++;
    } else {
      this.currentQuote = 0;
    }
    this.setQuote();
  }

  nextSlide() {
    this.changeQuote();
    this.progressWidth = 0;
  }

  prevSlide() {
    if (this.currentQuote > 0) {
      this.currentQuote--;
    } else {
      this.currentQuote = this.quotes.length - 1;
    }
    this.setQuote();
    this.progressWidth = 0;
  }

  render() {
    this.loadQuotes();

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

        .container {
          margin: 5rem auto;
        }

        .panel-quote {
          position: absolute;
          top: 50%;
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
                  <p class="quote">${quote.text}</p>
                  <p class="author">
                    - ${quote.author}<span class="author-name"></span>
                  </p>
                </blockquote>
                <div class="quote-nav">
                  <button @click="${this.prevSlide}" class="previous">
                    <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                  </button>
                  <button @click="${this.getRandomQuote}" class="random">
                    <i class="fa fa-random" aria-hidden="true"></i>
                  </button>
                  <button @click="${this.nextSlide}" class="next">
                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                  </button>
                </div>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("main-view", MainView);
