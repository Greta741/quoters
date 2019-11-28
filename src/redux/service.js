import {store} from "./store";
import {loadBoards, loadQuotes} from "./actions";

const axios = require('axios');

const url = 'http://167.172.178.149:80/api';

export class HttpService {

    async getBoards() {
        const result = await axios.get(`${url}/boards`);
        store.dispatch(loadBoards(result.data));
    }

    async getQuotes(id) {
        let fullUrl = `${url}/quotes`;
        if (id) {
            fullUrl += `/${id}`
        }
        const result = await axios.get(fullUrl);
        store.dispatch(loadQuotes(result.data));
    }

    async createNewQuote(quote) {
        const res = await axios.post(`${url}/quotes`, quote);
        return res;
    }

    async createBoard(board) {
        const res = await axios.post(`${url}/boards`, board);
    }
}
