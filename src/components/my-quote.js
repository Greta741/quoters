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
      <p>"${this.quoteText}" - "${this.qouteAuthor}"</p>
    `;
  }
}

customElements.define("my-quote", MyQuote);
