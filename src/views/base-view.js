import { LitElement } from 'lit-element';
import {HttpService} from "../redux/service";

export class BaseView extends LitElement {
  constructor() {
    super();

    this.httpService = new HttpService();

    this.httpService.getBoards();
  }
  createRenderRoot() {
    return this;
  }
}
