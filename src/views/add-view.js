import { html } from 'lit-element';
import { BaseView } from './base-view.js';
import {connect} from "pwa-helpers";
import {store} from "../redux/store";
import {getSetView} from "../redux/reducer";

class AddView extends connect(store)(BaseView) {

  static get properties() {
    return {
      view: { type: Array }
    };
  }

  stateChanged(state) {
    this.view = getSetView(state);
  }

  redirect() {
    window.history.pushState('data2', 'title2', 'add-' + this.view)
    window.history.go()
  }

  render() {
    this.redirect();

    return html``;
  }
}

customElements.define('add-view', AddView);
