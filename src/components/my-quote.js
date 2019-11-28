import { html } from "lit-html";
import { LitElement } from "lit-element";

class MyQuote extends LitElement {
  constructor(quoteText, qouteAuthor) {
    super();

    this.quoteText = quoteText || "";
    this.qouteAuthor = qouteAuthor || "";
  }

  static get properties() {
    return {
      quoteText: { type: String },
      qouteAuthor: { type: String }
    };
  }

  render() {
    return html`
      <!-- <link rel="stylesheet" href="../styles.css" /> -->
      <style>
        img {
          max-width: 100%;
          vertical-align: middle;
        }

        .trigger {
          display: none;
        }

        .slider,
        .slider-wrapper {
          position: relative;
          height: 250px;
        }

        .slide {
          background-color: black;
          width: 100%;
          overflow: hidden;
          position: absolute;
          height: 100%;
          left: 0;
          top: 0;
          z-index: 5000;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }

        .slide-img {
          filter: brightness(50%);
          height: 100%;
          object-fit: fill;
          display: block;
          margin: 0 auto;
        }

        .slide-figure {
          height: 100%;
          position: relative;
          margin: 0;
        }

        .slide-caption {
          position: absolute;
          bottom: 30%;
          width: calc(100% - 1rem);
          color: white;
          text-align: center;
          left: 50%;
        }

        .trigger:checked + .slide {
          z-index: 6000;
          opacity: 1;
        }

        .slider-nav {
          width: 100%;
          text-align: center;
          margin: 1rem 0;
        }

        .slider-nav__item {
          display: inline-block;
        }

        .slider-nav__label {
          font-size: 13px;
          background-color: #333;
          display: block;
          height: 2em;
          line-height: 2em;
          width: 2em;
          text-align: center;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          transition: background-color 0.25s, color 0.25s ease-in-out;
        }

        .slider-nav__label:hover,
        .slider-nav__label:active,
        .slider-nav__label:focus {
          background-color: gray;
          color: black;
        }

        @media only screen and (min-width: 1024px) {
          .slider,
          .slider-wrapper {
            height: 480px;
          }

          .slide-caption {
            width: 65%;
            font-size: 1.5rem;
          }
        }

        @media only screen and (max-width: 1023px) and (min-width: 768px) {
          .slider,
          .slider-wrapper {
            height: 360px;
          }

          .slide-caption {
            width: 75%;
            font-size: 1.25rem;
          }
        }

        @media only screen and (min-width: 768px) {
          .slide-img {
            width: 100%;
            height: auto;
          }
        }
      </style>
      <div class="slider-wrapper">
        <div class="slider">
          <input
            type="radio"
            name="slider"
            class="trigger"
            id="one"
            checked="checked"
          />
          <div class="slide">
            <figure class="slide-figure">
              <img class="slide-img" src="../img/1.jpg" />
              <figcaption class="slide-caption">
                <p>"${this.quoteText}" - "${this.qouteAuthor}"</p>
              </figcaption>
            </figure>
            <!-- .slide-figure -->
          </div>
          <!-- .slide -->
          <input type="radio" name="slider" class="trigger" id="two" />
          <div class="slide">
            <figure class="slide-figure">
              <img class="slide-img" src="../img/2.jpg" />
              <figcaption class="slide-caption">
                <p>
                  "${this.quoteText}" - "${this.qouteAuthor}"
                </p>
              </figcaption>
            </figure>
            <!-- .slide-figure -->
          </div>
          <!-- .slide -->
          <input type="radio" name="slider" class="trigger" id="three" />
          <div class="slide">
            <figure class="slide-figure">
              <img class="slide-img" src="../img/3.jpg" />
              <figcaption class="slide-caption">
                <p>"${this.quoteText}" - "${this.qouteAuthor}"</p>
              </figcaption>
            </figure>
            <!-- .slide-figure -->
          </div>
          <!-- .slide -->
        </div>
        <!-- .slider -->
        <ul class="slider-nav">
          <li class="slider-nav__item">
            <label class="slider-nav__label" for="one">1</label>
          </li>
          <li class="slider-nav__item">
            <label class="slider-nav__label" for="two">2</label>
          </li>
          <li class="slider-nav__item">
            <label class="slider-nav__label" for="three">3</label>
          </li>
        </ul>
        <!-- .slider-nav -->
      </div>
      <!-- .slider-wrapper -->
    `;
  }
}

customElements.define("my-quote", MyQuote);
