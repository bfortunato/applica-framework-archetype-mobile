import {createStore} from "../aj";
import { HELLO_ACTION } from "../actions/types";
import _ from "underscore";
import traverse from "../utils/traverse";

function defaultState() {
    return {
        hello: null,
    }    
}
const HelloWorldStore = createStore("HELLOWORLD", (state = defaultState(), action) => {
    switch (action.type) {
        case HELLO_ACTION:
            return {
                ...state,
            }
    }
})

HelloWorldStore.defaultState = defaultState;

export default HelloWorldStore;