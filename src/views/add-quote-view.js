import {html} from 'lit-element';
import {BaseView} from './base-view.js';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-text-area'
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';

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
             <label>Quote censor</label>
             <vaadin-checkbox
                   ?checked="${this.censor}"
                   @change="${this.updateCensor}">
             </vaadin-checkbox>
         </div>
         
         <div>
             <vaadin-text-field
                    label="Board secret"
                   placeholder="Board secret"
                   value="${this.secret}"
                   @change="${this.updateSecret}">
             </vaadin-text-field>
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

    createQuote() {
        console.log(this.text, this.author, this.censor, this.secret)
    }

    cancel() {
        console.log('cancel')
    }
}

customElements.define('add-quote-view', AddQuoteView);
