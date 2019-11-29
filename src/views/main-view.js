import { html } from 'lit-html';
import { getQuotesSelector } from '../redux/reducer.js';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import { BaseView } from './base-view.js';
import '../components/my-quote.js';
import { HttpService } from '../redux/service';

class MainView extends connect(store)(BaseView) {
  constructor() {
    super();

    this.httpService = new HttpService();
    this.loaded = false;

    this.currentQuote = 0;
    this.currentDate = new Date().getFullYear();
    this.randomColor = `#${Math.random()
      .toString(16)
      .substr(-6)}`;

    setTimeout(() => {
      this.changeQuote();
    }, 5000);
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

  getRandomQuote() {
    this.currentQuote = Math.round(Math.random() * this.quotes.length);
    this.setQuote();
  }

  setQuote() {
    this.requestUpdate();
  }

  changeQuote() {
    if (this.currentQuote < this.quotes.length - 1) {
      this.currentQuote++;
    } else {
      this.currentQuote = 0;
    }

    this.setQuote();
  }

  prevSlide() {
    if (this.currentQuote > 0) {
      this.currentQuote--;
    } else {
      this.currentQuote = this.quotes.length - 1;
    }
    this.setQuote();
  }

  nextSlide() {
    this.changeQuote();
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

        .panel-quote {
          position: absolute;
          top: 0;
          width: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          min-width: 60%;
          margin: auto;
          box-sizing: border-box;
          opacity: 0.85;
          height: 100%;
          margin: 0;
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
          padding: 30px 15rem;
          font-size: 3em;
        }

        .quote {
          font-family: "Courgette", cursive;
        }

        .quote::before {
          content: '"';
          font-family: "Arizonia", cursive;
          font-size: 10rem;
        }

        .author {
          font-size: 0.6em;
          font-weight: lighter;
          text-align: right;
          font-family: "Montserrat", cursive;
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

        .fa {
          font-size: 3.5rem;
          color: #000;
        }

        /* Media Queries */
        @media screen and (max-width: 460px) {
          .panel-quote {
            min-width: 100%;
          }

          blockquote {
            padding: 30px;
            font-size: 2em;
          }
        }
      </style>

      <div class="container">
        <div
          class="panel-quote"
          style="background: linear-gradient(to right, ${this
    .randomColor}, #4f99ba)"
        >
          <div class="quote-progress"></div>
          <div>
            <blockquote>
              <p class="quote">
                ${this.quotes && this.quotes[this.currentQuote]
    ? this.quotes[this.currentQuote].text
    : 'Week on Access'}
              </p>
              <p class="author">
                ${this.quotes && this.quotes[this.currentQuote]
    ? this.quotes[this.currentQuote].author
    : 'MArijus'},
                ${this.currentDate}
                <span class="author-name"></span>
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
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('main-view', MainView);
