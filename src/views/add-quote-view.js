import {html} from 'lit-element';
import {BaseView} from './base-view.js';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-text-area'
import '@vaadin/vaadin-text-field/vaadin-password-field'
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import {HttpService} from "../redux/service";

class AddQuoteView extends BaseView {
    static get properties() {
        return {
            text: {type: String},
            author: {type: String},
            censor: {type: Boolean},
            secret: {type: String}
        };
    }

    constructor() {
        super();
        this.text = '';
        this.author = '';
        this.censor = true;
        this.secret = '';

        this.httpService = new HttpService();
    }


    render() {
        return html`
        <link rel="stylesheet" type="text/css" href="../styles.css" media="all" />
        <div>
        <form class="form">
        <h2>Add Quote</h2>
        
        <div>
            <vaadin-text-area
                label="Quote text"
                placeholder="Quote text"
                value="${this.text}"
                @change="${this.updateText}">
            </vaadin-text-area>
         </div>
            
         <div>
             <vaadin-text-field
                    label="Quote author"
                   placeholder="Quote author"
                   value="${this.author}"
                   @change="${this.updateAuthor}">
             </vaadin-text-field>
         </div>
         
         <div>
             <label>NSFW</label>
             <vaadin-checkbox
                   ?checked="${this.censor}"
                   @change="${this.updateCensor}">
             </vaadin-checkbox>
         </div>
         
         <div>
             <vaadin-password-field
                    label="Board secret"
                   placeholder="Board secret"
                   value="${this.secret}"
                   @change="${this.updateSecret}">
             </vaadin-password-field>
       </div>
        
       <div class="form-buttons">
          <vaadin-button @click="${this.cancel}">
            Cancel
          </vaadin-button>
           <vaadin-button theme="primary" @click="${this.createQuote}">
            Create
          </vaadin-button>
      </div>
        </form>            
    </div>`;
    }

    updateText(e) {
        this.text = e.target.value
    }

    updateAuthor(e) {
        this.author = e.target.value
    }

    updateCensor(e) {
        this.censor = e.target.checked
    }

    updateSecret(e) {
        this.secret = e.target.value
    }

    async createQuote() {
        const quote = {
            text: this.text,
            author: this.author,
            censor: this.censor,
            secret: this.secret,
        };

        await this.httpService.createNewQuote(quote);
        window.history.back();
    }

    cancel() {
        window.history.back();
    }
}

customElements.define('add-quote-view', AddQuoteView);
