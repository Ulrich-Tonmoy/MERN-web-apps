import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const saveToLocalStorage = (store: any) => {
  try {
    const serializedStore = JSON.stringify(store);
    window.localStorage.setItem("store", serializedStore);
  } catch (e) {
    console.log(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedStore = window.localStorage.getItem("store");
    if (serializedStore === null) return undefined;
    return JSON.parse(serializedStore);
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: persistedState,
  devTools: true,
});

store.subscribe(() => saveToLocalStorage(store.getState()));

setupListeners(store.dispatch);

export default store;
