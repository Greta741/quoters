import {html} from 'lit-element';
import {BaseView} from './base-view.js';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-password-field'
import '@vaadin/vaadin-button';
import {HttpService} from "../redux/service";

class AddBoardView extends BaseView {
    static get properties() {
        return {
            name: {type: String},
            secret: {type: String}
        };
    }

    constructor() {
        super();
        this.name = '';
        this.secret = '';

        this.httpService = new HttpService();
    }


    render() {
        return html`
        <link rel="stylesheet" type="text/css" href="../styles.css" media="all" />
        <div>
        <form class="form">
        <h2>Add Board</h2>
        
        <div>
            <vaadin-text-field
                label="Board name"
                placeholder="Board name"
                value="${this.name}"
                required="true"
                errorMessage="required"
                @change="${this.updateName}">
            </vaadin-text-field>
         </div>
            
         <div>
             <vaadin-password-field
                   label="Board secret"
                   placeholder="Board secret"
                   value="${this.secret}"
                   required="true"
                    errorMessage="required"
                   @change="${this.updateSecret}">
             </vaadin-password-field>
       </div>
        
       <div class="form-buttons">
          <vaadin-button @click="${this.cancel}">
            Cancel
          </vaadin-button>
           <vaadin-button theme="primary" @click="${this.createBoard}">
            Create
          </vaadin-button>
      </div>
        </form>            
    </div>`;
    }

    updateName(e) {
        this.name = e.target.value
    }

    updateSecret(e) {
        this.secret = e.target.value
    }

    async createBoard() {
        const board = {
            name: this.name,
            secret: this.secret,
        };

        await this.httpService.createBoard(board);
        window.history.back();
    }

    cancel() {
        window.history.back();
    }
}

customElements.define('add-board-view', AddBoardView);
