import { html } from "lit-element";
import { BaseView } from "./base-view.js";
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-text-field/vaadin-text-area";
import "@vaadin/vaadin-text-field/vaadin-password-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-checkbox";
import { HttpService } from "../redux/service";

class AddQuoteView extends BaseView {
  static get properties() {
    return {
      text: { type: String },
      author: { type: String },
      censor: { type: Boolean },
      secret: { type: String },
      disableSave: { type: Boolean },
      error: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.text = "";
    this.author = "";
    this.censor = true;
    this.secret = "";
    this.disableSave = true;
    this.error = false;

    this.httpService = new HttpService();
  }

  render() {
    return html`
        <link rel="stylesheet" type="text/css" href="../styles.css" media="all" />

<style>
.cat {
  position: relative;
  height: 34px;
  width: 38.42px;
  margin-top: 1rem;
}

.ear {
  position: absolute;
  top: -30%;
  height: 60%;
  width: 25%;
  background: #fff;
}
.ear::before, .ear::after {
  content: '';
  position: absolute;
  bottom: 24%;
  height: 10%;
  width: 5%;
  border-radius: 50%;
  background: #161616;
}
.ear::after {
  -webkit-transform-origin: 50% 100%;
          transform-origin: 50% 100%;
}

.ear--left {
  left: -7%;
  border-radius: 70% 30% 0% 0% / 100% 100% 0% 0%;
  -webkit-transform: rotate(-24deg);
          transform: rotate(-24deg);
}
.ear--left::before, .ear--left::after {
  right: 10%;
}
.ear--left::after {
  -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
}

.ear--right {
  right: -7%;
  border-radius: 30% 70% 0% 0% / 100% 100% 0% 0%;
  -webkit-transform: rotate(24deg);
          transform: rotate(24deg);
}
.ear--right::before, .ear--right::after {
  left: 10%;
}
.ear--right::after {
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
}

.face {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #161616;
  border-radius: 50%;
}

.eye {
  position: absolute;
  top: 35%;
  height: 30%;
  width: 31%;
  background: #fff;
  /*border-radius: 34% 78% 66% 65% / 57% 95% 26% 73%;*/
}
.eye::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 100%;
  border-radius: 0 0 50% 50% / 0 0 3% 15%;
  background: #161616;
  -webkit-animation: blink 4s infinite ease-in;
          animation: blink 4s infinite ease-in;
}
@-webkit-keyframes blink {
  0% {
    height: 0;
  }
  90% {
    height: 0;
  }
  92.5% {
    height: 100%;
  }
  95% {
    height: 0;
  }
  97.5% {
    height: 100%;
  }
  100% {
    height: 0;
  }
}
@keyframes blink {
  0% {
    height: 0;
  }
  90% {
    height: 0;
  }
  92.5% {
    height: 100%;
  }
  95% {
    height: 0;
  }
  97.5% {
    height: 100%;
  }
  100% {
    height: 0;
  }
}
.eye::before {
  content: '';
  position: absolute;
  top: 60%;
  height: 10%;
  width: 15%;
  background: #fff;
  border-radius: 50%;
}

.eye--left {
  left: 0;
  border-radius: 34% 78% 66% 65% / 47% 95% 26% 73%;
}
.eye--left::before {
  right: -5%;
}

.eye--right {
  right: 0;
  border-radius: 78% 34% 65% 66% / 95% 47% 73% 26%;
}
.eye--right::before {
  left: -5%;
}

.eye-pupil {
  position: absolute;
  top: 25%;
  height: 50%;
  width: 20%;
  background: #161616;
  border-radius: 50%;
  -webkit-animation: look-around 4s infinite;
          animation: look-around 4s infinite;
}
@-webkit-keyframes look-around {
  0% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
  5% {
    -webkit-transform: translate(50%, -25%);
            transform: translate(50%, -25%);
  }
  10% {
    -webkit-transform: translate(50%, -25%);
            transform: translate(50%, -25%);
  }
  15% {
    -webkit-transform: translate(-100%, -25%);
            transform: translate(-100%, -25%);
  }
  20% {
    -webkit-transform: translate(-100%, -25%);
            transform: translate(-100%, -25%);
  }
  25% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  100% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
}
@keyframes look-around {
  0% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
  5% {
    -webkit-transform: translate(50%, -25%);
            transform: translate(50%, -25%);
  }
  10% {
    -webkit-transform: translate(50%, -25%);
            transform: translate(50%, -25%);
  }
  15% {
    -webkit-transform: translate(-100%, -25%);
            transform: translate(-100%, -25%);
  }
  20% {
    -webkit-transform: translate(-100%, -25%);
            transform: translate(-100%, -25%);
  }
  25% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
  100% {
    -webkit-transform: translate(0, 0);
            transform: translate(0, 0);
  }
}
.eye--left .eye-pupil {
  right: 30%;
}
.eye--right .eye-pupil {
  left: 30%;
}
.eye-pupil::after {
  content: '';
  position: absolute;
  top: 30%;
  right: -5%;
  height: 20%;
  width: 35%;
  border-radius: 50%;
  background: #fff;
}

.muzzle {
  position: absolute;
  top: 67%;
  left: 50%;
  height: 6%;
  width: 10%;
  background: #fff;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
  border-radius: 50% 50% 50% 50% / 30% 30% 70% 70%;
}

/* General page styling */
.cat-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 1rem;
  z-index: 10000;
}

.quote-header {
  font-family: "Fredericka the Great", cursive;
}

.box{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30rem;
  height: 30rem;
  background: #033d68a6;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 20px 50px rgb(23, 32, 90);
  border: 2px solid #2a3cad;
  color: white;
  padding: 20px;
}

.box:before{
  content: '';
  position:absolute;
  top:0;
  left:-100%;
  width:100%;
  height:100%;
  background: rgba(255,255,255,0.1);
  transition:0.5s;
  pointer-events: none;
}

.box:hover:before{
  left:-50%;
  transform: skewX(-5deg);
}

.box span{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;

}

.box span:nth-child(1)
{
  transform:rotate(0deg);
}

.box span:nth-child(2)
{
  transform:rotate(90deg);
}

.box span:nth-child(3)
{
  transform:rotate(180deg);
}

.box span:nth-child(4)
{
  transform:rotate(270deg);
}

.box span:before
{
  content: '';
  position: absolute;
  width:100%;
  height: 2px;
  background: #50dfdb;
  animation: animate 4s linear infinite;
}

.box .form-container{
  position:absolute;
  top:15px;
  left:15px;
  right:15px;
  bottom:15px;
  border:1px solid #f0a591;
  background: #c6cacc;
  padding:20px;
  text-align:center;
  box-shadow: 0 5px 10px rgba(9,0,0,0.5);
}

@keyframes animate {
  0% {
    transform:scaleX(0);
    transform-origin: left;
  }
  50%
  {
    transform:scaleX(1);
    transform-origin: left;
  }
  50.1%
  {
    transform:scaleX(1);
    transform-origin: right;
  }
  100%
  {
    transform:scaleX(0);
    transform-origin: right;
  }
}

@media screen and (max-width: 460px) {
  .box{
  width: 100%;
 }
}

</style>

     <div class="box">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div class="form-container">
        <form class="form">
        <h2 class="quote-header">Add Quote</h2>

        <div class="${
          this.error ? "error" : "no-display"
        }"">Better luck next time</div>

        <div>
            <vaadin-text-area
                label="Quote text"
                placeholder="Quote text"
                required="true"
                errorMessage="required"
                value="${this.text}"
                @change="${this.updateText}">
            </vaadin-text-area>
         </div>

         <div>
             <vaadin-text-field
                   label="Quote author"
                   placeholder="Quote author"
                   required="true"
                   errorMessage="required"
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
                   required="true"
                   errorMessage="required"
                   value="${this.secret}"
                   @change="${this.updateSecret}">
             </vaadin-password-field>
       </div>

       <div class="form-buttons">
          <vaadin-button @click="${this.cancel}">
            Cancel
          </vaadin-button>
           <vaadin-button
                theme="primary"
                ?disabled="${this.disableSave}"
                @click="${this.createQuote}">
            Create
          </vaadin-button>
      </div>
        </form>
        <div class="cat-container">
            <div class="cat">
                <div class="ear ear--left"></div>
                <div class="ear ear--right"></div>
                <div class="face">
                    <div class="eye eye--left">
                        <div class="eye-pupil"></div>
                    </div>
                    <div class="eye eye--right">
                        <div class="eye-pupil"></div>
                    </div>
                    <div class="muzzle"></div>
                </div>
            </div>
        </div>
    </div>
  </div>
`;
  }

  updateDisableSave() {
    this.error = false;
    if (this.text && this.secret && this.secret) {
      this.disableSave = false;
      return;
    }
    this.disableSave = true;
  }

  updateText(e) {
    this.text = e.target.value;
    this.updateDisableSave();
  }

  updateAuthor(e) {
    this.author = e.target.value;
    this.updateDisableSave();
  }

  updateCensor(e) {
    this.censor = e.target.checked;
  }

  updateSecret(e) {
    this.secret = e.target.value;
    this.updateDisableSave();
  }

  async createQuote() {
    const quote = {
      quote: {
        text: this.text,
        author: this.author,
        censor: this.censor
      },
      secret: this.secret
    };

    try {
      const res = await this.httpService.createNewQuote(quote);
      if (res.data.status === 404) {
        this.error = true;
        return;
      }
      window.history.back();
    } catch (e) {
      this.error = true;
    }
  }

  cancel() {
    window.history.back();
  }
}

customElements.define("add-quote-view", AddQuoteView);
