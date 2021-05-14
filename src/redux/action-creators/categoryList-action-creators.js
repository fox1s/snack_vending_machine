import {ADD_CATEGORY} from "../action-types";
import {CLEAR_CATEGORY} from "../action-types";

export const addCategory = (payload) => ({type: ADD_CATEGORY, payload})
export const clearCategory = (payload) => ({type: CLEAR_CATEGORY, payload})
