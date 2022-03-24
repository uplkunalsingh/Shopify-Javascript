import store from "./store.js";

export default class Cart {
    constructor() {
        store.subscribe(() => {
            const { value } = store.getState()
            document.querySelector(".cart sup").innerHTML = value
        })
    }
}

