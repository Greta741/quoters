import { html } from 'lit-element';
import { BaseView } from './base-view.js';

class AddQuoteView extends BaseView {

    render() {
        return html`Add quote`;
    }
}

customElements.define('add-quote-view', AddQuoteView);
