import { html } from 'lit-element';
import {
  getVisibleQuotes
} from '../redux/reducer.js';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import { BaseView } from './base-view.js';
import '../components/my-quote.js';
import { selectRoom } from '../redux/actions.js';
import {setView} from "../redux/actions";

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
      store.dispatch(setView('quote'));
    this.updateQuotes();

    return html`
<link rel="stylesheet" type="text/css" href="../styles.css" media="all" />

    Room: ${this.location.params.room}
    <ul>
    ${
          this.quotes.map(
            quote => html`
                <li>
                    <my-quote quoteText="${quote.quote}"  qouteAuthor="${quote.author}"></my-quote>
                </li>
                `
          )
        }
    </ul>
    `;
  }
}

customElements.define('main-view', MainView);
