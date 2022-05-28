import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const login = (form, router) => async (dispatch) => {
    try {
        const { data } = await api.login(form);
        dispatch({ type: AUTH, data });
        router("/");
    } catch (error) {
        console.log(error);
    }
};

export const signup = (form, router) => async (dispatch) => {
    try {
        const { data } = await api.signUp(form);
        dispatch({ type: AUTH, data });
        router("/");
    } catch (error) {
        console.log(error);
    }
};
