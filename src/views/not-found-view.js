import { html } from 'lit-element';
import { BaseView } from './base-view.js';

class NotFoundView extends BaseView {
  render() {
    return html`
    <div>
        <h1 style="margin: 2rem auto; width: fit-content;}">Not found!</h1>
    </div>
    `;
  }
}

customElements.define('not-found-view', NotFoundView);
