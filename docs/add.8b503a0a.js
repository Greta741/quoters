(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{272:function(e,t,r){"use strict";r.r(t);var a=r(17),n=r(24),i=(r(261),r(269),r(268),r(267),r(270),r(33));function s(){const e=function(e,t){t||(t=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(['\n        <link rel="stylesheet" type="text/css" href="../styles.css" media="all" />\n        <div>\n        <form class="form">\n        <h2>Add Quote</h2>\n        \n        <div class="','"">Better luck next time</div>\n        \n        <div>\n            <vaadin-text-area\n                label="Quote text"\n                placeholder="Quote text"\n                required="true"\n                errorMessage="required"\n                value="','"\n                @change="','">\n            </vaadin-text-area>\n         </div>\n            \n         <div>\n             <vaadin-text-field\n                   label="Quote author"\n                   placeholder="Quote author"\n                   required="true"\n                   errorMessage="required"\n                   value="','"\n                   @change="','">\n             </vaadin-text-field>\n         </div>\n         \n         <div>\n             <label>NSFW</label>\n             <vaadin-checkbox\n                   ?checked="','"\n                   @change="','">\n             </vaadin-checkbox>\n         </div>\n         \n         <div>\n             <vaadin-password-field\n                    label="Board secret"\n                   placeholder="Board secret"\n                   required="true"\n                   errorMessage="required"\n                   value="','"\n                   @change="','">\n             </vaadin-password-field>\n       </div>\n        \n       <div class="form-buttons">\n          <vaadin-button @click="','">\n            Cancel\n          </vaadin-button>\n           <vaadin-button\n                theme="primary"\n                ?disabled="','"\n                @click="','">\n            Create\n          </vaadin-button>\n      </div>\n        </form>            \n    </div>']);return s=function(){return e},e}class d extends n.a{static get properties(){return{text:{type:String},author:{type:String},censor:{type:Boolean},secret:{type:String},disableSave:{type:Boolean},error:{type:Boolean}}}constructor(){super(),this.text="",this.author="",this.censor=!0,this.secret="",this.disableSave=!0,this.error=!1,this.httpService=new i.a}render(){return Object(a.b)(s(),this.error?"error":"no-display",this.text,this.updateText,this.author,this.updateAuthor,this.censor,this.updateCensor,this.secret,this.updateSecret,this.cancel,this.disableSave,this.createQuote)}updateDisableSave(){this.error=!1,this.text&&this.secret&&this.secret?this.disableSave=!1:this.disableSave=!0}updateText(e){this.text=e.target.value,this.updateDisableSave()}updateAuthor(e){this.author=e.target.value,this.updateDisableSave()}updateCensor(e){this.censor=e.target.checked}updateSecret(e){this.secret=e.target.value,this.updateDisableSave()}async createQuote(){const e={text:this.text,author:this.author,censor:this.censor,secret:this.secret};try{if(404===(await this.httpService.createNewQuote(e)).data.status)return void(this.error=!0);window.history.back()}catch(e){this.error=!0}}cancel(){window.history.back()}}customElements.define("add-quote-view",d)},273:function(e,t,r){"use strict";r.r(t);var a=r(17),n=r(24),i=(r(261),r(268),r(267),r(33));function s(){const e=function(e,t){t||(t=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(['\n        <link rel="stylesheet" type="text/css" href="../styles.css" media="all" />\n        <div>\n        <form class="form">\n        <h2>Add Board</h2>\n        \n        <div class="','"">Better luck next time</div>\n        \n        <div>\n            <vaadin-text-field\n                label="Board name"\n                placeholder="Board name"\n                value="','"\n                required="true"\n                errorMessage="required"\n                @change="','">\n            </vaadin-text-field>\n         </div>\n            \n         <div>\n             <vaadin-password-field\n                   label="Board secret"\n                   placeholder="Board secret"\n                   value="','"\n                   required="true"\n                   errorMessage="required"\n                   @change="','">\n             </vaadin-password-field>\n       </div>\n        \n       <div class="form-buttons">\n          <vaadin-button @click="','">\n            Cancel\n          </vaadin-button>\n           <vaadin-button\n           theme="primary" \n           ?disabled="','"\n           @click="','">\n            Create\n          </vaadin-button>\n      </div>\n        </form>            \n    </div>']);return s=function(){return e},e}class d extends n.a{static get properties(){return{name:{type:String},secret:{type:String},disableSave:{type:Boolean},error:{type:Boolean}}}constructor(){super(),this.name="",this.secret="",this.disableSave=!0,this.error=!1,this.httpService=new i.a}render(){return Object(a.b)(s(),this.error?"error":"no-display",this.name,this.updateName,this.secret,this.updateSecret,this.cancel,this.disableSave,this.createBoard)}updateDisableSave(){this.error=!1,this.name&&this.secret?this.disableSave=!1:this.disableSave=!0}updateName(e){this.name=e.target.value,this.updateDisableSave()}updateSecret(e){this.secret=e.target.value,this.updateDisableSave()}async createBoard(){const e={name:this.name,secret:this.secret};try{await this.httpService.createBoard(e),window.history.back()}catch(e){this.error=!0}}cancel(){window.history.back()}}customElements.define("add-board-view",d)}}]);