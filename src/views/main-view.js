import {html} from 'lit-element';
import {
    getVisibleQuotes
} from '../redux/reducer.js';
import {connect} from 'pwa-helpers';
import {store} from '../redux/store.js';
import {BaseView} from './base-view.js';
import '../components/my-quote.js';
import {selectRoom} from '../redux/actions.js';
import {HttpService} from "../redux/service";

class MainView extends connect(store)(BaseView) {
    constructor() {
        super();

        this.httpService = new HttpService();
        this.loaded = false;
    }

    static get properties() {
        return {
            quotes: {type: Array}
        };
    }

    stateChanged(state) {
        this.quotes = getVisibleQuotes(state);
    }

    loadQuotes() {
        if (this.loaded) {
            return;
        }
        const board = this.location.params.board;
        if (board) {
            this.httpService.getQuotes(board)
        } else {
            this.httpService.getQuotes(null)
        }
        this.loaded = true;
    }

    render() {
        this.loadQuotes();

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
