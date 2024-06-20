import { legacy_createStore as createStore } from "redux";

interface store{

}

const defaultStore : store  = {

}

export const store = createStore((defaultState) => defaultState);

export type storeType = store;