import { html } from 'lit-element';
import { BaseView } from './base-view.js';

class AddBoardView extends BaseView {

    render() {
        return html`Add board`;
    }
}

customElements.define('add-board-view', AddBoardView);
