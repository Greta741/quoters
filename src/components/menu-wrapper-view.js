import { html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import { BaseView } from '../views/base-view.js';
import { disableCensor } from '../redux/actions';

const clicksRequired = 7;
const clicksResetTime = 3000;

class MenuWrapperView extends connect(store)(BaseView) {
  constructor() {
    super();

    this.clicksCount = 0;
    this.timerStarted = false;
  }

  static get properties() {
    return {
      boards: { type: Array }
    };
  }

  stateChanged(state) {
    this.boards = state.boards;
    this.disableCensor = state.disableCensor;
  }

  render() {
    return html`
      <style>
        html,
        body {
          overflow-x: hidden;
          height: 100%;
        }
        body {
          background: #f2f0ed;
          padding: 0;
          margin: 0;
          font-family: "Montserrat", sans-serif;
        }
        .header {
          display: block;
          margin: 0 auto;
          border-bottom: 3px solid #2fcf0b;
          width: 100%;
          max-width: 100%;
          box-shadow: none;
          background-color: #2d3142;
          position: fixed;
          height: 60px !important;
          overflow: hidden;
          z-index: 7000;
        }
        .header h1 {
          width: fit-content;
          margin: 0.5rem auto;
          color: white;
          font-family: "Handlee", sans-serif;
        }
        .main {
          margin: 0 auto;
          display: block;
          /*height: 100%;*/
          margin-top: 60px;
        }
        .mainInner {
          display: table;
          /*height: 100%;*/
          width: 100%;
          text-align: center;
        }
        .mainInner div {
          display: table-cell;
          vertical-align: middle;
          font-size: 3em;
          font-weight: bold;
          letter-spacing: 1.25px;
        }
        #sidebarMenu {
          z-index: 10000;
          height: 100%;
          position: fixed;
          left: 0;
          width: 250px;
          margin-top: 60px;
          transform: translateX(-250px);
          transition: transform 250ms ease-in-out;
          background: linear-gradient(180deg, #2d3142 0%, #c52184 100%);
          font-family: "Montserrat", sans-serif;
        }
        .sidebarMenuInner {
          margin: 0;
          padding: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .sidebarMenuInner li {
          list-style: none;
          color: #fff;
          text-transform: uppercase;
          font-weight: bold;
          cursor: pointer;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .sidebarMenuInner li:hover {
          background: rgba(242, 240, 237, 0.2);
        }
        .sidebarMenuInner li span {
          display: block;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
        }
        .sidebarMenuInner li a {
          color: #fff;
          text-transform: uppercase;
          font-weight: bold;
          cursor: pointer;
          text-decoration: none;
          display: block;
          padding: 1rem;
        }
        input[type="checkbox"]:checked ~ #sidebarMenu {
          transform: translateX(0);
        }

        input[type="checkbox"] {
          transition: all 0.3s;
          box-sizing: border-box;
          display: none;
        }
        .sidebarIconToggle {
          transition: all 0.3s;
          box-sizing: border-box;
          cursor: pointer;
          position: fixed;
          z-index: 8000;
          height: 100%;
          width: 100%;
          top: 22px;
          left: 15px;
          height: 22px;
          width: 22px;
        }
        .spinner {
          transition: all 0.3s;
          box-sizing: border-box;
          position: absolute;
          height: 3px;
          width: 100%;
          background-color: #fff;
        }
        .horizontal {
          transition: all 0.3s;
          box-sizing: border-box;
          position: relative;
          float: left;
          margin-top: 3px;
        }
        .diagonal.part-1 {
          position: relative;
          transition: all 0.3s;
          box-sizing: border-box;
          float: left;
        }
        .diagonal.part-2 {
          transition: all 0.3s;
          box-sizing: border-box;
          position: relative;
          float: left;
          margin-top: 3px;
        }
        input[type="checkbox"]:checked ~ .sidebarIconToggle > .horizontal {
          transition: all 0.3s;
          box-sizing: border-box;
          opacity: 0;
        }
        input[type="checkbox"]:checked ~ .sidebarIconToggle > .diagonal.part-1 {
          transition: all 0.3s;
          box-sizing: border-box;
          transform: rotate(135deg);
          margin-top: 8px;
        }
        input[type="checkbox"]:checked ~ .sidebarIconToggle > .diagonal.part-2 {
          transition: all 0.3s;
          box-sizing: border-box;
          transform: rotate(-135deg);
          margin-top: -9px;
        }
        .menu-header-no-click {
          pointer-events: none;
          cursor: default !important;
        }
        .boards-menu-items {
          padding-left: 2rem !important;
        }
      </style>

      <div class="header"><h1 @click="${this.clickName}">Quoters</h1></div>
      <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu" />
      <label for="openSidebarMenu" class="sidebarIconToggle">
        <div class="spinner diagonal part-1"></div>
        <div class="spinner horizontal"></div>
        <div class="spinner diagonal part-2"></div>
      </label>
      <div id="sidebarMenu">
        <ul class="sidebarMenuInner">
          <li><a href="/quotes" @click="${this.closeMenu}">All Quotes</a></li>
          <li class="menu-header-no-click"><a>Boards:</a></li>
          ${this.boards.map(
    (board) => html`
              <li>
                <a
                  class="boards-menu-items"
                  href="/quotes/${board._id}"
                  @click="${this.closeMenu}"
                  >${board.name}</a
                >
              </li>
            `
  )}
        </ul>
      </div>

      <div style="display: none">
        <a id="addQuote" href="/add-quote"></a>
        <a id="addBoard" href="/add-board"></a>
      </div>
    `;
  }

  clickName() {
    if (this.disableCensor) {
      return;
    }

    this.clicksCount++;
    if (!this.timerStarted) {
      this.timerStarted = true;
      setTimeout(() => {
        this.clicksCount = 0;
        this.timerStarted = false;
      }, clicksResetTime);
    }
    if (this.clicksCount >= clicksRequired) {
      store.dispatch(disableCensor());
      alert('NSFW activated');
    }
  }

  closeMenu() {
    const menuCheckbox = document.getElementById('openSidebarMenu');
    if (menuCheckbox) {
      menuCheckbox.checked = false;
    }
  }
}

customElements.define('menu-wrapper-view', MenuWrapperView);
export { MenuWrapperView };
