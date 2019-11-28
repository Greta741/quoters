import { html } from 'lit-element';
import { BaseView } from './base-view.js';

class AddView extends BaseView {
  render() {
    return html`
        <h2>Add new quote</h2>
    `;
  }
}

customElements.define('add-view', AddView);