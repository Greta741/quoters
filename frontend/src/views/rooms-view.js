import { html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import { BaseView } from './base-view.js';

class RoomsView extends connect(store)(BaseView) {
  static get properties() {
    return {
      rooms: { type: Array }
    };
  }

  stateChanged(state) {
    this.rooms = state.rooms;
  }

  render() {
    return html`
    ${
          this.rooms.map(
            room => html`
                  <a href="/quotes/${room}">${room}</a>
                `
          )
        }
    `;
  }
}

customElements.define('rooms-view', RoomsView);