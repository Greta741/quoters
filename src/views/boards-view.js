import { html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import { BaseView } from './base-view.js';
import {setView} from "../redux/actions";

class BoardsView extends connect(store)(BaseView) {
  static get properties() {
    return {
      boards: { type: Array }
    };
  }

  stateChanged(state) {
    this.boards = state.boards;
  }

  render() {
    store.dispatch(setView('board'));

    return html`
    ${
          this.boards.map(
            board => html`
                  <a href="/quotes/${board}">${board}</a>
                `
          )
        }
    `;
  }
}

customElements.define('boards-view', BoardsView);
