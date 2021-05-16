import {ADD_CATEGORY, ADD_ITEM, CLEAR_CATEGORY, PURCHASE} from "../action-types";

export const addCategory = (payload) => ({type: ADD_CATEGORY, payload});
export const clearCategory = () => ({type: CLEAR_CATEGORY});
export const addItem = (payload) => ({type: ADD_ITEM, payload});
export const purchaseItem = (payload) => ({type: PURCHASE, payload});
